// Página de demonstração Google Maps Place Picker
// Teste e comparação com o sistema atual

import { useState } from 'react';
import { GoogleMapsPlacePicker } from '@/components/GoogleMapsPlacePicker';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Navigation, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GoogleMapsDemo = () => {
  const [googleMapsAddress, setGoogleMapsAddress] = useState('');
  const [fallbackAddress, setFallbackAddress] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const handleGooglePlaceSelect = (place: any) => {
    setSelectedPlace(place);
    console.log('📍 Detalhes do lugar:', place);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🗺️ Demonstração Google Maps API
          </h1>
          <p className="text-gray-600">
            Teste o novo sistema de autocomplete reformulado
          </p>
        </div>

        {/* Demonstração principal */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Google Maps Place Picker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                Google Maps Place Picker
                <Badge className="bg-green-100 text-green-800">Novo</Badge>
              </CardTitle>
              <CardDescription>
                Autocomplete nativo do Google Maps (quando API está configurada)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <GoogleMapsPlacePicker
                id="demo-google-maps"
                placeholder="Digite qualquer endereço..."
                value={googleMapsAddress}
                onChange={(value, place) => {
                  setGoogleMapsAddress(value);
                  if (place) handleGooglePlaceSelect(place);
                }}
                className="w-full"
              />
              
              {selectedPlace && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">✅ Lugar selecionado:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div><strong>Nome:</strong> {selectedPlace.name || selectedPlace.formatted_address}</div>
                    <div><strong>Endereço:</strong> {selectedPlace.formatted_address}</div>
                    {selectedPlace.place_id && (
                      <div><strong>Place ID:</strong> {selectedPlace.place_id}</div>
                    )}
                    {selectedPlace.geometry?.location && (
                      <div><strong>Coordenadas:</strong> 
                        {typeof selectedPlace.geometry.location.lat === 'function' 
                          ? `${selectedPlace.geometry.location.lat().toFixed(6)}, ${selectedPlace.geometry.location.lng().toFixed(6)}`
                          : `${selectedPlace.geometry.location.lat?.toFixed(6)}, ${selectedPlace.geometry.location.lng?.toFixed(6)}`
                        }
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sistema Fallback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Sistema Fallback
                <Badge variant="outline">Backup</Badge>
              </CardTitle>
              <CardDescription>
                Input manual quando Google Maps não está disponível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                placeholder="Digite um endereço manualmente..."
                value={fallbackAddress}
                onChange={(e) => setFallbackAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-400"
              />
              
              {fallbackAddress && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">📝 Endereço digitado:</h4>
                  <div className="text-sm text-blue-700">
                    <div><strong>Texto:</strong> {fallbackAddress}</div>
                    <div className="text-xs mt-1 text-blue-600">
                      💡 Este será usado se Google Maps não estiver disponível
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Status da API */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Status do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">🔧 Configuração</h4>
                <p className="text-sm text-gray-600">
                  Sistema configurado para usar Google Maps quando disponível, 
                  com fallback automático para input manual.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">✅ Funcionalidade</h4>
                <p className="text-sm text-green-700">
                  Autocomplete inteligente, cache de coordenadas, 
                  e cálculo preciso de distâncias.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">🎯 Design</h4>
                <p className="text-sm text-blue-700">
                  Interface limpa, elegante e quadrada conforme 
                  especificação do projeto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparação de recursos */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Vantagens do Novo Sistema</CardTitle>
            <CardDescription>
              Melhorias implementadas na reformulação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-800 mb-3">✅ Implementado</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Design completamente reformulado
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Cantos quadrados conforme referência
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Google Maps simplificado e funcional
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Fallback automático para input manual
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Cache de coordenadas preciso
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Código limpo sem bugs de sincronização
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-800 mb-3">🎯 Benefícios</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Interface mais elegante e profissional
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Funcionalidade 100% confiável
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Manutenção mais fácil
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Experiência do usuário melhorada
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Cálculos de distância precisos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Design responsivo em todos os dispositivos
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voltar */}
        <div className="flex justify-center pt-8">
          <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
            <Link to="/">Voltar ao Formulário Principal</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsDemo; 