import { searchAddresses, getCoordinatesFromAddress as getCoords } from '@/services/geocodingService';
import { isGoogleMapsConfigured } from '@/config/maps';
import { findFixedPrice, isDailyRequest, DAILY_RATES, identifyLocation, KNOWN_LOCATIONS } from '@/data/fixedPricing';
import { findPriceByCep, identifyRegionByCep, normalizeCep } from '@/data/cepPricing';
import { getRegionalPrice, RegionalPrices } from '@/data/regionalPricing';
import { isValidViracoposRoute, getViracoposPriceByVehicleType } from './cepValidation';
import { saoPauloAddresses } from '@/data/saoPauloAddresses';

// Cache para coordenadas de endereços selecionados
const selectedAddressCoordinatesCache = new Map<string, { lat: number; lng: number }>();

// Cache para resultados da Distance Matrix API
const distanceMatrixCache = new Map<string, { distance: number; duration: number }>();

// Função para armazenar coordenadas de endereços selecionados
export const cacheSelectedAddressCoordinates = (address: string, coords: { lat: number; lng: number }) => {
  const key = address.toLowerCase().trim();
  selectedAddressCoordinatesCache.set(key, coords);
  console.log(`📍 Coordenadas armazenadas para "${address}":`, coords);
};

// Função para calcular distância entre duas coordenadas usando a fórmula de Haversine
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

// Função para obter distância e tempo usando Google Maps APIs
export const getGoogleMapsDistanceAndTime = async (
  origin: string,
  destination: string
): Promise<{ distance: number; duration: number } | null> => {
  if (!isGoogleMapsConfigured()) {
    console.warn('⚠️ Google Maps não está configurado');
    return null;
  }

  const cacheKey = `${origin.toLowerCase().trim()}_${destination.toLowerCase().trim()}`;
  
  // Verificar cache primeiro
  if (distanceMatrixCache.has(cacheKey)) {
    const cached = distanceMatrixCache.get(cacheKey)!;
    console.log(`🎯 Cache hit para distância: ${cached.distance.toFixed(1)}km, ${cached.duration}min`);
    return cached;
  }

  try {
    // Tentar Routes API primeiro (mais precisa)
    const routesResult = await getDistanceUsingRoutesAPI(origin, destination, cacheKey);
    if (routesResult) {
      return routesResult;
    }

    // Fallback para Distance Matrix API
    const matrixResult = await getDistanceUsingDistanceMatrix(origin, destination, cacheKey);
    if (matrixResult) {
      return matrixResult;
    }

    console.warn('⚠️ Ambas as APIs do Google Maps falharam');
    return null;
  } catch (error) {
    console.error('❌ Erro ao obter dados do Google Maps:', error);
    return null;
  }
};

// Função para usar Routes API
const getDistanceUsingRoutesAPI = async (
  origin: string,
  destination: string,
  cacheKey: string
): Promise<{ distance: number; duration: number } | null> => {
  try {
    const response = await fetch('/api/google-routes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin,
        destination,
      }),
    });

    if (!response.ok) {
      console.warn(`⚠️ Routes API falhou: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (data.error) {
      console.warn('⚠️ Routes API retornou erro:', data.error);
      return null;
    }

    if (data.distance && data.duration) {
      const result = {
        distance: data.distance,
        duration: data.duration
      };
      
      // Armazenar no cache
      distanceMatrixCache.set(cacheKey, result);
      console.log(`🗺️ Routes API: ${result.distance.toFixed(1)}km, ${result.duration}min`);
      
      return result;
    }

    return null;
  } catch (error) {
    console.warn('⚠️ Erro na Routes API:', error);
    return null;
  }
};

// Função para usar Distance Matrix API
const getDistanceUsingDistanceMatrix = async (
  origin: string,
  destination: string,
  cacheKey: string
): Promise<{ distance: number; duration: number } | null> => {
  try {
    const response = await fetch('/api/google-distance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origins: [origin],
        destinations: [destination],
      }),
    });

    if (!response.ok) {
      console.warn(`⚠️ Distance Matrix API falhou: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (data.error) {
      console.warn('⚠️ Distance Matrix API retornou erro:', data.error);
      return null;
    }

    if (data.rows && data.rows[0] && data.rows[0].elements && data.rows[0].elements[0]) {
      const element = data.rows[0].elements[0];
      
      if (element.status === 'OK' && element.distance && element.duration) {
        const result = {
          distance: element.distance.value / 1000, // Converter de metros para km
          duration: Math.round(element.duration.value / 60) // Converter de segundos para minutos
        };
        
        // Armazenar no cache
        distanceMatrixCache.set(cacheKey, result);
        console.log(`🗺️ Distance Matrix: ${result.distance.toFixed(1)}km, ${result.duration}min`);
        
        return result;
      }
    }

    return null;
  } catch (error) {
    console.warn('⚠️ Erro na Distance Matrix API:', error);
    return null;
  }
};

