import { searchAddresses, getCoordinatesFromAddress as getCoords } from '@/services/geocodingService';
import { isGoogleMapsConfigured } from '@/config/maps';

// Cache global para coordenadas de endereços selecionados via autocomplete
const selectedAddressCoordinatesCache = new Map<string, { lat: number; lng: number }>();

// Função para armazenar coordenadas de endereços selecionados
export const cacheSelectedAddressCoordinates = (address: string, coords: { lat: number; lng: number }) => {
  const normalizedAddress = address.toLowerCase().trim();
  selectedAddressCoordinatesCache.set(normalizedAddress, coords);
  console.log(`💾 Coordenadas armazenadas em cache para "${address}":`, coords);
};

// Função para calcular distância entre dois pontos usando a fórmula de Haversine
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => {
  return value * Math.PI / 180;
};

// Coordenadas de pontos conhecidos (fallback)
const knownLocations: { [key: string]: { lat: number; lng: number } } = {
  'aeroporto guarulhos': { lat: -23.4356, lng: -46.4731 },
  'aeroporto congonhas': { lat: -23.6267, lng: -46.6554 },
  'avenida paulista': { lat: -23.5614, lng: -46.6562 },
  'centro são paulo': { lat: -23.5505, lng: -46.6333 },
  'rodoviária tietê': { lat: -23.5151, lng: -46.6256 },
  'shopping eldorado': { lat: -23.5672, lng: -46.6731 },
  'shopping ibirapuera': { lat: -23.6167, lng: -46.6642 }
};

// Função para extrair coordenadas de um endereço
export const getCoordinatesFromAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    console.log(`🔍 Buscando coordenadas para: "${address}"`);
    
    // Primeiro, verificar cache de endereços selecionados
    const normalizedAddress = address.toLowerCase().trim();
    if (selectedAddressCoordinatesCache.has(normalizedAddress)) {
      const cachedCoords = selectedAddressCoordinatesCache.get(normalizedAddress)!;
      console.log(`📋 Coordenadas encontradas no cache para "${address}":`, cachedCoords);
      console.log(`📍 CACHE: lat=${cachedCoords.lat}, lng=${cachedCoords.lng}`);
      return cachedCoords;
    }
    
    // Segundo, tenta buscar através da API real do Google Maps
    const results = await searchAddresses(address.trim());
    console.log(`📡 Resultados da API Google Maps:`, results);
    
    if (results.length > 0 && results[0].geometry) {
      const coords = {
        lat: results[0].geometry.location.lat,
        lng: results[0].geometry.location.lng
      };
      console.log(`✅ Coordenadas encontradas via Google Maps API:`, coords);
      console.log(`📍 GOOGLE MAPS: lat=${coords.lat}, lng=${coords.lng}`);
      return coords;
    }
    
    // Tentar usar diretamente o Google Geocoding API se Places não funcionou
    if (isGoogleMapsConfigured() && window.google?.maps?.Geocoder) {
      console.log(`🔄 Tentando Google Geocoding API diretamente para "${address}"...`);
      try {
        const geocoder = new window.google.maps.Geocoder();
        const geocodeResult = await new Promise<any>((resolve, reject) => {
          geocoder.geocode(
            { 
              address: address,
              region: 'BR',
              componentRestrictions: { country: 'BR' }
            },
            (results, status) => {
              if (status === 'OK' && results && results.length > 0) {
                resolve(results[0]);
              } else {
                reject(`Geocoding failed: ${status}`);
              }
            }
          );
        });
        
        const coords = {
          lat: geocodeResult.geometry.location.lat(),
          lng: geocodeResult.geometry.location.lng()
        };
        console.log(`✅ Coordenadas encontradas via Google Geocoding:`, coords);
        console.log(`📍 GOOGLE GEOCODING: lat=${coords.lat}, lng=${coords.lng}`);
        return coords;
      } catch (geocodingError) {
        console.log(`⚠️ Google Geocoding falhou:`, geocodingError);
      }
    }
    
    // Se não encontrou na API, usa a função de fallback do geocodingService
    console.log(`🔄 Tentando fallback geocodingService para "${address}"...`);
    const fallbackCoords = getCoords(address);
    if (fallbackCoords) {
      console.log(`✅ Coordenadas encontradas via fallback geocodingService para "${address}":`, fallbackCoords);
      console.log(`📍 FALLBACK: lat=${fallbackCoords.lat}, lng=${fallbackCoords.lng}`);
      return fallbackCoords;
    }
    
    // Se ainda não encontrou, tenta no fallback local
    console.log(`🔄 Tentando fallback local...`);
    const localNormalizedAddress = address.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Remove acentos
    
    for (const [key, coords] of Object.entries(knownLocations)) {
      if (localNormalizedAddress.includes(key)) {
        console.log(`✅ Coordenadas encontradas via fallback local para "${key}":`, coords);
        return coords;
      }
    }
    
    // Se não encontrou em lugar nenhum, retorna coordenadas do centro de SP
    console.warn(`⚠️ Coordenadas não encontradas para: ${address}. Usando centro de São Paulo.`);
    const defaultCoords = { lat: -23.5505, lng: -46.6333 };
    console.log(`🏙️ Usando coordenadas padrão (Centro SP):`, defaultCoords);
    return defaultCoords;
    
  } catch (error) {
    console.error('❌ Erro ao obter coordenadas:', error);
    // Em caso de erro, usa coordenadas do centro de SP
    const defaultCoords = { lat: -23.5505, lng: -46.6333 };
    console.log(`🏙️ Usando coordenadas padrão por erro (Centro SP):`, defaultCoords);
    return defaultCoords;
  }
};

