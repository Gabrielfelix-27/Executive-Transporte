// Serviço Google Places API - Usando Web Components (Não requisições diretas)
// Este serviço foi atualizado para trabalhar com GoogleMapsPlacePicker

import { GOOGLE_MAPS_API_KEY, isGoogleMapsConfigured, SEARCH_CONFIG, DEFAULT_REGION } from '@/config/maps';

export interface GooglePlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
  terms: Array<{
    offset: number;
    value: string;
  }>;
}

export interface GooglePlaceDetails {
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
  name: string;
  types: string[];
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
  source: 'google' | 'fallback';
}

/**
 * ⚠️ IMPORTANTE: Este serviço NÃO faz requisições diretas ao Google Places
 * 
 * As requisições diretas são bloqueadas pelo navegador (CORS).
 * Use o componente GoogleMapsPlacePicker que usa Web Components oficiais.
 * 
 * Este serviço existe apenas para compatibilidade e fallback.
 */
export const searchPlaces = async (query: string): Promise<AddressSuggestion[]> => {
  console.warn('⚠️ [GooglePlacesService] Tentativa de busca direta bloqueada');
  console.warn('⚠️ Use GoogleMapsPlacePicker em vez de requisições diretas');
  
  if (!query || query.length < SEARCH_CONFIG.minQueryLength) {
    return [];
  }

  // Verificar se Google Maps está configurado
  if (!isGoogleMapsConfigured()) {
    console.warn('Google Maps API não configurada.');
    return [];
  }

  // NÃO fazer requisições diretas - são bloqueadas por CORS
  console.log('🚫 Requisições diretas para Google Places são bloqueadas pelo navegador');
  console.log('✅ Use o componente GoogleMapsPlacePicker para autocomplete');
  
  return [];
};

/**
 * Teste de conexão sem fazer requisições diretas
 * DESABILITADO para evitar conflitos com GoogleMapsPlacePicker
 */
export const testGooglePlacesConnection = async (): Promise<boolean> => {
  if (!isGoogleMapsConfigured()) {
    console.log('❌ Google Maps API não configurada');
    return false;
  }
  
  console.log('✅ Google Maps API configurada');
  
  // ⚠️ DESABILITADO: Teste de carregamento pode causar conflitos
  console.log('ℹ️ Teste de carregamento desabilitado para evitar conflitos');
  console.log('✅ Use GoogleMapsPlacePicker para teste real');
  return true;
  
  /*
  // Testar carregamento da API JavaScript
  try {
    const testScript = document.createElement('script');
    testScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,marker&v=weekly&callback=__test_callback__`;
    
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        console.log('⏰ Timeout do teste de conexão');
        resolve(false);
      }, 10000);
      
      (window as any).__test_callback__ = () => {
        clearTimeout(timeout);
        console.log('✅ Google Maps JavaScript API carregada com sucesso');
        delete (window as any).__test_callback__;
        testScript.remove();
        resolve(true);
      };
      
      testScript.onerror = () => {
        clearTimeout(timeout);
        console.log('❌ Erro ao carregar Google Maps JavaScript API');
        delete (window as any).__test_callback__;
        testScript.remove();
        resolve(false);
      };
      
      document.head.appendChild(testScript);
    });
  } catch (error) {
    console.error('❌ Erro no teste de conexão:', error);
    return false;
  }
  */
};

/**
 * Obtém detalhes de um lugar (não implementado - use Web Components)
 */
export const getPlaceDetails = async (placeId: string): Promise<GooglePlaceDetails | null> => {
  console.warn('⚠️ getPlaceDetails: Use Web Components em vez de requisições diretas');
  return null;
};

/**
 * Limpa caches (não necessário para Web Components)
 */
export const clearPlacesCache = (): void => {
  console.log('📋 Cache limpo (Web Components gerenciam cache automaticamente)');
};

export default {
  searchPlaces,
  getPlaceDetails,
  testGooglePlacesConnection,
  clearPlacesCache
};