// Arquivo de teste para o sistema de precificação por CEPs

import { 
  findPriceByCep, 
  identifyRegionByCep, 
  normalizeCep,
  getRegionInfoByCep,
  getAllAvailableRoutes,
  CEP_REGIONS 
} from '@/data/cepPricing';

// Função para testar o sistema de precificação por CEPs
export const testCepPricingSystem = () => {
  console.log('🧪 === TESTE DO SISTEMA DE PRECIFICAÇÃO POR CEPs ===');
  
  // Teste 1: Normalização de CEPs
  console.log('\n📋 Teste 1: Normalização de CEPs');
  const testCeps = ['01310-100', '04532060', '04551.000', '05422 000'];
  testCeps.forEach(cep => {
    console.log(`CEP "${cep}" → normalizado: "${normalizeCep(cep)}"`);
  });
  
  // Teste 2: Identificação de regiões por CEP
  console.log('\n🏷️ Teste 2: Identificação de regiões por CEP');
  const testRegionCeps = [
    '01310-100', // Paulista
    '04532-060', // Itaim
    '04626-911', // Congonhas
    '07190-100', // Guarulhos
    '06454-000', // Alphaville
    '08500-000', // Grande São Paulo
    '12345-678'  // CEP inexistente
  ];
  
  testRegionCeps.forEach(cep => {
    const region = identifyRegionByCep(cep);
    const regionInfo = getRegionInfoByCep(cep);
    console.log(`CEP ${cep} → região: ${region || 'não identificada'} (${regionInfo?.name || 'N/A'})`);
  });
  
  // Teste 3: Cálculo de preços específicos conforme tabela solicitada
  console.log('\n💰 Teste 3: Cálculo de preços - Executivo Sedan');
  
  const testRoutes = [
    // Congonhas → Regiões centrais (R$ 240,00)
    { from: '04626-911', to: '01310-100', expected: 240.00, desc: 'Congonhas → Av. Paulista' },
    { from: '04626-911', to: '04532-060', expected: 240.00, desc: 'Congonhas → Itaim Bibi' },
    { from: '04626-911', to: '04551-000', expected: 240.00, desc: 'Congonhas → Vila Olímpia' },
    { from: '04626-911', to: '05422-000', expected: 240.00, desc: 'Congonhas → Pinheiros' },
    { from: '04626-911', to: '05075-010', expected: 240.00, desc: 'Congonhas → Lapa' },
    { from: '04626-911', to: '05508-900', expected: 240.00, desc: 'Congonhas → Butantã' },
    
    // Guarulhos → Regiões centrais (R$ 310,00)
    { from: '07190-100', to: '01310-100', expected: 310.00, desc: 'Guarulhos → Av. Paulista' },
    { from: '07190-100', to: '04532-060', expected: 310.00, desc: 'Guarulhos → Itaim Bibi' },
    { from: '07190-100', to: '04551-000', expected: 310.00, desc: 'Guarulhos → Vila Olímpia' },
    { from: '07190-100', to: '05422-000', expected: 310.00, desc: 'Guarulhos → Pinheiros' },
    { from: '07190-100', to: '05075-010', expected: 310.00, desc: 'Guarulhos → Lapa' },
    { from: '07190-100', to: '05508-900', expected: 310.00, desc: 'Guarulhos → Butantã' },
    
    // Viracopos → Grande São Paulo (R$ 690,00)
    { from: '13052-900', to: '08500-000', expected: 690.00, desc: 'Viracopos → Grande São Paulo' },
    
    // Outras rotas
    { from: '04626-911', to: '06454-000', expected: 390.00, desc: 'Congonhas → Alphaville' },
    { from: '07190-100', to: '06454-000', expected: 440.00, desc: 'Guarulhos → Alphaville' },
    { from: '04626-911', to: '11015-900', expected: 690.00, desc: 'Congonhas → Porto de Santos' },
    { from: '07190-100', to: '11015-900', expected: 690.00, desc: 'Guarulhos → Porto de Santos' }
  ];
  
  testRoutes.forEach(route => {
    const price = findPriceByCep(route.from, route.to, 'executivoSedan');
    const status = price === route.expected ? '✅' : '❌';
    console.log(`${status} ${route.desc}: R$ ${price?.toFixed(2) || 'N/A'} (esperado: R$ ${route.expected.toFixed(2)})`);
  });
  
  // Teste 4: Preços bidirecionais
  console.log('\n🔄 Teste 4: Verificação de preços bidirecionais');
  const bidirectionalTests = [
    { cep1: '04626-911', cep2: '01310-100', desc: 'Congonhas ↔ Paulista' },
    { cep1: '07190-100', cep2: '06454-000', desc: 'Guarulhos ↔ Alphaville' }
  ];
  
  bidirectionalTests.forEach(test => {
    const price1to2 = findPriceByCep(test.cep1, test.cep2, 'executivoSedan');
    const price2to1 = findPriceByCep(test.cep2, test.cep1, 'executivoSedan');
    const isBidirectional = price1to2 === price2to1;
    const status = isBidirectional ? '✅' : '❌';
    console.log(`${status} ${test.desc}: ${price1to2?.toFixed(2)} = ${price2to1?.toFixed(2)} (bidirecional: ${isBidirectional})`);
  });
  
  // Teste 5: Todas as categorias de veículos
  console.log('\n🚗 Teste 5: Preços por categoria de veículo (Congonhas → Paulista)');
  const vehicleTypes = [
    'executivoSedan',
    'executivoComum', 
    'executivoPremiumBlindado',
    'minivanComum',
    'minivanBlindada',
    'van15Lugares'
  ] as const;
  
  vehicleTypes.forEach(vehicleType => {
    const price = findPriceByCep('04626-911', '01310-100', vehicleType);
    console.log(`${vehicleType}: R$ ${price?.toFixed(2) || 'N/A'}`);
  });
  
  // Teste 6: Listar todas as rotas disponíveis
  console.log('\n📋 Teste 6: Rotas disponíveis no sistema');
  const allRoutes = getAllAvailableRoutes();
  console.log(`Total de rotas (incluindo bidirecionais): ${allRoutes.length}`);
  
  // Mostrar algumas rotas como exemplo
  console.log('\nExemplos de rotas:');
  allRoutes.slice(0, 10).forEach(route => {
    console.log(`${route.fromName} → ${route.toName}`);
  });
  
  console.log('\n🎉 === FIM DOS TESTES ===');
};

