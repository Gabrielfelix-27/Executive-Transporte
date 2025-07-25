import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, MapPin } from 'lucide-react';
import { isGoogleMapsConfigured, GOOGLE_MAPS_API_KEY } from '@/config/maps';
import { GoogleMapsPlacePicker } from '@/components/GoogleMapsPlacePicker';

export const GoogleMapsTest = () => {
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error' | 'not-configured'>('loading');
  const [apiKey, setApiKey] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [testAddress, setTestAddress] = useState<string>('');

  const runDiagnostic = async () => {
    console.log('🔍 Iniciando diagnóstico completo...');
    
    const results = [];
    
    // Teste 1: Verificar variável de ambiente
    const envKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    results.push({
      test: 'Variável de Ambiente',
      status: envKey && envKey !== 'SUA_CHAVE_AQUI' ? 'success' : 'error',
      details: envKey ? `Configurada: ${envKey.substring(0, 10)}...` : 'Não configurada',
      value: envKey
    });
    
    // Teste 2: Verificar configuração
    const isConfigured = isGoogleMapsConfigured();
    results.push({
      test: 'Configuração Maps',
      status: isConfigured ? 'success' : 'error',
      details: isConfigured ? 'Google Maps configurado' : 'Google Maps não configurado',
      value: isConfigured
    });
    
    // Teste 3: Verificar API Key formato
    const isValidFormat = envKey && envKey.startsWith('AIza') && envKey.length > 30;
    results.push({
      test: 'Formato API Key',
      status: isValidFormat ? 'success' : 'error',
      details: isValidFormat ? 'Formato válido' : 'Formato inválido ou placeholder',
      value: isValidFormat
    });
    
    // Teste 4: Testar API (se configurada)
    if (isConfigured && isValidFormat) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/js?key=${envKey}&libraries=places`);
        results.push({
          test: 'Teste API Real',
          status: response.ok ? 'success' : 'error',
          details: response.ok ? 'API respondendo' : `Erro HTTP: ${response.status}`,
          value: response.status
        });
      } catch (error) {
        results.push({
          test: 'Teste API Real',
          status: 'error',
          details: `Erro de rede: ${error}`,
          value: null
        });
      }
    }
    
    setTestResults(results);
    setApiKey(envKey || 'NÃO CONFIGURADA');
    
    // Definir status geral
    const hasErrors = results.some(r => r.status === 'error');
    setApiStatus(hasErrors ? 'error' : 'success');
  };

  useEffect(() => {
    runDiagnostic();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default: return <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-green-100 text-green-800">✅ OK</Badge>;
      case 'error': return <Badge className="bg-red-100 text-red-800">❌ ERRO</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">⚠️ AVISO</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">🔄 TESTANDO</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            🗺️ Diagnóstico Google Maps API
          </h1>
          <p className="text-gray-600">
            Verificação completa da configuração da API do Google Maps
          </p>
        </div>

        {/* Status Geral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Status Geral</span>
              <Button onClick={runDiagnostic} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Testar Novamente
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              {getStatusIcon(apiStatus)}
              <div>
                <p className="font-medium">
                  {apiStatus === 'success' ? '✅ Google Maps Configurado' : '❌ Google Maps NÃO Configurado'}
                </p>
                <p className="text-sm text-gray-600">
                  API Key: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{apiKey}</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados dos Testes */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados Detalhados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <p className="font-medium">{result.test}</p>
                      <p className="text-sm text-gray-600">{result.details}</p>
                    </div>
                  </div>
                  {getStatusBadge(result.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instruções */}
        <Card>
          <CardHeader>
            <CardTitle>📝 Como Corrigir</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">1. Obter API Key</h4>
              <p className="text-blue-800 text-sm">
                Acesse: <a href="https://console.cloud.google.com/" target="_blank" className="underline">Google Cloud Console</a>
                <br />Vá em: APIs & Services → Credentials → Create Credentials → API Key
              </p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">2. Configurar .env</h4>
              <p className="text-yellow-800 text-sm">
                Edite o arquivo .env na raiz do projeto:
                <br /><code className="bg-white px-2 py-1 rounded mt-1 block">VITE_GOOGLE_MAPS_API_KEY=SUA_CHAVE_REAL_AQUI</code>
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">3. Reiniciar Servidor</h4>
              <p className="text-green-800 text-sm">
                Execute: <code className="bg-white px-2 py-1 rounded">npm run dev</code>
                <br />Depois teste novamente esta página
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Teste Prático */}
        <Card>
          <CardHeader>
            <CardTitle>🧪 Teste Prático - Autocomplete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 text-sm mb-3">
                <strong>Teste o autocomplete abaixo:</strong> Digite um endereço e veja se as sugestões aparecem
              </p>
              
              {apiStatus === 'success' ? (
                <div className="space-y-3">
                  <GoogleMapsPlacePicker
                    placeholder="Digite um endereço para testar (ex: Aeroporto Guarulhos)"
                    value={testAddress}
                    onChange={(value, place) => {
                      setTestAddress(value);
                      if (place) {
                        console.log('🎯 Teste: Lugar selecionado:', place);
                      }
                    }}
                    onPlaceSelect={(place) => {
                      console.log('📍 Teste: Detalhes do lugar:', place);
                    }}
                  />
                  
                  {testAddress && (
                    <div className="bg-green-50 p-3 rounded border">
                      <div className="flex items-center text-green-800">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          <strong>Endereço selecionado:</strong> {testAddress}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <p className="text-red-800 text-sm">
                    ❌ Configure a API do Google Maps primeiro para testar o autocomplete
                  </p>
                </div>
              )}
            </div>
            
            <div className="text-xs text-gray-600">
              <p><strong>Como testar:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Digite "Aeroporto Guarulhos" - deve mostrar sugestões</li>
                <li>Digite "Shopping Iguatemi" - deve mostrar opções</li>
                <li>Digite "Avenida Paulista" - deve mostrar a avenida</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card>
          <CardHeader>
            <CardTitle>🔍 Debug Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-xs overflow-auto">
                {JSON.stringify({
                  'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
                  'GOOGLE_MAPS_API_KEY': GOOGLE_MAPS_API_KEY,
                  'isGoogleMapsConfigured()': isGoogleMapsConfigured(),
                  'timestamp': new Date().toISOString(),
                  'testResults': testResults
                }, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}; 