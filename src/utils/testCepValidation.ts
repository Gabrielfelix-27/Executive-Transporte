// Arquivo de teste para validação das regras de CEP de Viracopos
// Este arquivo pode ser usado para testar as funções de validação

import {
  isValidViracoposOriginCep,
  isValidGrandeSaoPauloDestinationCep,
  extractCepFromAddress,
  isValidViracoposRoute,
  getViracoposPriceByVehicleType
} from './cepValidation';

// Função para executar todos os testes
export const runCepValidationTests = () => {
  console.log('🧪 Iniciando testes de validação de CEP para Viracopos');
  
  // Teste 1: Validação de CEPs de origem Viracopos
  console.log('\n📍 Teste 1: CEPs de origem Viracopos');
  const viracoposCeps = ['13052-900', '13052900', '13052-970', '13052970', '13052-999', '12345-678'];
  viracoposCeps.forEach(cep => {
    const isValid = isValidViracoposOriginCep(cep);
    console.log(`CEP ${cep}: ${isValid ? '✅ Válido' : '❌ Inválido'}`);
  });
  
  // Teste 2: Validação de CEPs de destino Grande São Paulo
  console.log('\n🏙️ Teste 2: CEPs de destino Grande São Paulo');
  const saoPauloCeps = ['06000-000', '06000000', '09999-999', '09999999', '08500-000', '05999-999', '10000-000'];
  saoPauloCeps.forEach(cep => {
    const isValid = isValidGrandeSaoPauloDestinationCep(cep);
    console.log(`CEP ${cep}: ${isValid ? '✅ Válido' : '❌ Inválido'}`);
  });
  
  // Teste 3: Extração de CEP de endereços
  console.log('\n🔍 Teste 3: Extração de CEP de endereços');
  const addresses = [
    'Rod. Santos Dumont, km 66, 13052-900 - Campinas - SP',
    'Rua das Flores, 123, São Paulo - SP, 08500-000',
    'Avenida Paulista, 1000 - São Paulo',
    'Endereço sem CEP'
  ];
  addresses.forEach(address => {
    const cep = extractCepFromAddress(address);
    console.log(`"${address}" → CEP: ${cep || 'Não encontrado'}`);
  });
  
  // Teste 4: Validação de rotas completas
  console.log('\n🛣️ Teste 4: Validação de rotas Viracopos → Grande São Paulo');
  const routes = [
    {
      origin: 'Rod. Santos Dumont, km 66, 13052-900 - Campinas - SP',
      destination: 'Rua Augusta, 123, 08500-000 - São Paulo - SP'
    },
    {
      origin: 'Aeroporto de Viracopos, Campinas',
      destination: 'Avenida Paulista, São Paulo'
    },
    {
      origin: 'Rod. Santos Dumont, km 66, 13052-970 - Campinas - SP',
      destination: 'Vila Madalena, 06000-000 - São Paulo - SP'
    },
    {
      origin: 'Aeroporto de Congonhas, São Paulo',
      destination: 'Avenida Paulista, São Paulo'
    }
  ];
  
  routes.forEach((route, index) => {
    const isValid = isValidViracoposRoute(route.origin, route.destination);
    console.log(`Rota ${index + 1}: ${isValid ? '✅ Válida' : '❌ Inválida'}`);
    console.log(`  Origem: ${route.origin}`);
    console.log(`  Destino: ${route.destination}`);
  });
  
  // Teste 5: Preços por categoria de veículo
  console.log('\n💰 Teste 5: Preços por categoria de veículo');
  const vehicleTypes = ['economico', 'executivo', 'luxo', 'suv', 'minivanBlindada', 'van15Lugares', 'invalidType'];
  vehicleTypes.forEach(vehicleType => {
    const price = getViracoposPriceByVehicleType(vehicleType);
    console.log(`${vehicleType}: ${price ? `R$ ${price.toFixed(2)}` : 'Preço não encontrado'}`);
  });
  
  console.log('\n🎉 Testes de validação de CEP concluídos!');
};

// Executar testes automaticamente quando o arquivo for importado em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  // runCepValidationTests();
}