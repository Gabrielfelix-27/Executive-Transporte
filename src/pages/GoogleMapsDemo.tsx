// Página de demonstração Google Maps Place Picker
// Teste e comparação com o sistema atual

import { useState } from 'react';
import { GoogleMapsPlacePicker } from '@/components/GoogleMapsPlacePicker';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const GoogleMapsDemo = () => {
  const [googleMapsAddress, setGoogleMapsAddress] = useState('');
  const [currentSystemAddress, setCurrentSystemAddress] = useState('');
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
            Teste e compare o autocomplete nativo do Google Maps com o sistema atual
          </p>
        </div>

        {/* Comparação lado a lado */}
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
                Autocomplete nativo do Google Maps com Web Components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <GoogleMapsPlacePicker
                placeholder="Digite qualquer endereço no mundo..."
                value={googleMapsAddress}
                onChange={(value, place) => {
                  setGoogleMapsAddress(value);
                  if (place) handleGooglePlaceSelect(place);
                }}
                onPlaceSelect={handleGooglePlaceSelect}
                showMap={false}
                className="w-full"
              />
              
              {selectedPlace && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Lugar selecionado:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div><strong>Nome:</strong> {selectedPlace.displayName}</div>
                    <div><strong>Endereço:</strong> {selectedPlace.formattedAddress}</div>
                    <div><strong>Tipos:</strong> {selectedPlace.types?.join(', ')}</div>
                    {selectedPlace.location && (
                      <div><strong>Coordenadas:</strong> {selectedPlace.location.lat()?.toFixed(6)}, {selectedPlace.location.lng()?.toFixed(6)}</div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sistema Atual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Sistema Atual (APIs Gratuitas)
                <Badge variant="outline">Atual</Badge>
              </CardTitle>
              <CardDescription>
                Sistema híbrido com Photon + Nominatim + Base Local
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddressAutocomplete
                placeholder="Digite um endereço em São Paulo..."
                value={currentSystemAddress}
                onChange={setCurrentSystemAddress}
                icon="pickup"
              />
            </CardContent>
          </Card>
        </div>

        {/* Google Maps com Mapa Visual */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Google Maps com Mapa Visual
              <Badge className="bg-purple-100 text-purple-800">Interativo</Badge>
            </CardTitle>
            <CardDescription>
              Place Picker integrado com mapa visual e marcador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GoogleMapsPlacePicker
              placeholder="Busque um lugar e veja no mapa..."
              value=""
              onChange={(value, place) => {
                console.log('Endereço selecionado no mapa:', value, place);
              }}
              showMap={true}
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Comparação de recursos */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Comparação de Recursos</CardTitle>
            <CardDescription>
              Vantagens e desvantagens de cada sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">Recurso</th>
                    <th className="text-center py-2 font-medium text-green-700">Google Maps</th>
                    <th className="text-center py-2 font-medium text-blue-700">Sistema Atual</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2">Cobertura mundial</td>
                    <td className="text-center py-2">✅ 100%</td>
                    <td className="text-center py-2">⚠️ ~85%</td>
                  </tr>
                  <tr>
                    <td className="py-2">Endereços residenciais BR</td>
                    <td className="text-center py-2">✅ Todos</td>
                    <td className="text-center py-2">⚠️ Maioria</td>
                  </tr>
                  <tr>
                    <td className="py-2">Estabelecimentos comerciais</td>
                    <td className="text-center py-2">✅ Completo</td>
                    <td className="text-center py-2">⚠️ Básico</td>
                  </tr>
                  <tr>
                    <td className="py-2">Velocidade de busca</td>
                    <td className="text-center py-2">⚡ Muito rápida</td>
                    <td className="text-center py-2">⚡ Rápida</td>
                  </tr>
                  <tr>
                    <td className="py-2">Custo</td>
                    <td className="text-center py-2">💰 ~R$ 15/mês</td>
                    <td className="text-center py-2">🆓 Gratuito</td>
                  </tr>
                  <tr>
                    <td className="py-2">Mapa visual</td>
                    <td className="text-center py-2">✅ Integrado</td>
                    <td className="text-center py-2">❌ Não</td>
                  </tr>
                  <tr>
                    <td className="py-2">Detalhes do lugar</td>
                    <td className="text-center py-2">✅ Completos</td>
                    <td className="text-center py-2">⚠️ Básicos</td>
                  </tr>
                  <tr>
                    <td className="py-2">Atualização de dados</td>
                    <td className="text-center py-2">🔄 Tempo real</td>
                    <td className="text-center py-2">📅 Mensal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Instruções */}
        <Card>
          <CardHeader>
            <CardTitle>🛠️ Como implementar no projeto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Para usar Google Maps Place Picker:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Configure a API Key no arquivo .env (já feito)</li>
                <li>Ative JavaScript API + Places API no Google Cloud</li>
                <li>Configure método de pagamento (obrigatório)</li>
                <li>Substitua AddressAutocomplete por GoogleMapsPlacePicker</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Para continuar com sistema gratuito:</h4>
              <p className="text-sm text-gray-600">
                O sistema atual já funciona bem para a maioria dos casos. 
                Use Google Maps apenas se precisar de cobertura 100% ou recursos avançados.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link to="/">Voltar ao site</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoogleMapsDemo; 