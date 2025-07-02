import React, { createContext, useContext, useState } from 'react';

export type Language = 'pt' | 'es' | 'en';
export type Currency = 'BRL' | 'USD';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
}

const translations = {
  pt: {
    'quote.title': 'COTAÇÃO POR DESTINO',
    'quote.pickup': 'Origem: endereço, aeroporto, hotel',
    'quote.destination': 'Destino: endereço, aeroporto, hotel',
    'quote.date': 'Data',
    'quote.time': 'Horário',
    'quote.passengers': 'Número de passageiros',
    'quote.button': 'COTAÇÃO',
    'quote.calculating': 'CALCULANDO...',
    'quote.book': 'RESERVAR',
    'quote.required': 'Campos obrigatórios',
    'quote.fillFields': 'Por favor, preencha origem e destino.',
    'quote.calculated': 'Cotação calculada!',
    'quote.error': 'Erro na cotação',
    'quote.tryAgain': 'Tente novamente em alguns instantes.',
    'quote.bookingRequested': 'Reserva solicitada!',
    'quote.contactSoon': 'Entraremos em contato em breve para confirmar.',
    'vehicle.economic': 'ECONÔMICO',
    'vehicle.executive': 'EXECUTIVO',
    'vehicle.luxury': 'LUXO',
    'vehicle.suv': 'SUV',
    'vehicle.economicDesc': 'Conforto básico para trajetos curtos',
    'vehicle.executiveDesc': 'Conforto premium para executivos',
    'vehicle.luxuryDesc': 'Máximo luxo e sofisticação',
    'vehicle.suvDesc': 'Espaço e conforto para grupos',
    'header.menu': 'MENU',
    'header.portuguese': 'PORTUGUÊS',
    'header.spanish': 'ESPAÑOL',
    'header.english': 'ENGLISH',
    'currency.real': 'REAL',
    'currency.dollar': 'DÓLAR',
    'hero.title': 'SEU CHAUFFEUR',
    'hero.subtitle': 'DE LUXO',
    'hero.description': 'Experimente o mais alto padrão em transporte executivo premium'
  },
  es: {
    'quote.title': 'COTIZACIÓN POR DESTINO',
    'quote.pickup': 'Origen: dirección, aeropuerto, hotel',
    'quote.destination': 'Destino: dirección, aeropuerto, hotel',
    'quote.date': 'Fecha',
    'quote.time': 'Hora',
    'quote.passengers': 'Número de pasajeros',
    'quote.button': 'COTIZACIÓN',
    'quote.calculating': 'CALCULANDO...',
    'quote.book': 'RESERVAR',
    'quote.required': 'Campos obligatorios',
    'quote.fillFields': 'Por favor, complete origen y destino.',
    'quote.calculated': '¡Cotización calculada!',
    'quote.error': 'Error en la cotización',
    'quote.tryAgain': 'Intente nuevamente en unos instantes.',
    'quote.bookingRequested': '¡Reserva solicitada!',
    'quote.contactSoon': 'Nos contactaremos pronto para confirmar.',
    'vehicle.economic': 'ECONÓMICO',
    'vehicle.executive': 'EJECUTIVO',
    'vehicle.luxury': 'LUJO',
    'vehicle.suv': 'SUV',
    'vehicle.economicDesc': 'Comodidad básica para trayectos cortos',
    'vehicle.executiveDesc': 'Comodidad premium para ejecutivos',
    'vehicle.luxuryDesc': 'Máximo lujo y sofisticación',
    'vehicle.suvDesc': 'Espacio y comodidad para grupos',
    'header.menu': 'MENÚ',
    'header.portuguese': 'PORTUGUÊS',
    'header.spanish': 'ESPAÑOL',
    'header.english': 'ENGLISH',
    'currency.real': 'REAL',
    'currency.dollar': 'DÓLAR',
    'hero.title': 'TU CHOFER',
    'hero.subtitle': 'DE LUJO',
    'hero.description': 'Experimenta el más alto estándar en transporte ejecutivo premium'
  },
  en: {
    'quote.title': 'QUOTE BY DESTINATION',
    'quote.pickup': 'Pickup: address, airport, hotel',
    'quote.destination': 'Destination: address, airport, hotel',
    'quote.date': 'Date',
    'quote.time': 'Time',
    'quote.passengers': 'Number of passengers',
    'quote.button': 'QUOTE',
    'quote.calculating': 'CALCULATING...',
    'quote.book': 'BOOK NOW',
    'quote.required': 'Required fields',
    'quote.fillFields': 'Please fill in pickup and destination.',
    'quote.calculated': 'Quote calculated!',
    'quote.error': 'Quote error',
    'quote.tryAgain': 'Please try again in a few moments.',
    'quote.bookingRequested': 'Booking requested!',
    'quote.contactSoon': 'We will contact you soon to confirm.',
    'vehicle.economic': 'ECONOMIC',
    'vehicle.executive': 'EXECUTIVE',
    'vehicle.luxury': 'LUXURY',
    'vehicle.suv': 'SUV',
    'vehicle.economicDesc': 'Basic comfort for short trips',
    'vehicle.executiveDesc': 'Premium comfort for executives',
    'vehicle.luxuryDesc': 'Maximum luxury and sophistication',
    'vehicle.suvDesc': 'Space and comfort for groups',
    'header.menu': 'MENU',
    'header.portuguese': 'PORTUGUÊS',
    'header.spanish': 'ESPAÑOL',
    'header.english': 'ENGLISH',
    'currency.real': 'REAL',
    'currency.dollar': 'DOLLAR',
    'hero.title': 'YOUR LUXURY',
    'hero.subtitle': 'CHAUFFEUR',
    'hero.description': 'Experience the highest standard in premium executive transportation'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [currency, setCurrency] = useState<Currency>('BRL');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const formatCurrency = (amount: number): string => {
    if (currency === 'BRL') {
      return `R$ ${amount.toFixed(2).replace('.', ',')}`;
    } else {
      return `$ ${amount.toFixed(2)}`;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
