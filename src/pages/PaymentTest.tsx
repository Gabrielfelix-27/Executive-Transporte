import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentTest() {
  const navigate = useNavigate();

  useEffect(() => {
    // Dados de teste pré-definidos
    const testData = {
      vehicleName: 'Teste - Executivo Premium',
      price: 1.00, // Valor fixo de R$ 1,00 para teste (valor mínimo da InfinitePay)
      pickup: 'Aeroporto de Guarulhos (GRU)',
      destination: 'Hotel Copacabana Palace',
      date: new Date().toLocaleDateString('pt-BR'),
      time: '14:30',
      passengers: 2,
      customerData: {
        name: 'João Silva Teste',
        phone: '11999887766',
        email: 'teste@executivepremium.com'
      }
    };

    // Redirecionar para a página de pagamento com dados de teste
    navigate('/payment', { 
      state: testData,
      replace: true 
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Preparando teste de pagamento...</p>
        <p className="text-sm text-gray-500 mt-2">Valor: R$ 1,00</p>
      </div>
    </div>
  );
}