// Função para testar com endereços completos (simulando uso real)
export const testWithFullAddresses = () => {
  console.log('\n🏠 === TESTE COM ENDEREÇOS COMPLETOS ===');
  
  const testAddresses = [
    {
      origin: 'Av. Washington Luís, s/n - Campo Belo, São Paulo - SP, 04626-911',
      destination: 'Avenida Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100',
      desc: 'Congonhas → Paulista (endereços completos)'
    },
    {
      origin: 'Rod. Hélio Smidt, s/n - Cumbica, Guarulhos - SP, 07190-100', 
      destination: 'Rua Funchal, 500 - Vila Olímpia, São Paulo - SP, 04551-000',
      desc: 'Guarulhos → Vila Olímpia (endereços completos)'
    }
  ];
  
  testAddresses.forEach(test => {
    // Extrair CEPs dos endereços
    const originCepMatch = test.origin.match(/\d{5}-?\d{3}/);
    const destCepMatch = test.destination.match(/\d{5}-?\d{3}/);
    
    if (originCepMatch && destCepMatch) {
      const price = findPriceByCep(originCepMatch[0], destCepMatch[0], 'executivoSedan');
      console.log(`✅ ${test.desc}: R$ ${price?.toFixed(2) || 'N/A'}`);
    } else {
      console.log(`❌ ${test.desc}: CEPs não encontrados`);
    }
  });
};

// Executar testes se este arquivo for executado diretamente
if (typeof window === 'undefined') {
  testCepPricingSystem();
  testWithFullAddresses();
}