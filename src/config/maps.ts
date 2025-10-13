// Configurações para APIs de mapas e geolocalização

// Google Maps API Key - usar a chave válida com fallback seguro
export const GOOGLE_MAPS_API_KEY = (() => {
  // Pega apenas da variável de ambiente - sem fallback por segurança
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    console.error('⚠️ GOOGLE_MAPS_API_KEY não configurada. Configure VITE_GOOGLE_MAPS_API_KEY no arquivo .env');
  }
  
  return apiKey;
})();

// Verificação se a chave está configurada
export const isGoogleMapsConfigured = (): boolean => {
  try {
    const isConfigured = Boolean(GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'your_google_maps_api_key_here');
    return isConfigured;
  } catch (error) {
    console.warn('Erro na verificação do Google Maps:', error);
    return false;
  }
};

// Para usar a API do OpenCage Geocoding (alternativa gratuita):
// export const OPENCAGE_API_KEY = 'YOUR_OPENCAGE_API_KEY';

// Configurações regionais
export const DEFAULT_REGION = {
  country: 'BR',
  state: 'SP',
  city: 'São Paulo',
  bounds: {
    north: -23.3,
    south: -23.8,
    east: -46.3,
    west: -46.8
  },
  center: {
    lat: -23.5505,
    lng: -46.6333
  }
};

// URLs das APIs
export const API_ENDPOINTS = {
  googlePlaces: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  googlePlaceDetails: 'https://maps.googleapis.com/maps/api/place/details/json',
  googleDirections: 'https://maps.googleapis.com/maps/api/directions/json',
  googleGeocode: 'https://maps.googleapis.com/maps/api/geocode/json',
  nominatim: 'https://nominatim.openstreetmap.org/search'
};

// Configurações de busca
export const SEARCH_CONFIG = {
  minQueryLength: 2,
  maxSuggestions: 8,
  searchDelay: 200, // ms - mais rápido para melhor UX
  defaultRadius: 50000, // metros (50km para região metropolitana)
  language: 'pt-BR',
  components: 'country:br', // Restringir ao Brasil
  sessionToken: () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
};

// Tipos de locais priorizados na busca do Google Places
export const GOOGLE_PLACE_TYPES = [
  'airport',
  'bus_station', 
  'train_station',
  'subway_station',
  'hotel',
  'lodging',
  'shopping_mall',
  'hospital',
  'university',
  'school',
  'restaurant',
  'establishment',
  'point_of_interest'
];

// Configurações específicas para diferentes regiões metropolitanas
export const REGIONAL_BOUNDS = {
  sao_paulo: {
    north: -23.3,
    south: -23.8,
    east: -46.3,
    west: -46.8
  },
  guarulhos: {
    north: -23.35,
    south: -23.5,
    east: -46.4,
    west: -46.6
  },
  abc: {
    north: -23.6,
    south: -23.8,
    east: -46.4,
    west: -46.6
  }
};

export default {
  GOOGLE_MAPS_API_KEY,
  isGoogleMapsConfigured,
  DEFAULT_REGION,
  API_ENDPOINTS,
  SEARCH_CONFIG,
  GOOGLE_PLACE_TYPES,
  REGIONAL_BOUNDS
};