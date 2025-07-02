// Serviço de geocodificação híbrido - Google Places + Múltiplas APIs gratuitas
// Integração inteligente com múltiplas APIs para máxima cobertura SEM custos

import { searchPlaces, getPlaceDetails, type AddressSuggestion as GoogleSuggestion } from './googlePlacesService';
import { isGoogleMapsConfigured, GOOGLE_MAPS_API_KEY } from '@/config/maps';
import { saoPauloAddresses, searchAddresses as searchLocalAddresses } from '@/data/saoPauloAddresses';

export interface GeocodingResult {
  place_id: string;
  display_name: string;
  formatted_address: string;
  main_text: string;
  secondary_text: string;
  lat: number;
  lon: number;
  type: string;
  importance: number;
}

export interface AddressSuggestion {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types?: string[];
  source: 'google' | 'nominatim' | 'photon' | 'local';
}

// Rate limiting para APIs gratuitas
class NominatimRateLimiter {
  private lastRequestTime = 0;
  private minInterval = 1000; // 1 segundo para Nominatim

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minInterval) {
      const waitTime = this.minInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }
}

class PhotonRateLimiter {
  private lastRequestTime = 0;
  private minInterval = 200; // 200ms para Photon (mais rápido)

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minInterval) {
      const waitTime = this.minInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }
}

const nominatimRateLimiter = new NominatimRateLimiter();
const photonRateLimiter = new PhotonRateLimiter();

// Cache unificado para todos os serviços
const unifiedSearchCache = new Map<string, AddressSuggestion[]>();
const reverseCache = new Map<string, string>();

/**
 * Função principal de busca de endereços
 * USA APENAS GOOGLE PLACES API para máxima qualidade e velocidade
 */