// Função para calcular distância entre dois endereços
export const calculateDistanceBetweenAddresses = async (origin: string, destination: string): Promise<number> => {
  try {
    console.log(`🗺️ Calculando distância entre "${origin}" e "${destination}"`);
    
    const [originCoords, destCoords] = await Promise.all([
      getCoordinatesFromAddress(origin),
      getCoordinatesFromAddress(destination)
    ]);
    
    console.log('📍 Coordenadas encontradas:', { 
      origem: originCoords, 
      destino: destCoords 
    });
    
    // Log detalhado das coordenadas
    if (originCoords && destCoords) {
      console.log(`📍 ORIGEM: lat=${originCoords.lat}, lng=${originCoords.lng}`);
      console.log(`📍 DESTINO: lat=${destCoords.lat}, lng=${destCoords.lng}`);
    }
    
    if (!originCoords || !destCoords) {
      console.warn('⚠️ Não foi possível obter coordenadas para um dos endereços');
      return 15; // Distância padrão de 15km
    }
    
    const distance = calculateDistance(
      originCoords.lat,
      originCoords.lng,
      destCoords.lat,
      destCoords.lng
    );
    
    console.log(`📏 Distância calculada: ${distance.toFixed(1)} KM`);
    
    return Math.round(distance * 10) / 10; // Arredondar para 1 casa decimal
  } catch (error) {
    console.error('❌ Erro ao calcular distância:', error);
    return 15; // Distância padrão em caso de erro
  }
};

// Função para estimar tempo de viagem (considerando trânsito urbano)
export const estimateTravelTime = (distance: number): number => {
  // Velocidade média em São Paulo considerando trânsito
  let avgSpeed: number;
  
  if (distance <= 5) {
    avgSpeed = 20; // 20 km/h para distâncias curtas (muito trânsito)
  } else if (distance <= 15) {
    avgSpeed = 25; // 25 km/h para distâncias médias
  } else if (distance <= 30) {
    avgSpeed = 35; // 35 km/h para distâncias longas (mais rodovias)
  } else {
    avgSpeed = 45; // 45 km/h para distâncias muito longas
  }
  
  const timeInHours = distance / avgSpeed;
  const timeInMinutes = Math.round(timeInHours * 60);
  
  return Math.max(timeInMinutes, 15); // Mínimo de 15 minutos
};

