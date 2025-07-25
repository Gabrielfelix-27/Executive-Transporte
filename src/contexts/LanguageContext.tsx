import React, { createContext, useContext, useState } from 'react';

export type Language = 'pt' | 'es';
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
    // QuoteForm translations
    'quote.title': 'COTAÇÃO POR DESTINO',
    'quote.pickup': 'Origem: endereço, aeroporto, hotel',
    'quote.destination': 'Destino: endereço, aeroporto, hotel',
    'quote.date': 'Data',
    'quote.time': 'Horário',
    'quote.passengers': 'Número de passageiros',
    'quote.button': 'COTAÇÃO',
    'quote.book': 'RESERVAR',
    'quote.required': 'Campos obrigatórios',
    'quote.fillFields': 'Por favor, preencha origem e destino.',
    'quote.calculated': 'Cotação calculada!',
    'quote.error': 'Erro na cotação',
    'quote.tryAgain': 'Tente novamente em alguns instantes.',
    'quote.bookingRequested': 'Reserva solicitada!',
    'quote.contactSoon': 'Entraremos em contato em breve para confirmar.',
    'quote.formTitle': 'FAÇA A SUA RESERVA AGORA!',
    'quote.byDestination': 'POR DESTINO',
    'quote.byHour': 'POR HORA',
    'quote.origin': 'Origem',
    'quote.selectDate': 'Por favor, selecione data e horário',
    'quote.minAdvance': '⚠️ Atenção: Por favor, selecione um horário válido.',
    'quote.priceError': 'Erro ao calcular preços. Tente novamente.',
    
    // Vehicle Categories
    'vehicle.economic': 'ECONÔMICO',
    'vehicle.executive': 'EXECUTIVO',
    'vehicle.luxury': 'LUXO',
    'vehicle.suv': 'SUV',
    'vehicle.economicDesc': 'Conforto básico para trajetos curtos',
    'vehicle.executiveDesc': 'Conforto premium para executivos',
    'vehicle.luxuryDesc': 'Máximo luxo e sofisticação',
    'vehicle.suvDesc': 'Espaço e conforto para grupos',
    
    // Features translations
    'features.firstClass': 'PRIMEIRA CLASSE',
    'features.firstClassDesc': 'Viva a experiência do mais alto padrão em transporte privativo. Sofisticação, glamour e exclusividade para quem exige um serviço impecável em cada detalhe.',
    'features.maxSecurity': 'SEGURANÇA MÁXIMA',
    'features.maxSecurityDesc': 'Viaje com confiança sabendo que sua segurança é nossa prioridade número 1. Carros blindados e motoristas minuciosamente selecionados e treinados.',
    'features.visionBeyond': 'VISÃO ALÉM',
    'features.visionBeyondDesc': 'Aproveite vistas deslumbrantes com nossos tetos panorâmicos. Design inovador e tecnologia que enriquecem e elevam sua experiência de viagem.',
    'features.guaranteedTrip': 'VIAGEM GARANTIDA',
    'features.guaranteedTripDesc': 'Garantimos sua viagem sem cancelar cancelada. Nossos motoristas sempre vão conduzir todas as corridas, assegurando que nosso serviço seja sempre confiável.',
    'features.ultraWifi': 'WI-FI ULTRARÁPIDO',
    'features.ultraWifiDesc': 'Mantenha-se online com total zero preocupações. Nosso Wi-Fi de alta velocidade em todos os veículos garante uma experiência inalável.',
    'features.sustainableTrip': 'VIAGEM SUSTENTÁVEL',
    'features.sustainableTripDesc': 'Frota híbrida do luxo sustentável, nossos carros híbridos unem sofisticação, conforto e exclusividade, preservando o meio ambiente em cada trajeto.',
    
    // Services translations
    'services.title': 'VEÍCULOS BLINDADOS DE LUXO COM CHOFERES',
    'services.subtitle': 'OS SERVIÇOS MAIS ESCOLHIDOS',
    'services.onDemand': 'SERVIÇO À DISPOSIÇÃO',
    'services.onDemandDesc': 'Motoristas inteiramente exclusivos para atender as suas demandas.',
    'services.airportTransfer': 'TRANSFER AEROPORTO',
    'services.airportTransferDesc': 'Seu tempo é precioso e sua comodidade é fundamental.',
    'services.pointToPoint': 'POINT TO POINT',
    'services.pointToPointDesc': 'Sua solução de conforto e luxo para viagens de longas distâncias.',
    'services.business': 'BUSINESS',
    'services.businessDesc': 'Produtividade no trânsito? Trabalhe no luxo e conforto enquanto viaja.',
    'services.executiveProtection': 'PROTEÇÃO EXECUTIVA',
    'services.executiveProtectionDesc': 'Segurança para sua proteção com discrição e sofisticação.',
    'services.exec360': 'EXEC360',
    'services.exec360Desc': 'De mobilidade ao lazer. Seja Executive e exclusivo em tudo.',
    
    // Footer translations
    'footer.company': 'EXECUTIVE',
    'footer.helpCenter': 'ACESSAR CENTRAL DE AJUDA',
    'footer.companyFull': 'Executive Premium',
    'footer.address': 'Rua Baronesa de Bela Vista, 411 - Vila Congonhas, São Paulo - SP, Brasil',
    'footer.phone': '(11) 91585-3292',
    'footer.email': 'executivetransportepremium@gmail.com',
    'footer.instagram': 'Instagram',
    'footer.aboutUs': 'QUEM SOMOS',
    'footer.workWithUs': 'TRABALHE CONOSCO',
    'footer.routes': 'ROTAS',
    'footer.cities': 'CIDADES',
    'footer.services': 'SERVIÇOS',
    'footer.copyright': '2025 © Executive Transporte Premium',
    'footer.developedBy': 'Desenvolvido por Dreamsetfilms',
    'footer.privacy': 'PRIVACIDADE',
    'footer.accessibility': 'ACESSIBILIDADE',
    'footer.terms': 'TERMOS',
    'footer.location': 'SÃO PAULO',
    
    // Locations translations
    'locations.topTitle': 'TOP LOCALIDADES',
    'locations.title': 'LOCALIDADES MAIS SOLICITADAS',
    'locations.allLocations': 'TODOS OS LOCAIS →',
    'locations.rosewood': 'ROSEWOOD HOTEL - SÃO PAULO',
    'locations.tivoli': 'TIVOLI MOFARREJ SÃO PAULO HOTEL',
    'locations.congonhas': 'AEROPORTO DE SÃO PAULO/CONGONHAS',
    'locations.guarulhos': 'AEROPORTO DE SÃO PAULO/GUARULHOS',
    
    // Testimonial translations
    'testimonial.quote': 'NOVO SERVIÇO DE CHAUFFEUR BUSCA REDEFINIR O CONCEITO DE LUXO!',
    'testimonial.source': 'L\'OFFICIEL BRASIL',
    
    // Partners translations
    'partners.title': 'PARCEIROS EXECUTIVE',
    
    // Routes translations
    'routes.topTitle': 'TOP ROUTES',
    'routes.title': 'CONFIRA AS ROTAS',
    'routes.allRoutes': 'TODAS AS ROTAS →',
    'routes.guarulhos': 'AEROPORTO INTERNACIONAL DE GUARULHOS (GRU)',
    'routes.congonhas': 'AEROPORTO DE CONGONHAS (CGH)',
    'routes.rosewood': 'ROSEWOOD HOTEL SÃO PAULO',
    'routes.marriott': 'JW MARRIOTT SÃO PAULO',
    'routes.unique': 'HOTEL UNIQUE SÃO PAULO',
    'routes.fasano': 'HOTEL FASANO JARDINS SÃO PAULO',
    'routes.tivoliMofarrej': 'TIVOLI MOFARREJ SÃO PAULO',
    
    // NotFound translations
    'notfound.title': '404',
    'notfound.message': 'Oops! Página não encontrada',
    'notfound.home': 'Voltar ao Início',
    
    // Header translations
    'header.menu': 'MENU',
    'header.portuguese': 'PORTUGUÊS',
    'header.spanish': 'ESPAÑOL',
    'header.english': 'ENGLISH',
    'header.homepage': 'Página Principal',
    'header.aboutUs': 'Sobre Nós',
    'header.moreOptions': 'Mais opções em breve...',
    'currency.real': 'REAL',
    'currency.dollar': 'DÓLAR',
    'hero.title': 'O SERVIÇO DE TRANSPORTE',
    'hero.subtitle': 'QUE VOCÊ PRECISA',
    'hero.description': 'Experimente o mais alto padrão em transporte executivo premium',
    // VehicleSelection page
    'vehicle.pickup': 'COLETA',
    'vehicle.arrival': 'CHEGADA',
    'vehicle.estimatedTime': 'Tempo estimado',
    'vehicle.priceFactors': 'Fatores de preço',
    'vehicle.from': 'DE',
    'vehicle.to': 'PARA',
    'vehicle.priceFrom': 'Preços a partir de',
    'vehicle.priceNote': 'Preços finais podem variar conforme condições específicas da viagem',
    'vehicle.up_to': 'até',
    'vehicle.passengers': 'passageiros',
    'vehicle.mediumBags': 'malas de tamanho médio',
    'vehicle.largeBags': 'malas de tamanho grande',
    'vehicle.totalPrice': 'O preço total inclui impostos, pedágio e outros encargos.',
    'vehicle.benefitsTitle': 'Benefícios inclusos:',
    'vehicle.benefit1': 'Wi-Fi gratuito',
    'vehicle.benefit2': 'Motorista profissional',
    'vehicle.benefit3': 'Água gratuita',
    'vehicle.benefit4': 'Pontualidade garantida',
    'vehicle.observationsTitle': 'Observações:',
    'vehicle.observationsText': 'As capacidades de hóspedes/bagagens devem ser respeitadas por razões de segurança. Se não tiver certeza, selecione uma classe maior, pois os motoristas podem recusar o serviço quando elas forem excedidas.',
    'vehicle.terms': 'Ver termos e condições',
    'vehicle.continue': 'CONTINUAR',
    // Breadcrumb navigation
    'nav.serviceClass': 'Classe do serviço',
    'nav.passengerData': 'Dados do Passageiro',
    'nav.checkout': 'Checkout',
    // PassengerData translations
    'passenger.dataNotFound': 'Dados não encontrados',
    'passenger.newQuote': 'Por favor, faça uma nova cotação.',
    'passenger.backHome': 'Voltar ao Início',
    'passenger.tripFor': 'PARA QUEM É ESSA VIAGEM',
    'passenger.forMe': 'Reservar para mim',
    'passenger.forOther': 'Reservar para outra pessoa',
    'passenger.executiveTransport': 'Executive Transporte Premium',
    'passenger.class': 'CLASSE:',
    'passenger.vehicle': 'VEÍCULO:',
    'passenger.pickup': 'COLETA',
    'passenger.arrival': 'CHEGADA',
    'passenger.estimatedTime': 'Tempo estimado',
    'passenger.from': 'DE',
    'passenger.to': 'PARA',
    'passenger.fullName': 'Nome completo',
    'passenger.phone': 'Telefone',
    'passenger.email': 'E-mail',
    'passenger.flightNumber': 'Número do voo',
    'passenger.plateName': 'Nome na placa',
    'passenger.luggageCount': 'Número de malas',
    'passenger.additionalInfo': 'Informações adicionais',
    'passenger.personalInfo': 'INFORMAÇÕES PESSOAIS',
    'passenger.flightDetails': 'DETALHES DO VOO',
    'passenger.terminalDetails': 'DETALHES DO TERMINAL',
    'passenger.observations': 'Observações',
    'passenger.optional': 'Opcional',
    'passenger.finishReservation': 'FINALIZAR RESERVA VIA WHATSAPP',
    
    // Date formatting
    'date.of': 'DE',
    
    // About Us translations
    'about.title': 'Sobre Nós',
    'about.description1': 'Na Executive Transporte Premium, oferecemos uma experiência de mobilidade sofisticada e confiável para pessoas e empresas exigentes. Atuamos em São Paulo com foco em pontualidade, conforto e segurança, seja para compromissos corporativos, eventos, traslados executivos ou momentos especiais.',
    'about.description2': 'Contamos com uma equipe de motoristas altamente qualificados, frota premium e atendimento personalizado, ideal para quem busca profissionalismo em cada trajeto.',
    'about.description3': 'Seja para viagens de negócios, recepção de executivos, translados para aeroportos ou passeios personalizados, conte com a Executive para proporcionar uma jornada à altura da sua necessidade.'
  },
  es: {
    // QuoteForm translations
    'quote.title': 'COTIZACIÓN POR DESTINO',
    'quote.pickup': 'Origen: dirección, aeropuerto, hotel',
    'quote.destination': 'Destino: dirección, aeropuerto, hotel',
    'quote.date': 'Fecha',
    'quote.time': 'Hora',
    'quote.passengers': 'Número de pasajeros',
    'quote.button': 'COTIZACIÓN',
    'quote.book': 'RESERVAR',
    'quote.required': 'Campos obligatorios',
    'quote.fillFields': 'Por favor, complete origen y destino.',
    'quote.calculated': '¡Cotización calculada!',
    'quote.error': 'Error en la cotización',
    'quote.tryAgain': 'Intente nuevamente en unos instantes.',
    'quote.bookingRequested': '¡Reserva solicitada!',
    'quote.contactSoon': 'Nos contactaremos pronto para confirmar.',
    'quote.formTitle': '¡HAGA SU RESERVA AHORA!',
    'quote.byDestination': 'POR DESTINO',
    'quote.byHour': 'POR HORA',
    'quote.origin': 'Origen',
    'quote.selectDate': 'Por favor, seleccione fecha y hora',
    'quote.minAdvance': '⚠️ Atención: Por favor, seleccione una hora válida.',
    'quote.priceError': 'Error al calcular precios. Inténtelo de nuevo.',
    
    // Vehicle Categories
    'vehicle.economic': 'ECONÓMICO',
    'vehicle.executive': 'EJECUTIVO',
    'vehicle.luxury': 'LUJO',
    'vehicle.suv': 'SUV',
    'vehicle.economicDesc': 'Comodidad básica para trayectos cortos',
    'vehicle.executiveDesc': 'Comodidad premium para ejecutivos',
    'vehicle.luxuryDesc': 'Máximo lujo y sofisticación',
    'vehicle.suvDesc': 'Espacio y comodidad para grupos',
    
    // Features translations
    'features.firstClass': 'PRIMERA CLASE',
    'features.firstClassDesc': 'Viva la experiencia del más alto estándar en transporte privado. Sofisticación, glamour y exclusividad para quienes exigen un servicio impecable en cada detalle.',
    'features.maxSecurity': 'SEGURIDAD MÁXIMA',
    'features.maxSecurityDesc': 'Viaje con confianza sabiendo que su seguridad es nuestra prioridad número 1. Autos blindados y conductores minuciosamente seleccionados y entrenados.',
    'features.visionBeyond': 'VISIÓN MÁS ALLÁ',
    'features.visionBeyondDesc': 'Disfrute de vistas deslumbrantes con nuestros techos panorámicos. Diseño innovador y tecnología que enriquecen y elevan su experiencia de viaje.',
    'features.guaranteedTrip': 'VIAJE GARANTIZADO',
    'features.guaranteedTripDesc': 'Garantizamos sua viagem sem cancelar cancelada. Nuestros conductores siempre realizarán todos los viajes, asegurando que nuestro servicio sea siempre confiable.',
    'features.ultraWifi': 'WI-FI ULTRA RÁPIDO',
    'features.ultraWifiDesc': 'Manténgase conectado sin preocupaciones. Nuestro Wi-Fi de alta velocidad en todos los vehículos garantiza una experiencia inigualable.',
    'features.sustainableTrip': 'VIAJE SUSTENIBLE',
    'features.sustainableTripDesc': 'Flota híbrida del lujo sostenible, nuestros autos híbridos unen sofisticación, comodidad y exclusividad, preservando el medio ambiente en cada trayecto.',
    
    // Services translations
    'services.title': 'AUTOS BLINDADOS DE LUJO COM CHOFERES',
    'services.subtitle': 'LOS SERVICIOS MÁS ELEGIDOS',
    'services.onDemand': 'SERVICIO A DISPOSICIÓN',
    'services.onDemandDesc': 'Conductores completamente exclusivos para atender sus demandas.',
    'services.airportTransfer': 'TRASLADO AEROPUERTO',
    'services.airportTransferDesc': 'Su tiempo es valioso y su comodidad es fundamental.',
    'services.pointToPoint': 'PUNTO A PUNTO',
    'services.pointToPointDesc': 'Su solución de comodidad y lujo para viajes de larga distancia.',
    'services.business': 'BUSINESS',
    'services.businessDesc': '¿Productividad en el tráfico? Trabaje en lujo y comodidad mientras viaja.',
    'services.executiveProtection': 'PROTECCIÓN EJECUTIVA',
    'services.executiveProtectionDesc': 'Seguridad para su protección con discreción y sofisticación.',
    'services.exec360': 'EXEC360',
    'services.exec360Desc': 'De mobilidad a ocio. Sea Executive y exclusivo en todo.',
    
    // Footer translations
    'footer.company': 'EXECUTIVE',
    'footer.helpCenter': 'ACCEDER CENTRO DE AYUDA',
    'footer.companyFull': 'Executive Premium',
    'footer.address': 'Rua Baronesa de Bela Vista, 411 - Vila Congonhas, São Paulo - SP, Brasil',
    'footer.phone': '(11) 91585-3292',
    'footer.email': 'executivetransportepremium@gmail.com',
    'footer.instagram': 'Instagram',
    'footer.aboutUs': 'QUIÉNES SOMOS',
    'footer.workWithUs': 'TRABAJE CON NOSOTROS',
    'footer.routes': 'RUTAS',
    'footer.cities': 'CIUDADES',
    'footer.services': 'SERVICIOS',
    'footer.copyright': '2024 © Executive Transporte de Lujo LTDA.',
    'footer.privacy': 'PRIVACIDADE',
    'footer.accessibility': 'ACCESIBILIDADE',
    'footer.terms': 'TÉRMINOS',
    'footer.whatsapp': 'CONVERSAR POR WHATSAPP',
    'footer.location': 'SÃO PAULO',
    
    // Locations translations
    'locations.topTitle': 'TOP LOCALIDADES',
    'locations.title': 'LOCALIDADES MÁS SOLICITADAS',
    'locations.allLocations': 'TODAS LAS LOCALIDADES →',
    'locations.rosewood': 'ROSEWOOD HOTEL - SÃO PAULO',
    'locations.tivoli': 'TIVOLI MOFARREJ SÃO PAULO HOTEL',
    'locations.congonhas': 'AEROPORTO DE SÃO PAULO/CONGONHAS',
    'locations.guarulhos': 'AEROPORTO DE SÃO PAULO/GUARULHOS',
    
    // Testimonial translations
    'testimonial.quote': '¡NUEVO SERVICIO DE CHOFER BUSCA REDEFINIR EL CONCEPTO DE LUJO!',
    'testimonial.source': 'L\'OFFICIEL BRASIL',
    
    // Partners translations
    'partners.title': 'SOCIOS EXECUTIVE',
    
    // Routes translations
    'routes.topTitle': 'TOP RUTAS',
    'routes.title': 'CONSULTE LAS RUTAS',
    'routes.allRoutes': 'TODAS LAS RUTAS →',
    'routes.guarulhos': 'AEROPORTO INTERNACIONAL DE GUARULHOS (GRU)',
    'routes.congonhas': 'AEROPORTO DE CONGONHAS (CGH)',
    'routes.rosewood': 'ROSEWOOD HOTEL SÃO PAULO',
    'routes.marriott': 'JW MARRIOTT SÃO PAULO',
    'routes.unique': 'HOTEL UNIQUE SÃO PAULO',
    'routes.fasano': 'HOTEL FASANO JARDINS SÃO PAULO',
    'routes.tivoliMofarrej': 'TIVOLI MOFARREJ SÃO PAULO',
    
    // NotFound translations
    'notfound.title': '404',
    'notfound.message': '¡Ups! Página no encontrada',
    'notfound.home': 'Volver al Inicio',
    
    // Header translations
    'header.menu': 'MENÚ',
    'header.portuguese': 'PORTUGUÊS',
    'header.spanish': 'ESPAÑOL',
    'header.english': 'ENGLISH',
    'header.homepage': 'Página Principal',
    'header.aboutUs': 'Acerca de Nosotros',
    'header.moreOptions': 'Más opciones próximamente...',
    'currency.real': 'REAL',
    'currency.dollar': 'DÓLAR',
    'hero.title': 'EL SERVICIO DE TRANSPORTE',
    'hero.subtitle': 'QUE NECESITAS',
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
    // PassengerData translations
    'passenger.dataNotFound': 'Datos no encontrados',
    'passenger.newQuote': 'Por favor, haga una nueva cotización.',
    'passenger.backHome': 'Volver al Inicio',
    'passenger.tripFor': 'PARA QUIÉN ES ESTE VIAJE',
    'passenger.forMe': 'Reservar para mí',
    'passenger.forOther': 'Reservar para otra persona',
    'passenger.executiveTransport': 'Executive Transporte Premium',
    'passenger.class': 'CLASE:',
    'passenger.vehicle': 'VEHÍCULO:',
    'passenger.pickup': 'RECOGIDA',
    'passenger.arrival': 'LLEGADA',
    'passenger.estimatedAt': 'ESTIMADA A LAS',
    'passenger.estimatedTime': 'Tiempo estimado',
    'passenger.from': 'DESDE',
    'passenger.to': 'HASTA',
    'passenger.fullName': 'Nombre completo',
    'passenger.phone': 'Teléfono',
    'passenger.email': 'E-mail',
    'passenger.flightNumber': 'Número de vuelo',
    'passenger.plateName': 'Nombre en la placa',
    'passenger.luggageCount': 'Número de maletas',
    'passenger.additionalInfo': 'Información adicional',
    'passenger.personalInfo': 'INFORMACIÓN PERSONAL',
    'passenger.flightDetails': 'DETALLES DEL VUELO',
    'passenger.terminalDetails': 'DETALLES DEL TERMINAL',
    'passenger.observations': 'Observaciones',
    'passenger.optional': 'Opcional',
    'passenger.finishReservation': 'FINALIZAR RESERVA',
    // Date formatting
    'date.of': 'DE',
    
    // About Us translations
    'about.title': 'Acerca de Nosotros',
    'about.description1': 'En Executive Transporte Premium, ofrecemos una experiencia de movilidade sofisticada e confiável para personas y empresas exigentes. Operamos em São Paulo com enfoque em punctualidade, comodidade e segurança, seja para compromisso corporativos, eventos, executivos traslados ou momentos especiais.',
    'about.description2': 'Contamos com um time de motoristas altamente qualificados, frota premium e atendimento personalizado, ideal para quem busca profissionalismo em cada trajeto.',
    'about.description3': 'Ya sea para viagens de negócios, recepção de executivos, traslados a aeroportos ou passeios personalizados, cuente com Executive para proporcionar um viaje a la altura de su necesidade.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [currency, setCurrency] = useState<Currency>('BRL');

  const t = (key: string): string => {
    const translation = translations[language];
    return translation?.[key as keyof typeof translation] || key;
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
