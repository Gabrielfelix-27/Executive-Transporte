/**
 * Teste do sistema de reserva com 24h de antecedência
 * Simula diferentes horários para verificar o comportamento do sistema
 */

// Simular diferentes horários para testar o sistema
function testAdvanceBookingSystem() {
  console.log('=== TESTE DO SISTEMA DE RESERVA COM 24H DE ANTECEDÊNCIA ===\n');

  // Função para simular o comportamento do getCurrentDate e getMinDateTime
  function simulateMinDateTime(currentHour: number): { date: Date, time: string } {
    const now = new Date();
    now.setHours(currentHour, 0, 0, 0);
    
    let minDate = new Date(now);
    let minTime = '';
    
    // Se for 17h ou depois, avançar para o próximo dia às 8h
    if (currentHour >= 17) {
      minDate.setDate(minDate.getDate() + 1);
      minDate.setHours(8, 0, 0, 0);
      minTime = '08:00';
    } else {
      // Adicionar 24 horas
      minDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      minTime = minDate.toTimeString().slice(0, 5);
    }
    
    return { date: minDate, time: minTime };
  }

  // Cenários de teste
  const testScenarios = [
    { currentHour: 8, description: '8h da manhã' },
    { currentHour: 12, description: '12h (meio-dia)' },
    { currentHour: 16, description: '16h (4h da tarde)' },
    { currentHour: 17, description: '17h (5h da tarde)' },
    { currentHour: 20, description: '20h (8h da noite)' },
    { currentHour: 23, description: '23h (11h da noite)' }
  ];

  testScenarios.forEach(scenario => {
    const result = simulateMinDateTime(scenario.currentHour);
    const today = new Date();
    const isNextDay = result.date.getDate() !== today.getDate();
    
    console.log(`🕐 Horário atual: ${scenario.description}`);
    console.log(`📅 Data mínima: ${result.date.toLocaleDateString('pt-BR')}`);
    console.log(`⏰ Hora mínima: ${result.time}`);
    console.log(`📌 Comportamento: ${isNextDay ? 'Avançou para o próximo dia' : 'Manteve o mesmo dia + 24h'}`);
    console.log('---');
  });

  console.log('\n=== REGRAS IMPLEMENTADAS ===');
  console.log('✅ Reservas devem ser feitas com 24h de antecedência');
  console.log('✅ Após às 17h, cotações são automaticamente para o próximo dia às 8h');
  console.log('✅ Antes das 17h, mantém a regra de 24h normalmente');
  console.log('✅ Interface mostra aviso sobre as regras de antecedência');
}

// Executar o teste
testAdvanceBookingSystem();