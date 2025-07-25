import { searchAddresses, getCoordinatesFromAddress as getCoords } from '@/services/geocodingService';
import { isGoogleMapsConfigured } from '@/config/maps';
import { findFixedPrice, isDailyRequest, DAILY_RATES, identifyLocation, KNOWN_LOCATIONS } from '@/data/fixedPricing';

// Cache global para coordenadas de endereços selecionados via autocomplete
const selectedAddressCoordinatesCache = new Map<string, { lat: number; lng: number }>();

// Cache para dados do Distance Matrix API
const distanceMatrixCache = new Map<string, { distance: number; duration: number }>();

// Função para armazenar coordenadas de endereços selecionados
export const cacheSelectedAddressCoordinates = (address: string, coords: { lat: number; lng: number }) => {
  const normalizedAddress = address.toLowerCase().trim();
  selectedAddressCoordinatesCache.set(normalizedAddress, coords);
  console.log(`💾 Coordenadas armazenadas em cache para "${address}":`, coords);
};

// Função para calcular distância entre dois pontos usando a fórmula de Haversine (FALLBACK)
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

// Nova função para obter distância real usando Google Maps Distance Matrix API
export const getGoogleMapsDistanceAndTime = async (
  origin: string,
  destination: string
): Promise<{ distance: number; duration: number } | null> => {
  try {
    console.log(`🗺️ [DEBUG] getGoogleMapsDistanceAndTime iniciado: "${origin}" → "${destination}"`);
    
    // Criar chave de cache
    const cacheKey = `${origin.toLowerCase().trim()}|${destination.toLowerCase().trim()}`;
    
    // Verificar cache primeiro
    if (distanceMatrixCache.has(cacheKey)) {
      const cached = distanceMatrixCache.get(cacheKey)!;
      console.log(`📋 [DEBUG] Distance Matrix cache hit: ${cached.distance}km, ${cached.duration}min`);
      return cached;
    }

    // Verificar se Google Maps está configurado
    const isConfigured = isGoogleMapsConfigured();
    const hasGoogleMaps = !!window.google?.maps;
    
    console.log(`🔧 [DEBUG] Verificações Google Maps:`, {
      isConfigured,
      hasGoogleMaps,
      windowGoogle: !!window.google,
      googleMaps: !!window.google?.maps
    });
    
    if (!isConfigured || !hasGoogleMaps) {
      console.warn('⚠️ [DEBUG] Google Maps não configurado para Distance Matrix');
      return null;
    }

    console.log(`🚀 [DEBUG] Iniciando chamada ao Google Maps Distance Matrix API`);

    const service = new window.google.maps.DistanceMatrixService();
    
    const result = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
          region: 'BR'
        },
        (response, status) => {
          console.log(`📡 [DEBUG] Distance Matrix resposta:`, { status, response });
          
          if (status === 'OK' && response) {
            resolve(response);
          } else {
            reject(new Error(`Distance Matrix API error: ${status}`));
          }
        }
      );
    });

    const element = result.rows[0]?.elements[0];
    console.log(`🔍 [DEBUG] Elemento da resposta:`, element);
    
    if (element?.status === 'OK' && element.distance && element.duration) {
      const distanceKm = element.distance.value / 1000; // Converter metros para km
      const durationMin = Math.round(element.duration.value / 60); // Converter segundos para minutos
      
      const data = { distance: distanceKm, duration: durationMin };
      
      // Salvar no cache
      distanceMatrixCache.set(cacheKey, data);
      
      // Limitar tamanho do cache
      if (distanceMatrixCache.size > 50) {
        const firstKey = distanceMatrixCache.keys().next().value;
        distanceMatrixCache.delete(firstKey);
      }
      
      console.log(`✅ [DEBUG] Google Maps Distance Matrix sucesso: ${distanceKm.toFixed(1)}km, ${durationMin}min`);
      console.log(`📊 [DEBUG] Dados detalhados:`, {
        distance: element.distance,
        duration: element.duration,
        status: element.status
      });
      
      return data;
    } else {
      console.warn('⚠️ [DEBUG] Google Maps Distance Matrix retornou dados inválidos:', element);
      return null;
    }

  } catch (error) {
    console.error('❌ [DEBUG] Erro no Google Maps Distance Matrix:', error);
    return null;
  }
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
    
    // Primeiro, tentar usar Google Maps Distance Matrix API para obter distância real da rota
    const googleMapsData = await getGoogleMapsDistanceAndTime(origin, destination);
    
    if (googleMapsData) {
      console.log(`✅ Usando distância real do Google Maps: ${googleMapsData.distance.toFixed(1)} KM`);
      return Math.round(googleMapsData.distance * 10) / 10;
    }
    
    // Fallback: usar coordenadas e cálculo de Haversine
    console.log(`⚠️ Fallback: usando cálculo de Haversine (linha reta)`);
    
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
    
    // Aplicar fator de correção para distância de rota real (aproximadamente 1.4x a distância em linha reta)
    const routeDistance = distance * 1.4;
    
    console.log(`📏 Distância linha reta: ${distance.toFixed(1)} KM`);
    console.log(`📏 Distância estimada da rota: ${routeDistance.toFixed(1)} KM`);
    
    return Math.round(routeDistance * 10) / 10; // Arredondar para 1 casa decimal
  } catch (error) {
    console.error('❌ Erro ao calcular distância:', error);
    return 15; // Distância padrão em caso de erro
  }
};

