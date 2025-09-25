// Componente Google Maps Place Picker - Autocomplete Tradicional FUNCIONANDO
// Usando Google Maps JavaScript API diretamente (mais confiável que Web Components)

import React, { useEffect, useRef, useState } from 'react';
import { isGoogleMapsConfigured, GOOGLE_MAPS_API_KEY } from '@/config/maps';
import { useLanguage } from '@/contexts/LanguageContext';
import { saoPauloAddresses } from '@/data/saoPauloAddresses';
import { extractCepFromAddress, findCepInLocalData } from '@/utils/locationUtils';

interface GoogleMapsPlacePickerProps {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (value: string, place?: any) => void;
  className?: string;
}

// Global flag para evitar múltiplos carregamentos
let isGoogleMapsLoading = false;
let isGoogleMapsLoaded = false;

// Função para carregar a API do Google Maps dinamicamente
const loadGoogleMapsAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Se já está carregado, resolver imediatamente
    if (isGoogleMapsLoaded && (window as any).google && (window as any).google.maps) {
      resolve();
      return;
    }

    // Se já está carregando, aguardar
    if (isGoogleMapsLoading) {
      const checkLoaded = () => {
        if (isGoogleMapsLoaded && (window as any).google && (window as any).google.maps) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    // Remover scripts existentes com chaves antigas
    const existingScripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
    existingScripts.forEach(script => {
      const scriptElement = script as HTMLScriptElement;
      if (scriptElement.src.includes('AIzaSyBdVl-cTICSwYKrZ95SuvNw7dbMuDt1KG0')) {
        console.log('🗑️ Removendo script com chave antiga');
        script.remove();
      }
    });

    // Usar a chave configurada
    const apiKey = GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.error('⚠️ Google Maps API Key não configurada');
      return;
    }
    
    // Verificar se já existe script com a chave correta
    const correctScript = document.querySelector(`script[src*="${apiKey}"]`);
    if (correctScript) {
      const checkLoaded = () => {
        if ((window as any).google && (window as any).google.maps) {
          isGoogleMapsLoaded = true;
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    isGoogleMapsLoading = true;
    
    // Carregar a API do Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=pt-BR&region=BR&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isGoogleMapsLoading = false;
      isGoogleMapsLoaded = true;
      console.log('✅ Google Maps API carregada com sucesso');
      resolve();
    };
    
    script.onerror = () => {
      isGoogleMapsLoading = false;
      console.error('❌ Erro ao carregar Google Maps API');
      reject(new Error('Falha ao carregar Google Maps API'));
    };
    
    document.head.appendChild(script);
  });
};

