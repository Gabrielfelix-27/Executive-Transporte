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
    'hero.description': 'Experimente o mais alto padrão em transporte executivo premium',
    // VehicleSelection page
    'vehicle.pickup': 'COLETA',
    'vehicle.arrival': 'CHEGADA',
    'vehicle.estimatedAt': 'ESTIMADA ÀS',
    'vehicle.estimatedTime': 'Tempo estimado',
    'vehicle.priceFactors': 'Fatores considerados no preço',
    'vehicle.from': 'DE',
    'vehicle.to': 'PARA',
    'vehicle.priceFrom': 'VALOR A PARTIR DE',
    'vehicle.priceNote': '*Preços podem variar conforme categoria selecionada e fatores da viagem',
    'vehicle.up_to': 'até',
    'vehicle.passengers': 'passageiros',
    'vehicle.mediumBags': 'malas de tamanho médio',
    'vehicle.largeBags': 'malas de tamanho grande',
    'vehicle.totalPrice': 'O preço total inclui impostos, pedágio e outros encargos.',
    'vehicle.benefitsTitle': 'Está incluso em todas as classes:',
    'vehicle.benefit1': 'Cancelamento gratuito até 2 horas antes da corrida',
    'vehicle.benefit2': 'Encontro e recepção',
    'vehicle.benefit3': 'Amenities exclusivos',
    'vehicle.benefit4': '15 minutos gratuitos de tempo de espera',
    'vehicle.observationsTitle': 'Observações:',
    'vehicle.observationsText': 'As capacidades de hóspedes/bagagens devem ser respeitadas por razões de segurança. Se não tiver certeza, selecione uma classe maior, pois os motoristas podem recusar o serviço quando elas forem excedidas.',
    'vehicle.terms': 'Ver termos e condições',
    'vehicle.continue': 'CONTINUAR',
    // Breadcrumb navigation
    'nav.serviceClass': 'Classe do serviço',
    'nav.passengerData': 'Dados do Passageiro',
    'nav.checkout': 'Checkout',
    // Date formatting
    'date.of': 'DE'
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
    'hero.description': 'Experimenta el más alto estándar en transporte ejecutivo premium',
    // VehicleSelection page
    'vehicle.pickup': 'RECOGIDA',
    'vehicle.arrival': 'LLEGADA',
    'vehicle.estimatedAt': 'ESTIMADA A LAS',
    'vehicle.estimatedTime': 'Tiempo estimado',
    'vehicle.priceFactors': 'Factores considerados en el precio',
    'vehicle.from': 'DESDE',
    'vehicle.to': 'HASTA',
    'vehicle.priceFrom': 'PRECIO DESDE',
    'vehicle.priceNote': '*Los precios pueden variar según la categoría seleccionada y factores del viaje',
    'vehicle.up_to': 'hasta',
    'vehicle.passengers': 'pasajeros',
    'vehicle.mediumBags': 'maletas de tamaño mediano',
    'vehicle.largeBags': 'maletas de tamaño grande',
    'vehicle.totalPrice': 'El precio total incluye impuestos, peaje y otros cargos.',
    'vehicle.benefitsTitle': 'Incluido en todas las clases:',
    'vehicle.benefit1': 'Cancelación gratuita hasta 2 horas antes del viaje',
    'vehicle.benefit2': 'Encuentro y recepción',
    'vehicle.benefit3': 'Amenities exclusivos',
    'vehicle.benefit4': '15 minutos gratuitos de tiempo de espera',
    'vehicle.observationsTitle': 'Observaciones:',
    'vehicle.observationsText': 'Las capacidades de huéspedes/equipajes deben respetarse por razones de seguridad. Si no está seguro, seleccione una clase mayor, ya que los conductores pueden rechazar el servicio cuando se excedan.',
    'vehicle.terms': 'Ver términos y condiciones',
    'vehicle.continue': 'CONTINUAR',
    // Breadcrumb navigation
    'nav.serviceClass': 'Clase de servicio',
    'nav.passengerData': 'Datos del Pasajero',
    'nav.checkout': 'Checkout',
    // Date formatting
    'date.of': 'DE'
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
    'hero.description': 'Experience the highest standard in premium executive transportation',
    // VehicleSelection page
    'vehicle.pickup': 'PICKUP',
    'vehicle.arrival': 'ARRIVAL',
    'vehicle.estimatedAt': 'ESTIMATED AT',
    'vehicle.estimatedTime': 'Estimated time',
    'vehicle.priceFactors': 'Price factors considered',
    'vehicle.from': 'FROM',
    'vehicle.to': 'TO',
    'vehicle.priceFrom': 'PRICE FROM',
    'vehicle.priceNote': '*Prices may vary based on selected category and trip factors',
    'vehicle.up_to': 'up to',
    'vehicle.passengers': 'passengers',
    'vehicle.mediumBags': 'medium-sized bags',
    'vehicle.largeBags': 'large-sized bags',
    'vehicle.totalPrice': 'Total price includes taxes, tolls and other charges.',
    'vehicle.benefitsTitle': 'Included in all classes:',
    'vehicle.benefit1': 'Free cancellation up to 2 hours before the ride',
    'vehicle.benefit2': 'Meet and greet',
    'vehicle.benefit3': 'Exclusive amenities',
    'vehicle.benefit4': '15 minutes free waiting time',
    'vehicle.observationsTitle': 'Observations:',
    'vehicle.observationsText': 'Guest/baggage capacities must be respected for safety reasons. If unsure, select a larger class as drivers may refuse service when exceeded.',
    'vehicle.terms': 'View terms and conditions',
    'vehicle.continue': 'CONTINUE',
    // Breadcrumb navigation
    'nav.serviceClass': 'Service Class',
    'nav.passengerData': 'Passenger Data',
    'nav.checkout': 'Checkout',
    // Date formatting
    'date.of': 'OF'
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