// Locais conhecidos com coordenadas
const knownLocations: { [key: string]: { lat: number; lng: number } } = {
  'aeroporto guarulhos': { lat: -23.4356, lng: -46.4731 },
  'aeroporto congonhas': { lat: -23.6267, lng: -46.6554 },
  'avenida paulista': { lat: -23.5614, lng: -46.6562 },
  'centro são paulo': { lat: -23.5505, lng: -46.6333 },
  'rodoviária tietê': { lat: -23.5151, lng: -46.6256 },
  'shopping eldorado': { lat: -23.5672, lng: -46.6731 },
  'shopping ibirapuera': { lat: -23.6167, lng: -46.6642 }
};

// Função para obter coordenadas de um endereço
export const getCoordinatesFromAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const normalizedAddress = address.toLowerCase().trim();
    
    // Verificar cache de endereços selecionados primeiro
    if (selectedAddressCoordinatesCache.has(normalizedAddress)) {
      const cached = selectedAddressCoordinatesCache.get(normalizedAddress)!;
      console.log(`🎯 Cache hit para coordenadas de "${address}":`, cached);
      return cached;
    }
    
    // Verificar locais conhecidos
    for (const [key, coords] of Object.entries(knownLocations)) {
      if (normalizedAddress.includes(key)) {
        console.log(`📍 Local conhecido encontrado: "${key}"`);
        return coords;
      }
    }
    
    // Usar serviço de geocodificação
    console.log(`🔍 Buscando coordenadas para: "${address}"`);
    const coords = await getCoords(address);
    
    if (coords) {
      console.log(`✅ Coordenadas encontradas para "${address}":`, coords);
      return coords;
    }
    
    console.warn(`⚠️ Não foi possível obter coordenadas para: "${address}"`);
    return null;
  } catch (error) {
    console.error(`❌ Erro ao obter coordenadas para "${address}":`, error);
    return null;
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
    
    // Fallback: usar coordenadas e cálculo de distância em linha reta
    console.log(`⚠️ Fallback: calculando distância usando coordenadas`);
    
    const originCoords = await getCoordinatesFromAddress(origin);
    const destCoords = await getCoordinatesFromAddress(destination);
    
    if (originCoords && destCoords) {
      const distance = calculateDistance(
        originCoords.lat, originCoords.lng,
        destCoords.lat, destCoords.lng
      );
      
      // Aplicar fator de correção para distância rodoviária (aproximadamente 1.3x a distância em linha reta)
      const roadDistance = Math.round(distance * 1.3 * 10) / 10;
      console.log(`📏 Distância calculada: ${roadDistance} KM (linha reta: ${distance.toFixed(1)} KM)`);
      
      return roadDistance;
    }
    
    // Se não conseguir obter coordenadas, usar estimativa baseada em CEPs ou nomes
    console.warn(`⚠️ Não foi possível obter coordenadas, usando estimativa padrão`);
    return 15; // Distância padrão em km
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

// Função para detectar se um CEP ou endereço está fora do estado de São Paulo
export const isOutsideSaoPauloState = (address: string): boolean => {
  const addressLower = address.toLowerCase().trim();
  
  // Extrair CEP do endereço
  const cepMatch = address.match(/\b(\d{5})-?(\d{3})\b/);
  
  if (cepMatch) {
    const cep = cepMatch[1] + cepMatch[2];
    const cepNumber = parseInt(cep);
    
    // Faixas de CEP do estado de São Paulo
    // São Paulo: 01000-000 a 19999-999
    if (cepNumber >= 1000000 && cepNumber <= 19999999) {
      console.log(`✅ CEP ${cep} está dentro do estado de São Paulo`);
      return false;
    } else {
      console.log(`❌ CEP ${cep} está fora do estado de São Paulo`);
      return true;
    }
  }
  
  // Se não tem CEP, verificar por nomes de estados/cidades conhecidas fora de SP
  const outsideStates = [
    // Rio de Janeiro
    'rio de janeiro', 'rj', 'niterói', 'niteroi', 'petrópolis', 'petropolis', 
    'nova iguaçu', 'nova iguacu', 'duque de caxias', 'são gonçalo', 'sao goncalo',
    'volta redonda', 'campos dos goytacazes', 'belford roxo', 'são joão de meriti', 
    'sao joao de meriti', 'nova friburgo', 'macaé', 'macae', 'cabo frio',
    'angra dos reis', 'resende', 'barra mansa', 'teresópolis', 'teresopolis',
    'magé', 'mage', 'itaboraí', 'itaborai', 'maricá', 'marica', 'araruama',
    'saquarema', 'silva jardim', 'casimiro de abreu', 'rio das ostras',
    'búzios', 'buzios', 'arraial do cabo', 'iguaba grande', 'são pedro da aldeia',
    'sao pedro da aldeia', 'cabo frio', 'armação dos búzios', 'armacao dos buzios',
    
    // Brasília/DF
    'brasília', 'brasilia', 'distrito federal', 'df', 'taguatinga', 'ceilândia',
    'ceilandia', 'samambaia', 'planaltina', 'águas claras', 'aguas claras',
    'guará', 'guara', 'sobradinho', 'gama', 'santa maria', 'são sebastião',
    'sao sebastiao', 'paranoá', 'paranoa', 'riacho fundo', 'núcleo bandeirante',
    'nucleo bandeirante', 'cruzeiro', 'lago sul', 'lago norte', 'sudoeste',
    'octogonal', 'candangolândia', 'candangolandia', 'estrutural', 'itapoã',
    'itapoa', 'jardim botânico', 'jardim botanico', 'park way', 'scia',
    'vicente pires', 'fercal', 'varjão', 'varjao',
    
    // Minas Gerais
    'belo horizonte', 'mg', 'minas gerais', 'contagem', 'uberlândia', 'uberlandia',
    'juiz de fora', 'betim', 'montes claros', 'ribeirão das neves', 'ribeirao das neves',
    'uberaba', 'governador valadares', 'ipatinga', 'sete lagoas', 'divinópolis',
    'divinopolis', 'santa luzia', 'ibirité', 'ibirite', 'poços de caldas',
    'pocos de caldas', 'patos de minas', 'teófilo otoni', 'teofilo otoni',
    'barbacena', 'sabará', 'sabara', 'vespasiano', 'araguari', 'conselheiro lafaiete',
    'itabira', 'passos', 'coronel fabriciano', 'muriaé', 'muriae', 'ituiutaba',
    'lavras', 'nova lima', 'pará de minas', 'para de minas', 'paracatu',
    'pouso alegre', 'timóteo', 'timoteo', 'unaí', 'unai', 'varginha',
    'araxá', 'araxa', 'formiga', 'itajubá', 'itajuba', 'joão monlevade',
    'joao monlevade', 'manhuaçu', 'manhuacu', 'nova serrana', 'ouro preto',
    'pedro leopoldo', 'são joão del rei', 'sao joao del rei', 'três corações',
    'tres coracoes', 'viçosa', 'vicosa',
    
    // Outros estados importantes
    'curitiba', 'paraná', 'parana', 'pr', 'londrina', 'maringá', 'maringa',
    'ponta grossa', 'cascavel', 'são josé dos pinhais', 'sao jose dos pinhais',
    'foz do iguaçu', 'foz do iguacu', 'colombo', 'guarapuava', 'paranaguá',
    'paranagua', 'araucária', 'araucaria', 'toledo', 'apucarana', 'pinhais',
    'campo largo', 'arapongas', 'almirante tamandaré', 'almirante tamandare',
    'umuarama', 'paranavaí', 'paranavai', 'cambé', 'cambe', 'francisco beltrão',
    'francisco beltrao', 'fazenda rio grande', 'sarandi', 'fazenda rio grande',
    'são josé da lapa', 'sao jose da lapa', 'telêmaco borba', 'telemaco borba',
    
    // Espírito Santo
    'vitória', 'vitoria', 'es', 'espírito santo', 'espirito santo', 'vila velha',
    'cariacica', 'serra', 'cachoeiro de itapemirim', 'linhares', 'são mateus',
    'sao mateus', 'colatina', 'guarapari', 'nova venécia', 'nova venecia',
    'aracruz', 'viana', 'marataízes', 'marataizes', 'santa teresa', 'itapemirim',
    'castelo', 'domingos martins', 'alegre', 'baixo guandu', 'barra de são francisco',
    'barra de sao francisco', 'conceição da barra', 'conceicao da barra',
    'fundão', 'fundao', 'iúna', 'iuna', 'jaguaré', 'jaguare', 'mimoso do sul',
    'muqui', 'piúma', 'piuma', 'presidente kennedy', 'rio novo do sul',
    'santa leopoldina', 'santa maria de jetibá', 'santa maria de jetiba',
    'são gabriel da palha', 'sao gabriel da palha', 'são roque do canaã',
    'sao roque do canaa', 'vargem alta', 'vila pavão', 'vila pavao',
    'vila valério', 'vila valerio',
    
    // Bahia
    'salvador', 'ba', 'bahia', 'feira de santana', 'vitória da conquista',
    'vitoria da conquista', 'camaçari', 'camacari', 'juazeiro', 'ilhéus',
    'ilheus', 'itabuna', 'lauro de freitas', 'jequié', 'jequie', 'alagoinhas',
    'barreiras', 'porto seguro', 'simões filho', 'simoes filho', 'paulo afonso',
    'eunápolis', 'eunapolis', 'santo antônio de jesus', 'santo antonio de jesus',
    'valença', 'valenca', 'candeias', 'guanambi', 'jacobina', 'serrinha',
    'senhor do bonfim', 'dias d\'ávila', 'dias d\'avila', 'bom jesus da lapa',
    'cruz das almas', 'santo amaro', 'conceição do coité', 'conceicao do coite',
    'livramento de nossa senhora', 'ribeira do pombal', 'tucano', 'euclides da cunha',
    'casa nova', 'barra', 'xique-xique', 'remanso', 'campo formoso', 'juazeiro',
    'petrolina', 'sobradinho', 'casa nova', 'sento sé', 'sento se', 'pilão arcado',
    'pilao arcado', 'campo alegre de lourdes', 'curaçá', 'curaca', 'uauá', 'uaua',
    'canudos', 'monte santo', 'euclides da cunha', 'paripiranga', 'ribeira do amparo',
    'cícero dantas', 'cicero dantas', 'banzaê', 'banzae', 'fátima', 'fatima',
    'heliópolis', 'heliopolis', 'nova soure', 'olindina', 'ouriçangas', 'ouricangas',
    'quijingue', 'retirolandia', 'santaluz', 'são domingos', 'sao domingos',
    'teofilândia', 'teofilandia', 'tucano', 'valente', 'biritinga', 'barrocas',
    'boa vista do tupim', 'central', 'cansanção', 'cansancao', 'ichu', 'itiúba',
    'itiuba', 'lamarão', 'lamarao', 'monte santo', 'nordestina', 'queimadas',
    'quijingue', 'retirolândia', 'retirolandia', 'santaluz', 'são domingos',
    'sao domingos', 'serrinha', 'teofilândia', 'teofilandia', 'tucano', 'valente',
    
    // Goiás
    'goiânia', 'goiania', 'go', 'goiás', 'goias', 'aparecida de goiânia',
    'aparecida de goiania', 'anápolis', 'anapolis', 'rio verde', 'luziânia',
    'luziania', 'águas lindas de goiás', 'aguas lindas de goias', 'valparaíso de goiás',
    'valparaiso de goias', 'trindade', 'formosa', 'novo gama', 'itumbiara',
    'senador canedo', 'catalão', 'catalao', 'jataí', 'jatai', 'planaltina',
    'caldas novas', 'santo antônio do descoberto', 'santo antonio do descoberto',
    'cidade ocidental', 'mineiros', 'cristalina', 'inhumas', 'goianésia',
    'goianesia', 'quirinópolis', 'quirinopolis', 'ceres', 'porangatu', 'morrinhos'
  ];
  
  // Verificar se contém algum estado/cidade fora de SP
  const isOutside = outsideStates.some(location => addressLower.includes(location));
  
  if (isOutside) {
    console.log(`❌ Endereço "${address}" detectado como fora do estado de São Paulo`);
    return true;
  }
  
  console.log(`✅ Endereço "${address}" não foi detectado como fora do estado de São Paulo`);
  return false;
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
        finalPrice: dailyPrice
      };
    }
    
    // Verificar se os endereços contêm CEPs (com fallback nos dados locais) e tentar usar sistema de precificação por CEP
    const originCep = extractCepWithFallback(origin);
    const destinationCep = extractCepWithFallback(destination);
    
    // NOVO: Verificar sistema de preços regionais primeiro
    const regionalPrice = getRegionalPrice(originCep || '', destinationCep || '', origin, destination);
    
    if (regionalPrice) {
      const vehicleTypeMapping: { [key: string]: keyof RegionalPrices } = {
        'economico': 'executivoComum',
        'executivo': 'executivoSedan',
        'luxo': 'executivoPremiumBlindado',
        'suv': 'minivanComum',
        'minivanBlindada': 'minivanBlindada',
        'van15Lugares': 'van15Lugares'
      };
      
      const regionalVehicleType = vehicleTypeMapping[vehicleType] || 'executivoSedan';
      const price = regionalPrice[regionalVehicleType];
      
      console.log(`🏙️ Usando preço regional: R$ ${price.toFixed(2)} [${vehicleType}]`);
      
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
        console.warn('⚠️ Erro ao obter dados de distância/tempo para preço regional, usando valores padrão');
      }
      
      return {
        distance: Math.round(distance * 10) / 10,
        estimatedTime: Math.round(estimatedTime),
        basePrice: price,
        finalPrice: price
      };
    }
    
    if (originCep && destinationCep) {
      // Usar sistema de precificação por CEP
      const cepPrice = findPriceByCep(originCep, destinationCep, fixedPriceVehicleType);
      
      if (cepPrice !== null) {
        console.log(`💰 Usando preço por CEP: R$ ${cepPrice.toFixed(2)}`);
        
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
        
        return {
          distance: Math.round(distance * 10) / 10,
          estimatedTime: Math.round(estimatedTime),
          basePrice: cepPrice,
          finalPrice: cepPrice
        };
      }
    }
    
    // Tentar usar sistema de tarifas fixas
    const fixedPrice = findFixedPrice(origin, destination, fixedPriceVehicleType);
    
    if (fixedPrice) {
      console.log(`💰 Usando tarifa fixa: R$ ${fixedPrice.toFixed(2)}`);
      
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
        finalPrice: fixedPrice
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
    
    // Detectar tipos de local e aplicar taxas
    const originType = detectLocationType(origin);
    const destType = detectLocationType(destination);
    
    const originSurcharge = calculateLocationSurcharge(originType);
    const destSurcharge = calculateLocationSurcharge(destType);
    
    // Aplicar a maior taxa entre origem e destino
    const maxSurcharge = Math.max(originSurcharge, destSurcharge);
    if (maxSurcharge > 1.0) {
      finalPrice *= maxSurcharge;
    }
    
    // Taxa para viagens longas (>25km)
    if (distance > 25) {
      finalPrice *= 1.3;
    }
    
    // Preço mínimo
    const minimumPrice = vehicleType === 'luxo' ? 120 : 
                        vehicleType === 'suv' ? 100 : 
                        vehicleType === 'minivanBlindada' ? 150 :
                        vehicleType === 'van15Lugares' ? 120 : 80;
    if (finalPrice < minimumPrice) {
      finalPrice = minimumPrice;
    }
    
    const result = {
      distance: Math.round(distance * 10) / 10,
      estimatedTime: Math.round(estimatedTime),
      basePrice: Math.round(basePrice * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100
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
      finalPrice: 80
    };
    
    console.log(`💰 [DEBUG] Resultado fallback:`, fallbackResult);
    return fallbackResult;
  }
};

