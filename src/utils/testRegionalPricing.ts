// Teste do sistema de preços regionais
import { getRegionalPrice, areLocationNamesInSameRegion, findRegionalAreaByName } from '../data/regionalPricing';

export function testRegionalPricing() {
  console.log('🧪 Iniciando testes do sistema de preços regionais...\n');

  // Testes por nome de localização (sem CEP)
  const locationTests = [
    { from: 'Vila Olímpia', to: 'Lapa', expected: true, desc: 'Vila Olímpia → Lapa' },
    { from: 'Av. Paulista', to: 'Itaim Bibi', expected: true, desc: 'Av. Paulista → Itaim Bibi' },
    { from: 'Pinheiros', to: 'Butantã', expected: true, desc: 'Pinheiros → Butantã' },
    { from: 'Zona Sul', to: 'Zona Leste', expected: true, desc: 'Zona Sul → Zona Leste' },
    { from: 'Rio Grande da Serra', to: 'Butantã', expected: true, desc: 'Rio Grande da Serra → Butantã' },
    { from: 'São Bernardo do Campo', to: 'Congonhas', expected: true, desc: 'São Bernardo do Campo → Congonhas' },
    { from: 'Diadema', to: 'Av. Paulista', expected: true, desc: 'Diadema → Av. Paulista' },
    { from: 'Santo André', to: 'Vila Olímpia', expected: true, desc: 'Santo André → Vila Olímpia' },
    { from: 'Mauá', to: 'Pinheiros', expected: true, desc: 'Mauá → Pinheiros' },
    { from: 'São Caetano do Sul', to: 'Lapa', expected: true, desc: 'São Caetano do Sul → Lapa' }
  ];

  console.log('📍 Testando reconhecimento por nome de localização:');
  locationTests.forEach(test => {
    const result = areLocationNamesInSameRegion(test.from, test.to);
    const status = result === test.expected ? '✅' : '❌';
    console.log(`${status} ${test.desc}: ${result ? 'Mesma região' : 'Regiões diferentes'}`);
    
    if (result) {
      const price = getRegionalPrice('', '', test.from, test.to);
      if (price) {
        console.log(`   💰 Preços: Executivo Sedan R$ ${price.executivoSedan}, Executivo Comum R$ ${price.executivoComum}, Premium Blindado R$ ${price.executivoPremiumBlindado}`);
        console.log(`   💰 MiniVan Comum R$ ${price.minivanComum}, MiniVan Blindada R$ ${price.minivanBlindada}, Van 15 R$ ${price.van15Lugares}`);
      }
    }
  });

  // Testes por CEP
  console.log('\n🏷️ Testando reconhecimento por CEP:');
  const cepTests = [
    { from: '01310-100', to: '04532-060', desc: 'Av. Paulista (CEP) → Itaim Bibi (CEP)' },
    { from: '04551-000', to: '05075-010', desc: 'Vila Olímpia (CEP) → Lapa (CEP)' },
    { from: '05422-000', to: '05508-900', desc: 'Pinheiros (CEP) → Butantã (CEP)' },
    { from: '04626-500', to: '04551-000', desc: 'Congonhas (CEP) → Vila Olímpia (CEP)' },
    { from: '09900-500', to: '01310-100', desc: 'Diadema (CEP) → Av. Paulista (CEP)' },
    { from: '09600-500', to: '05422-000', desc: 'São Bernardo (CEP) → Pinheiros (CEP)' },
    { from: '09100-500', to: '04532-060', desc: 'Santo André (CEP) → Itaim Bibi (CEP)' }
  ];

  cepTests.forEach(test => {
    const price = getRegionalPrice(test.from, test.to);
    const status = price ? '✅' : '❌';
    console.log(`${status} ${test.desc}: ${price ? 'Preço regional aplicado' : 'Preço regional não aplicado'}`);
    
    if (price) {
      console.log(`   💰 Executivo Sedan: R$ ${price.executivoSedan.toFixed(2)}`);
    }
  });

  // Teste de reconhecimento individual de áreas
  console.log('\n🔍 Testando reconhecimento individual de áreas:');
  const areaTests = [
    'Vila Olímpia',
    'vila olimpia',
    'VILA OLIMPIA',
    'Av. Paulista',
    'Avenida Paulista',
    'paulista',
    'Itaim Bibi',
    'itaim',
    'Pinheiros',
    'pinheiros',
    'Lapa',
    'lapa',
    'Butantã',
    'butanta',
    'Congonhas',
    'congonhas',
    'Zona Sul',
    'zona sul',
    'Diadema',
    'diadema',
    'São Bernardo do Campo',
    'sao bernardo',
    'Santo André',
    'santo andre',
    'Mauá',
    'maua',
    'São Caetano do Sul',
    'sao caetano'
  ];

  areaTests.forEach(area => {
    const found = findRegionalAreaByName(area);
    const status = found ? '✅' : '❌';
    console.log(`${status} "${area}" → ${found ? found.name : 'Não encontrado'}`);
  });

  console.log('\n🎯 Teste concluído!');
}

// Executar teste se chamado diretamente
if (typeof window === 'undefined') {
  testRegionalPricing();
}