// Função para detectar tipo de local (aeroporto, rodoviária, etc.)
export const detectLocationType = (address: string): string => {
  const normalizedAddress = address.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  
  if (normalizedAddress.includes('aeroporto') || normalizedAddress.includes('airport') || 
      normalizedAddress.includes('gru') || normalizedAddress.includes('cgh')) {
    return 'airport';
  }
  
  if (normalizedAddress.includes('rodoviária') || normalizedAddress.includes('rodoviaria') || 
      normalizedAddress.includes('terminal') || normalizedAddress.includes('bus')) {
    return 'bus_station';
  }
  
  if (normalizedAddress.includes('shopping') || normalizedAddress.includes('mall')) {
    return 'shopping';
  }
  
  if (normalizedAddress.includes('hospital') || normalizedAddress.includes('pronto socorro')) {
    return 'hospital';
  }
  
  if (normalizedAddress.includes('hotel') || normalizedAddress.includes('pousada')) {
    return 'hotel';
  }
  
  if (normalizedAddress.includes('universidade') || normalizedAddress.includes('faculdade') || 
      normalizedAddress.includes('usp') || normalizedAddress.includes('puc')) {
    return 'university';
  }
  
  return 'regular';
};

// Função para calcular taxa adicional baseada no tipo de local
export const calculateLocationSurcharge = (locationType: string): number => {
  switch (locationType) {
    case 'airport':
      return 1.3; // 30% adicional para aeroportos
    case 'bus_station':
      return 1.15; // 15% adicional para rodoviárias
    case 'shopping':
      return 1.05; // 5% adicional para shoppings (dificuldade de acesso)
    case 'hospital':
      return 1.1; // 10% adicional para hospitais (urgência)
    default:
      return 1.0; // Sem taxa adicional
  }
};

// Função principal para calcular preço da viagem
export const calculateTripPrice = async (
  origin: string,
  destination: string,
  vehicleType: 'economico' | 'executivo' | 'luxo' | 'suv' = 'executivo'
): Promise<{
  distance: number;
  estimatedTime: number;
  basePrice: number;
  finalPrice: number;
  priceFactors: string[];
}> => {
  try {
    console.log(`💰 Calculando preço da viagem [${vehicleType}]: "${origin}" → "${destination}"`);
    
    // Calcular distância real entre os endereços
    const distance = await calculateDistanceBetweenAddresses(origin, destination);
    const estimatedTime = estimateTravelTime(distance);
    
    console.log(`📊 Resultados do cálculo:`, { distance, estimatedTime });
    
    // Preço base por km baseado no tipo de veículo
    const basePricePerKm = {
      economico: 3.0,
      executivo: 3.5,
      luxo: 5.5,
      suv: 4.2
    };
    
    let basePrice = distance * basePricePerKm[vehicleType];
    let finalPrice = basePrice;
    const priceFactors: string[] = [];
    
    // Detectar tipos de local e aplicar taxas
    const originType = detectLocationType(origin);
    const destType = detectLocationType(destination);
    
    const originSurcharge = calculateLocationSurcharge(originType);
    const destSurcharge = calculateLocationSurcharge(destType);
    
    // Aplicar a maior taxa entre origem e destino
    const maxSurcharge = Math.max(originSurcharge, destSurcharge);
    if (maxSurcharge > 1.0) {
      finalPrice *= maxSurcharge;
      
      if (originType === 'airport' || destType === 'airport') {
        priceFactors.push('Taxa aeroporto (+30%)');
      } else if (originType === 'bus_station' || destType === 'bus_station') {
        priceFactors.push('Taxa rodoviária (+15%)');
      } else if (originType === 'hospital' || destType === 'hospital') {
        priceFactors.push('Taxa hospital (+10%)');
      }
    }
    
    // Taxa para viagens longas (>25km)
    if (distance > 25) {
      finalPrice *= 1.2;
      priceFactors.push('Viagem longa (+20%)');
    }
    
    // Preço mínimo
    const minimumPrice = vehicleType === 'luxo' ? 120 : vehicleType === 'suv' ? 100 : 80;
    if (finalPrice < minimumPrice) {
      finalPrice = minimumPrice;
      priceFactors.push(`Preço mínimo R$ ${minimumPrice}`);
    }
    
    return {
      distance: Math.round(distance * 10) / 10,
      estimatedTime,
      basePrice: Math.round(basePrice * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      priceFactors
    };
  } catch (error) {
    console.error('Erro ao calcular preço da viagem:', error);
    
    // Retornar valores padrão em caso de erro
    return {
      distance: 15,
      estimatedTime: 45,
      basePrice: 52.5,
      finalPrice: 80,
      priceFactors: ['Cálculo aproximado']
    };
  }
}; 