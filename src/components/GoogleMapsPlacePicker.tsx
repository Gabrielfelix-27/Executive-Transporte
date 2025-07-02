// Componente Google Maps Place Picker - Autocomplete Tradicional FUNCIONANDO
// Usando Google Maps JavaScript API diretamente (mais confiável que Web Components)

import React, { useEffect, useRef, useState } from 'react';
import { isGoogleMapsConfigured } from '@/config/maps';

interface GoogleMapsPlacePickerProps {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (value: string, place?: any) => void;
  className?: string;
}

// Função para carregar a API do Google Maps dinamicamente
const loadGoogleMapsAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Se já está carregado, resolver imediatamente
    if ((window as any).google && (window as any).google.maps) {
      resolve();
      return;
    }

    // Verificar se já existe um script sendo carregado
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Aguardar o carregamento
      const checkLoaded = () => {
        if ((window as any).google && (window as any).google.maps) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    // Carregar a API do Google Maps
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBdVl-cTICSwYKrZ95SuvNw7dbMuDt1KG0&libraries=places&language=pt-BR&region=BR`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('✅ Google Maps API carregada com sucesso');
      resolve();
    };
    
    script.onerror = () => {
      console.error('❌ Erro ao carregar Google Maps API');
      reject(new Error('Falha ao carregar Google Maps API'));
    };
    
    document.head.appendChild(script);
  });
};

export const GoogleMapsPlacePicker: React.FC<GoogleMapsPlacePickerProps> = ({
  id,
  placeholder = "Digite um endereço...",
  value,
  onChange,
  className = ""
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
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
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if ((window as any).google && (window as any).google.maps && (window as any).google.maps.places) {
        setIsLoaded(true);
        initializeAutocomplete();
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

  const initializeAutocomplete = () => {
    if (!inputRef.current || !(window as any).google?.maps?.places) return;

    try {
      // Limpar instância anterior se existir
      cleanup();

      // Configuração do autocomplete
      const google = (window as any).google;
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'BR' },
        fields: ['formatted_address', 'name', 'geometry', 'place_id']
      });

      autocompleteRef.current = autocomplete;

      // Listener para quando uma opção é selecionada
      const placeChangedListener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (place && (place.formatted_address || place.name)) {
          const selectedAddress = place.formatted_address || place.name || '';
          console.log(`🎯 ${id} - Endereço selecionado:`, selectedAddress);
          
          // Atualizar o valor do input e chamar onChange
          if (inputRef.current) {
            inputRef.current.value = selectedAddress;
          }
          onChange(selectedAddress, place);
        }
      });

      // Armazenar listener para limpeza posterior
      listenersRef.current.push(placeChangedListener);

      console.log(`✅ ${id} - Autocomplete inicializado com sucesso`);
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
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onClick={handleInputClick}
          className={`w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400 ${className}`}
        />
        <div className="text-xs text-gray-500 mt-1">
          💡 Google Maps não disponível - usando input manual
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
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClick={handleInputClick}
        className={`w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400 ${className}`}
        autoComplete="off"
      />
      {(isLoading || !isLoaded) && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        </div>
      )}
      {isLoaded && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsPlacePicker; 