export const searchAddresses = async (query: string): Promise<AddressSuggestion[]> => {
  console.log(`🔍 [DEBUG] searchAddresses chamada com query: "${query}"`);
  
  if (!query || query.length < 2) {
    console.log(`❌ [DEBUG] Query muito curta: ${query.length} caracteres`);
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  console.log(`🔧 [DEBUG] Query normalizada: "${normalizedQuery}"`);
  
  // Verificar cache primeiro
  if (unifiedSearchCache.has(normalizedQuery)) {
    const cachedResults = unifiedSearchCache.get(normalizedQuery) || [];
    console.log(`📋 [DEBUG] Cache hit para "${query}" - ${cachedResults.length} resultados`);
    return cachedResults;
  }

  // VERIFICAR CONFIGURAÇÃO GOOGLE
  const googleConfigured = isGoogleMapsConfigured();
  console.log(`🗝️ [DEBUG] Google Maps configurado: ${googleConfigured}`);
  console.log(`🔑 [DEBUG] API Key existe: ${GOOGLE_MAPS_API_KEY ? 'SIM' : 'NÃO'}`);
  console.log(`🔑 [DEBUG] API Key valor: ${GOOGLE_MAPS_API_KEY ? GOOGLE_MAPS_API_KEY.substring(0, 10) + '...' : 'undefined'}`);

  // APENAS GOOGLE PLACES API
  if (!googleConfigured) {
    console.warn('⚠️ [DEBUG] Google Maps API não configurada! Configure a API para usar o sistema.');
    console.warn('⚠️ [DEBUG] Você precisa criar um arquivo .env com VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui');
    return [];
  }

  try {
    console.log(`🚀 [DEBUG] Iniciando busca no Google Places: "${query}"`);
    
    const googleResults = await searchPlaces(query);
    console.log(`📊 [DEBUG] Google Places retornou: ${googleResults.length} resultados`);
    
    if (googleResults.length > 0) {
      const results = googleResults.map(result => ({ ...result, source: 'google' as const }));
      
      // Salvar no cache
      unifiedSearchCache.set(normalizedQuery, results);
      
      // Limitar tamanho do cache
      if (unifiedSearchCache.size > 100) {
        const firstKey = unifiedSearchCache.keys().next().value;
        unifiedSearchCache.delete(firstKey);
      }
      
      console.log(`✅ [DEBUG] Google Places: ${results.length} resultados processados e salvos no cache`);
      return results;
    } else {
      console.log(`ℹ️ [DEBUG] Nenhum resultado encontrado no Google Places para: "${query}"`);
      return [];
    }

  } catch (error) {
    console.error('❌ [DEBUG] Erro na busca Google Places:', error);
    return [];
  }
};

/**
 * Busca no Photon API (OpenStreetMap mais rápida)
 * API gratuita e muito boa para o Brasil
 */
const searchPhotonAddresses = async (query: string): Promise<AddressSuggestion[]> => {
  try {
    await photonRateLimiter.waitIfNeeded();

    const params = new URLSearchParams({
      q: query,
      limit: '6',
      lang: 'pt',
      osm_tag: '!place:postcode', // Excluir apenas códigos postais
      bbox: '-46.8,-23.8,-46.3,-23.3', // Foco na região metropolitana de SP
    });

    const response = await fetch(
      `https://photon.komoot.io/api/?${params}`,
      {
        headers: {
          'User-Agent': 'ExecutivePremium/1.0',
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return (data.features || [])
      .filter((feature: any) => feature.properties && feature.geometry)
      .map((feature: any, index: number) => {
        const props = feature.properties;
        let mainText = props.name || props.street || 'Endereço não especificado';
        let secondaryText = '';

        // Construir texto secundário
        const secondary = [];
        if (props.housenumber) mainText += `, ${props.housenumber}`;
        if (props.district) secondary.push(props.district);
        if (props.city) secondary.push(props.city);
        if (props.state) secondary.push(props.state);
        
        secondaryText = secondary.slice(0, 2).join(', ');

        return {
          place_id: `photon-${feature.properties.osm_id || index}`,
          description: `${mainText}${secondaryText ? ', ' + secondaryText : ''}`,
          structured_formatting: {
            main_text: mainText,
            secondary_text: secondaryText
          },
          geometry: {
            location: {
              lat: feature.geometry.coordinates[1],
              lng: feature.geometry.coordinates[0]
            }
          },
          source: 'photon' as const
        };
      });

  } catch (error) {
    console.error('Erro na API do Photon:', error);
    return [];
  }
};

/**
 * Busca no Nominatim (OpenStreetMap oficial) - Fallback robusto
 */
const searchNominatimAddresses = async (query: string): Promise<AddressSuggestion[]> => {
  try {
    await nominatimRateLimiter.waitIfNeeded();

    const params = new URLSearchParams({
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: '5',
      countrycodes: 'br',
      'accept-language': 'pt-BR,pt,en',
      bounded: '1',
      viewbox: '-46.8,-23.8,-46.3,-23.3', // Foco em São Paulo
      extratags: '1'
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      {
        headers: {
          'User-Agent': 'ExecutivePremium/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data
      .filter((item: any) => item.display_name && item.lat && item.lon)
      .map((item: any, index: number) => {
        const parts = item.display_name.split(', ');
        let mainText = parts[0] || item.display_name;
        let secondaryText = parts.slice(1, 3).join(', ') || parts.slice(1).join(', ');

        // Melhorar formatação para endereços brasileiros
        if (item.address) {
          const addr = item.address;
          if (addr.house_number && addr.road) {
            mainText = `${addr.road}, ${addr.house_number}`;
          } else if (addr.road) {
            mainText = addr.road;
          } else if (addr.amenity) {
            mainText = addr.amenity;
          }

          const secondary = [];
          if (addr.neighbourhood) secondary.push(addr.neighbourhood);
          if (addr.suburb && addr.suburb !== addr.neighbourhood) secondary.push(addr.suburb);
          if (addr.city) secondary.push(addr.city);
          if (addr.state) secondary.push(addr.state);
          
          secondaryText = secondary.slice(0, 2).join(', ');
        }

        return {
          place_id: `nominatim-${item.place_id || index}`,
          description: item.display_name,
          structured_formatting: {
            main_text: mainText,
            secondary_text: secondaryText
          },
          geometry: {
            location: {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon)
            }
          },
          source: 'nominatim' as const
        };
      });

  } catch (error) {
    console.error('Erro na API do Nominatim:', error);
    return [];
  }
};

/**
 * Busca na base local formatada
 */
const searchLocalAddressesFormatted = (query: string): AddressSuggestion[] => {
  const results = searchLocalAddresses(query, 5);
  
  return results.map((address, index) => ({
    place_id: `local-${address.id}`,
    description: `${address.main_text}, ${address.secondary_text}`,
    structured_formatting: {
      main_text: address.main_text,
      secondary_text: address.secondary_text
    },
    geometry: {
      location: address.coords
    },
    source: 'local' as const
  }));
};

/**
 * Verifica se dois endereços são similares (para evitar duplicatas)
 */
const areSimilarAddresses = (address1: string, address2: string): boolean => {
  const normalize = (addr: string) => addr.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s]/g, '') // Remove pontuação
    .trim();

  const norm1 = normalize(address1);
  const norm2 = normalize(address2);

  // Verificar se um está contido no outro com pelo menos 70% de similaridade
  const similarity = calculateSimilarity(norm1, norm2);
  return similarity > 0.7;
};

/**
 * Calcula relevância de um resultado baseado na query
 */
const calculateRelevance = (query: string, result: string): number => {
  const normalizedQuery = query.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
    
  const normalizedResult = result.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Se começa com a query, relevância máxima
  if (normalizedResult.startsWith(normalizedQuery)) {
    return 1.0;
  }

  // Se contém a query, relevância alta
  if (normalizedResult.includes(normalizedQuery)) {
    return 0.8;
  }

  // Similaridade baseada em palavras
  const queryWords = normalizedQuery.split(' ');
  const resultWords = normalizedResult.split(' ');
  
  let matchingWords = 0;
  queryWords.forEach(qWord => {
    if (resultWords.some(rWord => rWord.includes(qWord) || qWord.includes(rWord))) {
      matchingWords++;
    }
  });

  return matchingWords / queryWords.length;
};

/**
 * Calcula similaridade entre duas strings
 */
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) {
    return 1.0;
  }
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

/**
 * Calcula distância de Levenshtein
 */
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

export const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
  const coordsKey = `${lat.toFixed(6)},${lng.toFixed(6)}`;
  
  // Verificar cache
  if (reverseCache.has(coordsKey)) {
    return reverseCache.get(coordsKey) || null;
  }

  try {
    // Usar Nominatim para reverse geocoding
    await nominatimRateLimiter.waitIfNeeded();

    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      format: 'json',
      'accept-language': 'pt-BR,pt,en',
      zoom: '18'
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?${params}`,
      {
        headers: {
          'User-Agent': 'ExecutivePremium/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data && data.display_name) {
      const address = data.display_name;
      
      // Salvar no cache
      reverseCache.set(coordsKey, address);
      
      // Limitar tamanho do cache
      if (reverseCache.size > 50) {
        const firstKey = reverseCache.keys().next().value;
        reverseCache.delete(firstKey);
      }
      
      return address;
    }

    return null;

  } catch (error) {
    console.error('Erro no reverse geocoding:', error);
    return null;
  }
};

export const getCoordinatesFromAddress = (address: string): { lat: number; lng: number } | null => {
  // Função de fallback rápido para coordenadas conhecidas
  const normalizedAddress = address.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Procurar nos dados locais primeiro
  const localResult = saoPauloAddresses.find(addr => 
    addr.main_text.toLowerCase().includes(normalizedAddress) ||
    addr.secondary_text.toLowerCase().includes(normalizedAddress) ||
    addr.keywords.some(keyword => normalizedAddress.includes(keyword))
  );

  if (localResult) {
    return localResult.coords;
  }

  // Coordenadas conhecidas importantes
  const knownLocations: { [key: string]: { lat: number; lng: number } } = {
    'aeroporto guarulhos': { lat: -23.4356, lng: -46.4731 },
    'aeroporto congonhas': { lat: -23.6267, lng: -46.6554 },
    'avenida paulista': { lat: -23.5614, lng: -46.6562 },
    'centro são paulo': { lat: -23.5505, lng: -46.6333 },
    'rodoviária tietê': { lat: -23.5151, lng: -46.6256 },
  };

  for (const [key, coords] of Object.entries(knownLocations)) {
    if (normalizedAddress.includes(key)) {
      return coords;
    }
  }

  // Se não encontrou, retornar centro de SP
  return { lat: -23.5505, lng: -46.6333 };
};

/**
 * Limpa todos os caches
 */
export const clearAllCaches = (): void => {
  unifiedSearchCache.clear();
  reverseCache.clear();
  console.log('Todos os caches de geocoding foram limpos');
};

export default {
  searchAddresses,
  reverseGeocode,
  getCoordinatesFromAddress,
  clearAllCaches
}; 