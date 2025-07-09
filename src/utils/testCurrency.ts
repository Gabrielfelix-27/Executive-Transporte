// Teste da conversão de moeda
// Execute no console do navegador para verificar a lógica

export const testCurrencyConversion = () => {
  console.log('🧪 Testando conversão de moeda...');
  
  // Exemplo: R$ 259,51 deve ser aproximadamente $46,51 (cotação ~5.58)
  const testAmount = 259.51;
  const expectedUSD = 46.51;
  const expectedRate = testAmount / expectedUSD;
  
  console.log(`📊 Teste de conversão:`);
  console.log(`   Valor BRL: R$ ${testAmount.toFixed(2)}`);
  console.log(`   Valor USD esperado: $ ${expectedUSD.toFixed(2)}`);
  console.log(`   Taxa esperada: 1 USD = R$ ${expectedRate.toFixed(2)}`);
  
  // Simulando diferentes taxas
  const testRates = [5.50, 5.58, 6.00];
  
  testRates.forEach(rate => {
    const convertedUSD = testAmount / rate;
    console.log(`   Taxa ${rate}: R$ ${testAmount.toFixed(2)} → $ ${convertedUSD.toFixed(2)}`);
  });
  
  console.log('✅ Teste concluído. Verifique se os valores estão corretos.');
};

// Para testar no console:
// import { testCurrencyConversion } from '@/utils/testCurrency';
// testCurrencyConversion(); 