// Função para estimar tempo de viagem (considerando trânsito urbano)
export const estimateTravelTime = (distance: number): number => {
  console.log(`⏰ [DEBUG] estimateTravelTime recebeu: ${distance} (tipo: ${typeof distance})`);
  
  // Validar entrada
  if (isNaN(distance) || distance <= 0) {
    console.warn(`⚠️ [DEBUG] Distância inválida para estimativa de tempo: ${distance}, usando 15 min padrão`);
    return 15;
  }
  
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
  const finalTime = Math.max(timeInMinutes, 15); // Mínimo de 15 minutos
  
  console.log(`⏰ [DEBUG] Cálculo do tempo estimado:`, {
    distance,
    avgSpeed,
    timeInHours,
    timeInMinutes,
    finalTime
  });
  
  return finalTime;
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
  vehicleType: 'economico' | 'executivo' | 'luxo' | 'suv' | 'minivanBlindada' | 'van15Lugares' = 'executivo'
): Promise<{
  distance: number;
  estimatedTime: number;
  basePrice: number;
  finalPrice: number;
  priceFactors: string[];
}> => {
  try {
    console.log(`💰 Calculando preço da viagem [${vehicleType}]: "${origin}" → "${destination}"`);
    
    // Mapear tipos de veículo para as categorias do sistema de tarifas fixas
    const vehicleTypeMapping: { [key: string]: keyof typeof DAILY_RATES } = {
      'economico': 'executivoComum',
      'executivo': 'executivoSedan',
      'luxo': 'executivoPremiumBlindado',
      'suv': 'minivanComum',
      'minivanBlindada': 'minivanBlindada',
      'van15Lugares': 'van15Lugares'
    };
    
    const fixedPriceVehicleType = vehicleTypeMapping[vehicleType] || 'executivoSedan';
    
    // Verificar se é uma solicitação de diária
    if (isDailyRequest(origin) || isDailyRequest(destination)) {
      const dailyPrice = DAILY_RATES[fixedPriceVehicleType];
      console.log(`📅 Solicitação de diária detectada: R$ ${dailyPrice.toFixed(2)}`);
      
      return {
        distance: 100, // 100km inclusos na diária
        estimatedTime: 600, // 10 horas
        basePrice: dailyPrice,
        finalPrice: dailyPrice,
        priceFactors: ['Diária (10h à disposição / 100km)']
      };
    }
    
    // Tentar encontrar tarifa fixa primeiro
    const fixedPrice = findFixedPrice(origin, destination, fixedPriceVehicleType);
    
    if (fixedPrice !== null) {
      console.log(`✅ Usando tarifa fixa: R$ ${fixedPrice.toFixed(2)}`);
      
      // Obter dados de distância e tempo para informação
      let distance: number = 15;
      let estimatedTime: number = 45;
      
      try {
        const googleMapsData = await getGoogleMapsDistanceAndTime(origin, destination);
        if (googleMapsData) {
          distance = googleMapsData.distance;
          estimatedTime = googleMapsData.duration;
        } else {
          distance = await calculateDistanceBetweenAddresses(origin, destination);
          estimatedTime = estimateTravelTime(distance);
        }
      } catch (error) {
        console.warn('⚠️ Erro ao obter dados de distância/tempo, usando valores padrão');
      }
      
      const originLocation = identifyLocation(origin);
      const destinationLocation = identifyLocation(destination);
      const originName = originLocation ? KNOWN_LOCATIONS[originLocation]?.name : origin;
      const destinationName = destinationLocation ? KNOWN_LOCATIONS[destinationLocation]?.name : destination;
      
      return {
        distance: Math.round(distance * 10) / 10,
        estimatedTime: Math.round(estimatedTime),
        basePrice: fixedPrice,
        finalPrice: fixedPrice,
        priceFactors: [`Tarifa fixa: ${originName} → ${destinationName}`]
      };
    }
    
    // Se não há tarifa fixa, usar cálculo dinâmico original
    console.log(`⚠️ Tarifa fixa não encontrada, usando cálculo dinâmico`);
    
    // Primeiro, tentar obter dados reais do Google Maps
    const googleMapsData = await getGoogleMapsDistanceAndTime(origin, destination);
    console.log(`🗺️ [DEBUG] Google Maps retornou:`, googleMapsData);
    
    let distance: number;
    let estimatedTime: number;
    
    if (googleMapsData) {
      // Usar dados reais do Google Maps
      distance = googleMapsData.distance;
      estimatedTime = googleMapsData.duration;
      console.log(`✅ Usando dados reais do Google Maps: ${distance.toFixed(1)}km, ${estimatedTime}min`);
    } else {
      // Fallback: calcular usando função existente
      console.log(`⚠️ Fallback: usando cálculo estimado`);
      distance = await calculateDistanceBetweenAddresses(origin, destination);
      estimatedTime = estimateTravelTime(distance);
      console.log(`⚠️ Fallback resultou em: ${distance.toFixed(1)}km, ${estimatedTime}min`);
    }
    
    console.log(`📊 Resultados finais do cálculo:`, { 
      distance: distance.toFixed(1), 
      estimatedTime,
      distanceType: typeof distance,
      estimatedTimeType: typeof estimatedTime
    });
    
    // Validar dados antes de continuar
    if (isNaN(distance) || distance <= 0) {
      console.warn('⚠️ Distância inválida, usando padrão');
      distance = 15;
    }
    
    if (isNaN(estimatedTime) || estimatedTime <= 0) {
      console.warn('⚠️ Tempo estimado inválido, calculando baseado na distância');
      estimatedTime = estimateTravelTime(distance);
    }
    
    console.log(`📊 Dados validados:`, { distance, estimatedTime });
    
    // Preço base por km baseado no tipo de veículo
    const basePricePerKm = {
      economico: 3.0,
      executivo: 3.5,
      luxo: 5.5,
      suv: 4.2,
      minivanBlindada: 6.5,
      van15Lugares: 5.0
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
    const minimumPrice = vehicleType === 'luxo' ? 120 : 
                        vehicleType === 'suv' ? 100 : 
                        vehicleType === 'minivanBlindada' ? 150 :
                        vehicleType === 'van15Lugares' ? 120 : 80;
    if (finalPrice < minimumPrice) {
      finalPrice = minimumPrice;
      priceFactors.push(`Preço mínimo R$ ${minimumPrice.toFixed(2)}`);
    }
    
    // Adicionar indicação de cálculo dinâmico
    priceFactors.push('Cálculo dinâmico por distância');
    
    const result = {
      distance: Math.round(distance * 10) / 10,
      estimatedTime: Math.round(estimatedTime),
      basePrice: Math.round(basePrice * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      priceFactors
    };
    
    console.log(`💰 [DEBUG] Resultado final da viagem:`, result);
    
    return result;
  } catch (error) {
    console.error('Erro ao calcular preço da viagem:', error);
    
    // Retornar valores padrão em caso de erro
    const fallbackResult = {
      distance: 15,
      estimatedTime: 45,
      basePrice: 52.5,
      finalPrice: 80,
      priceFactors: ['Cálculo aproximado']
    };
    
    console.log(`💰 [DEBUG] Resultado fallback:`, fallbackResult);
    return fallbackResult;
  }
};