// Função para encontrar CEP nos dados locais
export const findCepInLocalData = (addressText: string): string | null => {
  const normalizedAddress = addressText.toLowerCase().trim();
  
  // Procurar nos endereços de São Paulo
  for (const [key, data] of Object.entries(saoPauloAddresses)) {
    const normalizedKey = key.toLowerCase();
    
    // Verificar se o endereço contém o nome do local
    if (normalizedAddress.includes(normalizedKey)) {
      console.log(`🎯 CEP encontrado nos dados locais: ${key} → ${data.cep}`);
      return data.cep;
    }
    
    // Verificar variações do nome
    if (data.variations) {
      for (const variation of data.variations) {
        const normalizedVariation = variation.toLowerCase();
        if (normalizedAddress.includes(normalizedVariation)) {
          console.log(`🎯 CEP encontrado por variação: ${variation} → ${data.cep}`);
          return data.cep;
        }
      }
    }
  }
  
  return null;
};

// Função para extrair CEP de um endereço
export const extractCepFromAddress = (address: string): string | null => {
  // Padrões de CEP: 12345-678 ou 12345678
  const cepPatterns = [
    /\b(\d{5})-(\d{3})\b/,  // 12345-678
    /\b(\d{8})\b/           // 12345678
  ];
  
  for (const pattern of cepPatterns) {
    const match = address.match(pattern);
    if (match) {
      let cep: string;
      if (match[2]) {
        // Formato 12345-678
        cep = match[1] + match[2];
      } else {
        // Formato 12345678
        cep = match[1];
      }
      
      // Validar se é um CEP válido (8 dígitos)
      if (cep.length === 8 && /^\d{8}$/.test(cep)) {
        console.log(`📮 CEP extraído: ${cep}`);
        return cep;
      }
    }
  }
  
  return null;
};

