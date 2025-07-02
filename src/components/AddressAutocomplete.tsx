import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Loader2, Globe, Map, Database } from 'lucide-react';
import { searchAddresses, type AddressSuggestion } from '@/services/geocodingService';
import { isGoogleMapsConfigured } from '@/config/maps';
import { GoogleMapsPlacePicker } from './GoogleMapsPlacePicker';

interface AddressAutocompleteProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: 'pickup' | 'destination';
  onLocationSelect?: () => void;
}

export const AddressAutocomplete = ({ 
  placeholder, 
  value, 
  onChange, 
  icon = 'pickup',
  onLocationSelect 
}: AddressAutocompleteProps) => {
  console.log('🚀 AddressAutocomplete renderizado - props:', { placeholder, value, icon });

  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [searchStatus, setSearchStatus] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionTimeoutRef = useRef<NodeJS.Timeout>();
  
  // ID único para esta instância do componente
  const componentId = `address-autocomplete-${icon}`;
  console.log('🆔 Componente ID:', componentId);

  // Verificar se deve usar Google Maps ou fallback
  const useGoogleMaps = isGoogleMapsConfigured();
  console.log('🗺️ Usar Google Maps:', useGoogleMaps);

  // Se Google Maps configurado, usar GoogleMapsPlacePicker
  if (useGoogleMaps) {
    return (
      <div className="form-field">
        <div className="flex items-center">
          {icon === 'pickup' ? (
            <MapPin className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
          ) : (
            <Navigation className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
          )}
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">
              {icon === 'pickup' ? 'Origem' : 'Destino'}
            </label>
            <div className="relative">
              <GoogleMapsPlacePicker
                placeholder={placeholder}
                value={value}
                onChange={(newValue, place) => {
                  console.log('🎯 Google Maps selecionado:', newValue, place);
                  onChange(newValue);
                  if (onLocationSelect) {
                    onLocationSelect();
                  }
                }}
                onPlaceSelect={(place) => {
                  console.log('📍 Lugar selecionado:', place);
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback para APIs gratuitas (sistema atual)
  const fetchSuggestions = async (input: string) => {
    console.log(`🔍 ${componentId} fetchSuggestions chamada com:`, input);
    
    if (input.length < 2) {
      console.log(`❌ ${componentId} Input muito curto:`, input.length);
      setSuggestions([]);
      setShowSuggestions(false);
      setSearchStatus('');
      return;
    }

    setIsLoading(true);
    setSearchStatus('Buscando endereços...');
    console.log('⏳ Iniciando busca com APIs gratuitas...');
    
    try {
      // Usar APIs gratuitas como fallback
      const results = await searchAddressesFallback(input);
      console.log('📊 Resultados da busca gratuita:', results);
      
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      
      if (results.length > 0) {
        const photonResults = results.filter(r => r.source === 'photon').length;
        const nominatimResults = results.filter(r => r.source === 'nominatim').length;
        const localResults = results.filter(r => r.source === 'local').length;
        
        if (photonResults > 0) {
          setSearchStatus(`${results.length} endereços encontrados (Photon API - Gratuita)`);
        } else if (nominatimResults > 0) {
          setSearchStatus(`${results.length} endereços encontrados (OpenStreetMap)`);
        } else if (localResults > 0) {
          setSearchStatus(`${results.length} endereços encontrados (Base local)`);
        }
      } else {
        setSearchStatus('Nenhum endereço encontrado');
      }
      
      console.log('✅ Sugestões processadas:', results.length);
    } catch (error) {
      console.error('❌ Erro ao buscar endereços:', error);
      setSuggestions([]);
      setShowSuggestions(false);
      setSearchStatus('Erro na busca de endereços');
    } finally {
      setIsLoading(false);
      console.log('🏁 Busca finalizada');
    }
  };

  // Busca com APIs gratuitas apenas (sem Google)
  const searchAddressesFallback = async (query: string): Promise<AddressSuggestion[]> => {
    // Implementação simplificada usando apenas APIs gratuitas
    // Este é um placeholder - você pode implementar Photon/Nominatim aqui
    console.log('🔍 Busca fallback para:', query);
    
    // Por enquanto, retornar lista vazia para APIs gratuitas
    // Você pode implementar Photon/Nominatim aqui se desejar
    return [];
  };

  // Função para obter localização atual
  const getCurrentLocation = () => {
    console.log('📍 getCurrentLocation chamada');
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada por este navegador.');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          onChange(`Minha localização: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          setShowSuggestions(false);
          setSuggestions([]);
          
          if (onLocationSelect) {
            onLocationSelect();
          }
        } catch (error) {
          console.error('Erro ao obter endereço:', error);
          alert('Erro ao obter endereço da localização atual.');
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Erro de geolocalização:', error);
        alert('Erro ao obter localização.');
        setIsGettingLocation(false);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 8000, 
        maximumAge: 30000
      }
    );
  };

  // Buscar sugestões com delay
  useEffect(() => {
    console.log(`🔄 ${componentId} useEffect disparado - value:`, value);
    
    // Limpar timeout anterior
    if (suggestionTimeoutRef.current) {
      clearTimeout(suggestionTimeoutRef.current);
    }

    // Definir novo timeout
    suggestionTimeoutRef.current = setTimeout(() => {
      if (value && value.length >= 2) {
        console.log(`🎯 ${componentId} Disparando busca para:`, value);
        fetchSuggestions(value);
      } else {
        console.log(`🧹 ${componentId} Limpando sugestões (input muito curto)`);
        setSuggestions([]);
        setShowSuggestions(false);
        setSearchStatus('');
      }
    }, 300); // Delay um pouco maior para APIs gratuitas

    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
    };
  }, [value]);

  // Fechar sugestões quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const autocompleteContainer = document.getElementById(componentId)?.closest('.relative');
      
      if (autocompleteContainer && !autocompleteContainer.contains(target)) {
        console.log(`👆 Clique fora detectado no ${componentId}, fechando sugestões`);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [componentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log(`✏️ ${componentId} Input mudou de:`, value, 'para:', newValue);
    onChange(newValue);
    
    // Mostrar sugestões imediatamente se já temos algumas
    if (newValue.length >= 2 && suggestions.length > 0) {
      console.log(`📝 ${componentId} Mostrando sugestões existentes`);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    console.log(`👆 ${componentId} CLIQUE DETECTADO:`, suggestion.description);
    onChange(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);
    
    if (onLocationSelect) {
      onLocationSelect();
    }
  };

  const handleInputFocus = () => {
    console.log(`🎯 ${componentId} Input focado`);
    if (value.length >= 2 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'google': return <Globe className="h-3 w-3" />;
      case 'photon': return <Map className="h-3 w-3" />;
      case 'nominatim': return <Map className="h-3 w-3" />;
      case 'local': return <Database className="h-3 w-3" />;
      default: return <MapPin className="h-3 w-3" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'google': return 'bg-green-100 text-green-800';
      case 'photon': return 'bg-blue-100 text-blue-800';
      case 'nominatim': return 'bg-purple-100 text-purple-800';
      case 'local': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="form-field">
      <div className="flex items-center">
        {icon === 'pickup' ? (
          <MapPin className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
        ) : (
          <Navigation className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
        )}
        <div className="flex-1">
          <label className="text-xs text-gray-500 block mb-1">
            {icon === 'pickup' ? 'Origem' : 'Destino'}
          </label>
          <div className="relative" id={componentId}>
            <Input
              ref={inputRef}
              type="text"
              className="form-input w-full pr-20"
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            
            {/* Botão de localização atual */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="h-8 w-8 p-0 hover:bg-gray-100"
                title="Usar localização atual"
              >
                {isGettingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                ) : (
                  <Navigation className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>

            {/* Badge indicando sistema gratuito */}
            <div className="absolute top-2 right-12">
              <Badge className="bg-orange-100 text-orange-800 text-xs px-2 py-1">
                <Database className="h-3 w-3 mr-1" />
                Sistema Gratuito
              </Badge>
            </div>
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              </div>
            )}

            {/* Dropdown de sugestões */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {/* Status da busca */}
                {searchStatus && (
                  <div className="px-3 py-2 text-xs text-gray-600 bg-gray-50 border-b">
                    {searchStatus}
                  </div>
                )}
                
                {/* Lista de sugestões */}
                {suggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.place_id}-${index}`}
                    className="px-3 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {suggestion.structured_formatting.main_text}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {suggestion.structured_formatting.secondary_text}
                        </div>
                      </div>
                      <Badge className={`ml-2 flex-shrink-0 ${getSourceColor(suggestion.source)} text-xs px-2 py-1`}>
                        {getSourceIcon(suggestion.source)}
                        <span className="ml-1">{suggestion.source}</span>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 