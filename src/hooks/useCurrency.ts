import { useState, useEffect, useCallback } from 'react';
import { currencyService } from '@/services/currencyService';
import { useLanguage } from '@/contexts/LanguageContext';

interface CurrencyData {
  exchangeRate: number;
  loading: boolean;
  error: string | null;
}

export const useCurrency = () => {
  const { currency, setCurrency, formatCurrency } = useLanguage();
  const [currencyData, setCurrencyData] = useState<CurrencyData>({
    exchangeRate: 1,
    loading: false,
    error: null
  });

  // Buscar cotação quando moeda mudar
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === 'BRL') {
        setCurrencyData({
          exchangeRate: 1,
          loading: false,
          error: null
        });
        return;
      }

      setCurrencyData(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const rate = await currencyService.getUsdToBrlRate();
        console.log(`💱 Cotação obtida: 1 USD = R$ ${rate.toFixed(2)}`);
        setCurrencyData({
          exchangeRate: rate,
          loading: false,
          error: null
        });
      } catch (error) {
        setCurrencyData({
          exchangeRate: 5.50, // Fallback rate: 1 USD = 5.50 BRL
          loading: false,
          error: 'Erro ao buscar cotação'
        });
      }
    };

    fetchExchangeRate();
  }, [currency]);

  // Converter preço baseado na moeda selecionada
  const convertPrice = useCallback((amountInBRL: number): number => {
    if (currency === 'BRL') {
      return amountInBRL;
    }
    // Se moeda é USD, converter BRL para USD
    // exchangeRate é USD para BRL (ex: 1 USD = 5.50 BRL)
    // Para converter BRL para USD: dividir pelo exchangeRate
    const convertedAmount = amountInBRL / currencyData.exchangeRate;
    
    // Debug log para verificar conversão
    console.log(`💱 Conversão: R$ ${amountInBRL.toFixed(2)} → $ ${convertedAmount.toFixed(2)} (taxa: ${currencyData.exchangeRate})`);
    
    return convertedAmount;
  }, [currency, currencyData.exchangeRate]);

  // Formatar preço convertido
  const formatPrice = useCallback((amountInBRL: number): string => {
    const convertedAmount = convertPrice(amountInBRL);
    return formatCurrency(convertedAmount);
  }, [convertPrice, formatCurrency]);

  // Alternar entre moedas
  const toggleCurrency = useCallback(() => {
    setCurrency(currency === 'BRL' ? 'USD' : 'BRL');
  }, [currency, setCurrency]);

  return {
    currency,
    setCurrency,
    exchangeRate: currencyData.exchangeRate,
    loading: currencyData.loading,
    error: currencyData.error,
    convertPrice,
    formatPrice,
    toggleCurrency,
    // Função de teste para debug
    testConversion: (amount: number) => {
      console.log(`💱 Teste de conversão:`);
      console.log(`   Valor original: R$ ${amount.toFixed(2)}`);
      console.log(`   Taxa atual: ${currencyData.exchangeRate}`);
      console.log(`   Valor convertido: $ ${(amount / currencyData.exchangeRate).toFixed(2)}`);
      console.log(`   Formatado: ${formatPrice(amount)}`);
    }
  };
}; 