// Função para extrair CEP com fallback nos dados locais
export const extractCepWithFallback = (address: string): string | null => {
  // Primeiro, tentar extrair CEP diretamente do endereço
  const directCep = extractCepFromAddress(address);
  if (directCep) {
    return directCep;
  }
  
  // Se não encontrou CEP, procurar nos dados locais
  const localCep = findCepInLocalData(address);
  if (localCep) {
    return localCep;
  }
  
  console.log(`⚠️ Nenhum CEP encontrado para: "${address}"`);
  return null;
};

// Função para verificar se um endereço tem CEP válido
export const hasValidCep = (address: string): boolean => {
  return extractCepFromAddress(address) !== null;
};

// Função para calcular preço usando sistema de CEPs
export const calculatePriceWithCepSystem = async (
  origin: string,
  destination: string,
  vehicleType: 'economico' | 'executivo' | 'luxo' | 'suv' | 'minivanBlindada' | 'van15Lugares' = 'executivo'
): Promise<{ price: number; usedCepSystem: boolean } | null> => {
  const originCep = extractCepWithFallback(origin);
  const destinationCep = extractCepWithFallback(destination);
  
  if (!originCep || !destinationCep) {
    return null;
  }
  
  // Mapear tipos de veículo para as categorias do sistema de CEPs
  const vehicleTypeMapping: { [key: string]: keyof typeof DAILY_RATES } = {
    'economico': 'executivoComum',
    'executivo': 'executivoSedan',
    'luxo': 'executivoPremiumBlindado',
    'suv': 'minivanComum',
    'minivanBlindada': 'minivanBlindada',
    'van15Lugares': 'van15Lugares'
  };
  
  const cepVehicleType = vehicleTypeMapping[vehicleType] || 'executivoSedan';
  const price = findPriceByCep(originCep, destinationCep, cepVehicleType);
  
  if (price !== null) {
    return { price, usedCepSystem: true };
  }
  
  return null;
};