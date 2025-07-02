// Componente Google Maps Place Picker - Autocomplete Tradicional FUNCIONANDO
// Usando Google Maps JavaScript API diretamente (mais confiável que Web Components)

import { useEffect, useRef, useState } from 'react';
import { isGoogleMapsConfigured, GOOGLE_MAPS_API_KEY } from '@/config/maps';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapsPlacePickerProps {
  placeholder: string;
  value: string;
  onChange: (value: string, place?: any) => void;
  onPlaceSelect?: (place: any) => void;
  showMap?: boolean;
  className?: string;
}

export const GoogleMapsPlacePicker = ({ 
  placeholder, 
  value, 
  onChange, 
  onPlaceSelect,
  showMap = false,
  className = ""
}: GoogleMapsPlacePickerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);

  console.log('🗺️ GoogleMapsPlacePicker inicializado - placeholder:', placeholder);

  // Carregar Google Maps API dinamicamente
  useEffect(() => {
    if (!isGoogleMapsConfigured()) {
      setError('Google Maps API Key não configurada');
      return;
    }

    const loadGoogleMaps = async () => {
      try {
        // Se já está carregado, inicializar diretamente
        if (window.google?.maps?.places) {
          console.log('✅ Google Maps já carregado, inicializando autocomplete');
          setIsLoaded(true);
          return;
        }

        console.log('🔄 Carregando Google Maps JavaScript API...');

        // Carregar Google Maps JavaScript API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&language=pt-BR&region=BR`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('✅ Google Maps JavaScript API carregada com sucesso');
          setIsLoaded(true);
        };
        
        script.onerror = () => {
          console.error('❌ Erro ao carregar Google Maps API');
          setError('Erro ao carregar Google Maps API - Verifique sua API key');
        };

        document.head.appendChild(script);
      } catch (err) {
        console.error('❌ Erro ao inicializar Google Maps:', err);
        setError('Erro ao inicializar Google Maps');
      }
    };

    loadGoogleMaps();
  }, []);

  // Inicializar autocomplete quando API estiver carregada
  useEffect(() => {
    if (!isLoaded || !inputRef.current || !window.google?.maps?.places) return;

    try {
      console.log('🎯 Inicializando Google Places Autocomplete...');

      // Configurar autocomplete com configurações otimizadas para o Brasil
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode', 'establishment'], // Endereços e estabelecimentos
        componentRestrictions: { country: 'br' }, // Apenas Brasil
        fields: [
          'place_id', 
          'formatted_address', 
          'name', 
          'geometry', 
          'address_components',
          'types'
        ]
      });

      // Event listener para quando um lugar é selecionado
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        
        console.log('🎯 Lugar selecionado:', place);

        if (!place || !place.formatted_address) {
          console.warn('⚠️ Lugar inválido selecionado');
          return;
        }

        // Usar formatted_address ou name como valor principal
        const displayValue = place.formatted_address || place.name || '';
        
        console.log('📍 Endereço formatado:', displayValue);

        // Atualizar valor
        onChange(displayValue, place);

        // Callback opcional
        if (onPlaceSelect) {
          onPlaceSelect(place);
        }
      });

      console.log('✅ Google Places Autocomplete configurado com sucesso');

    } catch (err) {
      console.error('❌ Erro ao configurar autocomplete:', err);
      setError('Erro ao configurar autocomplete');
    }
  }, [isLoaded, onChange, onPlaceSelect]);

  // Sincronizar valor programático com input
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  // Estados de erro e carregamento
  if (!isGoogleMapsConfigured()) {
    return (
      <div className={`p-4 border border-orange-200 rounded-lg bg-orange-50 ${className}`}>
        <div className="text-orange-800 font-medium mb-2">
          ⚠️ Google Maps não configurado
        </div>
        <div className="text-orange-600 text-sm">
          Configure a API Key no arquivo .env para usar o autocomplete
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 border border-red-200 rounded-lg bg-red-50 ${className}`}>
        <div className="text-red-800 font-medium mb-2">
          ❌ Erro no Google Maps
        </div>
        <div className="text-red-600 text-sm">{error}</div>
        <div className="text-red-500 text-xs mt-2">
          Verifique se sua API key está correta e se as APIs estão habilitadas
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`p-4 border border-blue-200 rounded-lg bg-blue-50 ${className}`}>
        <div className="text-blue-800 font-medium mb-2">
          🔄 Carregando Google Maps...
        </div>
        <div className="text-blue-600 text-sm">
          Inicializando autocomplete avançado
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          defaultValue={value}
          className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => {
            // Permitir digitação livre, autocomplete vai sugerir
            onChange(e.target.value);
          }}
          autoComplete="off"
                  />
        </div>
    </div>
  );
};

export default GoogleMapsPlacePicker; 