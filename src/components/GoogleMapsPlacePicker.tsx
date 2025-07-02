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
  const listenersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!isGoogleMapsConfigured()) {
      console.warn('Google Maps não está configurado');
      return;
    }

    // Aguardar o carregamento do Google Maps
    const checkGoogleMaps = () => {
      if ((window as any).google && (window as any).google.maps && (window as any).google.maps.places) {
        setIsLoaded(true);
        initializeAutocomplete();
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };

    checkGoogleMaps();

    return () => {
      cleanup();
    };
  }, []);

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

  if (!isGoogleMapsConfigured()) {
    return (
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
      {!isLoaded && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsPlacePicker; 