export const GoogleMapsPlacePicker: React.FC<GoogleMapsPlacePickerProps> = ({
  id,
  placeholder,
  value,
  onChange,
  className = ""
}) => {
  const { t } = useLanguage();
  const finalPlaceholder = placeholder || t('form.typeAddress');
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [useNewAPI, setUseNewAPI] = useState(false);
  const listenersRef = useRef<any[]>([]);

  useEffect(() => {
    initializeGoogleMaps();

    return () => {
      cleanup();
    };
  }, []);

  const initializeGoogleMaps = async () => {
    setIsLoading(true);
    setLoadError(false);

    try {
      // Tentar carregar a API do Google Maps
      await loadGoogleMapsAPI();
      
      // Aguardar um pouco para garantir que a API está totalmente carregada
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if ((window as any).google && (window as any).google.maps && (window as any).google.maps.places) {
        // Priorizar a nova API PlaceAutocompleteElement
        if ((window as any).google.maps.places.PlaceAutocompleteElement) {
          setUseNewAPI(true);
          console.log('✅ Usando nova PlaceAutocompleteElement API (recomendada)');
          initializeNewAutocomplete();
        } else {
          console.warn('⚠️ PlaceAutocompleteElement não disponível, usando Autocomplete clássico (depreciado)');
          initializeClassicAutocomplete();
        }
        
        setIsLoaded(true);
        console.log('✅ Google Maps Autocomplete inicializado');
      } else {
        throw new Error('Google Maps API não carregou completamente');
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar Google Maps:', error);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanup = () => {
    // Limpar todos os listeners
    listenersRef.current.forEach(listener => {
      if (listener && (window as any).google?.maps?.event) {
        (window as any).google.maps.event.removeListener(listener);
      }
    });
    listenersRef.current = [];

    // Limpar autocomplete
    if (autocompleteRef.current && (window as any).google?.maps?.event) {
      (window as any).google.maps.event.clearInstanceListeners(autocompleteRef.current);
      autocompleteRef.current = null;
    }
  };

  // Função para extrair CEP dos componentes de endereço
  const extractCepFromAddressComponents = (addressComponents: any[]): string | null => {
    if (!addressComponents) return null;
    
    for (const component of addressComponents) {
      if (component.types.includes('postal_code')) {
        const cep = component.long_name;
        // Normalizar formato do CEP
        if (cep && /^\d{5}-?\d{3}$/.test(cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2'))) {
          const digits = cep.replace(/\D/g, '');
          return digits.length === 8 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : cep;
        }
        return cep;
      }
    }
    return null;
  };

  // Função para buscar CEP nos dados locais
  const findCepInLocalDataComponent = (addressText: string): string | null => {
    // Usar a função melhorada do locationUtils
    return findCepInLocalData(addressText);
  };

  // Função para formatar endereço com CEP sempre visível
  const formatAddressWithCep = (place: any): string => {
    let baseAddress = place.formatted_address || place.name || '';
    
    // Verificar se já tem CEP no endereço usando a função melhorada
    const existingCep = extractCepFromAddress(baseAddress);
    if (existingCep) {
      return baseAddress; // Já tem CEP, retornar como está
    }
    
    // Tentar extrair CEP dos componentes do Google Maps
    const cep = extractCepFromAddressComponents(place.address_components);
    if (cep) {
      // Adicionar CEP ao final do endereço se não estiver presente
      return `${baseAddress}, ${cep}`;
    }
    
    // FALLBACK: Buscar CEP nos dados locais se Google Maps não retornou
    const localCep = findCepInLocalDataComponent(baseAddress);
    if (localCep) {
      console.log(`🔄 ${id} - CEP encontrado nos dados locais: ${localCep} para "${baseAddress}"`);
      return `${baseAddress}, ${localCep}`;
    }
    
    console.warn(`⚠️ ${id} - Nenhum CEP encontrado para "${baseAddress}"`);
    return baseAddress;
  };

  const initializeNewAutocomplete = () => {
    if (!inputRef.current) return;

    try {
      // Limpar instância anterior se existir
      cleanup();

      // Configuração da nova API PlaceAutocompleteElement
      const google = (window as any).google;
      const autocompleteElement = new google.maps.places.PlaceAutocompleteElement({
        componentRestrictions: { country: 'BR' },
        fields: ['formatted_address', 'name', 'geometry', 'place_id', 'address_components'],
        types: ['establishment', 'geocode']
      });

      // Substituir o input pelo elemento de autocomplete
      if (inputRef.current.parentNode) {
        inputRef.current.parentNode.replaceChild(autocompleteElement, inputRef.current);
        autocompleteRef.current = autocompleteElement;
      }

      // Listener para quando uma opção é selecionada
      const placeChangedListener = autocompleteElement.addEventListener('gmp-placeselect', (event: any) => {
        const place = event.place;
        
        if (place && (place.formatted_address || place.name)) {
          const formattedAddress = formatAddressWithCep(place);
          console.log(`🎯 ${id} - Endereço selecionado (Nova API):`, formattedAddress);
          onChange(formattedAddress, place);
        }
      });

      listenersRef.current.push(placeChangedListener);
      console.log(`✅ ${id} - Nova PlaceAutocompleteElement inicializada`);
    } catch (error) {
      console.error(`❌ ${id} - Erro ao inicializar nova API, usando clássica:`, error);
      initializeClassicAutocomplete();
    }
  };

  const initializeClassicAutocomplete = () => {
    if (!inputRef.current || !(window as any).google?.maps?.places) return;

    try {
      // Limpar instância anterior se existir
      cleanup();

      // Configuração do autocomplete clássico
      const google = (window as any).google;
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'BR' },
        fields: ['formatted_address', 'name', 'geometry', 'place_id', 'address_components']
      });

      autocompleteRef.current = autocomplete;

      // Listener para quando uma opção é selecionada
      const placeChangedListener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (place && (place.formatted_address || place.name)) {
          const formattedAddress = formatAddressWithCep(place);
          console.log(`🎯 ${id} - Endereço selecionado:`, formattedAddress);
          
          // Atualizar o valor do input e chamar onChange
          if (inputRef.current) {
            inputRef.current.value = formattedAddress;
          }
          onChange(formattedAddress, place);
        }
      });

      // Armazenar listener para limpeza posterior
      listenersRef.current.push(placeChangedListener);

      console.log(`✅ ${id} - Autocomplete clássico inicializado`);
    } catch (error) {
      console.error(`❌ ${id} - Erro ao inicializar autocomplete:`, error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Impedir propagação do evento
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Impedir propagação do evento
    console.log(`🔍 ${id} - Input focado`);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Impedir propagação do evento
    console.log(`👋 ${id} - Input desfocado`);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Impedir propagação do evento
    console.log(`👆 ${id} - Input clicado`);
  };

  // Se houve erro ao carregar, mostrar input simples
  if (loadError) {
    return (
      <div>
        <input
          type="text"
          placeholder={finalPlaceholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onClick={handleInputClick}
          className={`w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400 ${className}`}
        />
        <div className="text-xs text-gray-500 mt-1">
          💡 Google Maps não disponível - usando input manual
        </div>
      </div>
    );
  }

  // Se está usando a nova API, não renderizar input (será substituído)
  if (useNewAPI && isLoaded) {
    return (
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          type="text"
          id={id}
          placeholder={finalPlaceholder}
          className={`w-full px-1 py-1 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400 ${className}`}
          autoComplete="off"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <input
        ref={inputRef}
        type="text"
        id={id}
        placeholder={finalPlaceholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClick={handleInputClick}
        className={`w-full px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400 ${className}`}
        autoComplete="off"
      />
      {(isLoading || !isLoaded) && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        </div>
      )}
      {isLoaded && !useNewAPI && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsPlacePicker;