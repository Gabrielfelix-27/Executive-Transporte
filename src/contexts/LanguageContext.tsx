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
    'footer.companyFull': 'Executive | Executive Transporte de Luxo LTDA',
    'footer.address': 'R. Brasília, 196 - Sumaré, São Paulo - SP',
    'footer.cep': '01259-000, Brasil',
    'footer.aboutUs': 'QUEM SOMOS',
    'footer.workWithUs': 'TRABALHE CONOSCO',
    'footer.routes': 'ROTAS',
    'footer.cities': 'CIDADES',
    'footer.services': 'SERVIÇOS',
    'footer.copyright': '2024 © Executive Transporte de Luxo LTDA.',
    'footer.privacy': 'PRIVACIDADE',
    'footer.accessibility': 'ACESSIBILIDADE',
    'footer.terms': 'TERMOS',
    'footer.whatsapp': 'CONVERSE POR WHATSAPP',
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
    'header.mapsDemo': 'Google Maps Demo',
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
    'date.of': 'DE'
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
    'features.guaranteedTripDesc': 'Garantizamos su viaje sin cancelaciones. Nuestros conductores siempre realizarán todos los viajes, asegurando que nuestro servicio sea siempre confiable.',
    'features.ultraWifi': 'WI-FI ULTRA RÁPIDO',
    'features.ultraWifiDesc': 'Manténgase conectado sin preocupaciones. Nuestro Wi-Fi de alta velocidad en todos los vehículos garantiza una experiencia inigualable.',
    'features.sustainableTrip': 'VIAJE SOSTENIBLE',
    'features.sustainableTripDesc': 'Flota híbrida del lujo sostenible, nuestros autos híbridos unen sofisticación, comodidad y exclusividad, preservando el medio ambiente en cada trayecto.',
    
    // Services translations
    'services.title': 'AUTOS BLINDADOS DE LUJO CON CHOFERES',
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
    'services.exec360Desc': 'De movilidad a ocio. Sea Executive y exclusivo en todo.',
    
    // Footer translations
    'footer.company': 'EXECUTIVE',
    'footer.helpCenter': 'ACCEDER CENTRO DE AYUDA',
    'footer.companyFull': 'Executive | Executive Transporte de Lujo LTDA',
    'footer.address': 'R. Brasília, 196 - Sumaré, São Paulo - SP',
    'footer.cep': '01259-000, Brasil',
    'footer.aboutUs': 'QUIÉNES SOMOS',
    'footer.workWithUs': 'TRABAJE CON NOSOTROS',
    'footer.routes': 'RUTAS',
    'footer.cities': 'CIUDADES',
    'footer.services': 'SERVICIOS',
    'footer.copyright': '2024 © Executive Transporte de Lujo LTDA.',
    'footer.privacy': 'PRIVACIDAD',
    'footer.accessibility': 'ACCESIBILIDAD',
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
    'header.mapsDemo': 'Google Maps Demo',
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
    'date.of': 'DE'
  },
  en: {
    // QuoteForm translations
    'quote.title': 'QUOTE BY DESTINATION',
    'quote.pickup': 'Pickup: address, airport, hotel',
    'quote.destination': 'Destination: address, airport, hotel',
    'quote.date': 'Date',
    'quote.time': 'Time',
    'quote.passengers': 'Number of passengers',
    'quote.button': 'QUOTE',
    'quote.book': 'BOOK NOW',
    'quote.required': 'Required fields',
    'quote.fillFields': 'Please fill in pickup and destination.',
    'quote.calculated': 'Quote calculated!',
    'quote.error': 'Quote error',
    'quote.tryAgain': 'Please try again in a few moments.',
    'quote.bookingRequested': 'Booking requested!',
    'quote.contactSoon': 'We will contact you soon to confirm.',
    'quote.formTitle': 'BOOK YOUR RIDE NOW!',
    'quote.byDestination': 'BY DESTINATION',
    'quote.byHour': 'BY HOUR',
    'quote.origin': 'Origin',
    'quote.selectDate': 'Please select date and time',
    'quote.minAdvance': '⚠️ Attention: Please select a valid time.',
    'quote.priceError': 'Error calculating prices. Please try again.',
    
    // Vehicle Categories
    'vehicle.economic': 'ECONOMIC',
    'vehicle.executive': 'EXECUTIVE',
    'vehicle.luxury': 'LUXURY',
    'vehicle.suv': 'SUV',
    'vehicle.economicDesc': 'Basic comfort for short trips',
    'vehicle.executiveDesc': 'Premium comfort for executives',
    'vehicle.luxuryDesc': 'Maximum luxury and sophistication',
    'vehicle.suvDesc': 'Space and comfort for groups',
    
    // Features translations
    'features.firstClass': 'FIRST CLASS',
    'features.firstClassDesc': 'Live the experience of the highest standard in private transportation. Sophistication, glamour and exclusivity for those who demand impeccable service in every detail.',
    'features.maxSecurity': 'MAXIMUM SECURITY',
    'features.maxSecurityDesc': 'Travel with confidence knowing that your security is our number 1 priority. Armored cars and meticulously selected and trained drivers.',
    'features.visionBeyond': 'VISION BEYOND',
    'features.visionBeyondDesc': 'Enjoy stunning views with our panoramic roofs. Innovative design and technology that enrich and elevate your travel experience.',
    'features.guaranteedTrip': 'GUARANTEED TRIP',
    'features.guaranteedTripDesc': 'We guarantee your trip without cancellations. Our drivers will always conduct all rides, ensuring our service is always reliable.',
    'features.ultraWifi': 'ULTRA-FAST WI-FI',
    'features.ultraWifiDesc': 'Stay online with zero worries. Our high-speed Wi-Fi in all vehicles ensures an unmatched experience.',
    'features.sustainableTrip': 'SUSTAINABLE TRIP',
    'features.sustainableTripDesc': 'Sustainable luxury hybrid fleet, our hybrid cars unite sophistication, comfort and exclusivity, preserving the environment in every journey.',
    
    // Services translations
    'services.title': 'LUXURY ARMORED CARS WITH CHAUFFEURS',
    'services.subtitle': 'THE MOST CHOSEN SERVICES',
    'services.onDemand': 'ON-DEMAND SERVICE',
    'services.onDemandDesc': 'Completely exclusive drivers to meet your demands.',
    'services.airportTransfer': 'AIRPORT TRANSFER',
    'services.airportTransferDesc': 'Your time is precious and your comfort is essential.',
    'services.pointToPoint': 'POINT TO POINT',
    'services.pointToPointDesc': 'Your comfort and luxury solution for long-distance travel.',
    'services.business': 'BUSINESS',
    'services.businessDesc': 'Productivity in traffic? Work in luxury and comfort while traveling.',
    'services.executiveProtection': 'EXECUTIVE PROTECTION',
    'services.executiveProtectionDesc': 'Security for your protection with discretion and sophistication.',
    'services.exec360': 'EXEC360',
    'services.exec360Desc': 'From mobility to leisure. Be Executive and exclusive in everything.',
    
    // Footer translations
    'footer.company': 'EXECUTIVE',
    'footer.helpCenter': 'ACCESS HELP CENTER',
    'footer.companyFull': 'Executive | Executive Luxury Transportation LTDA',
    'footer.address': 'R. Brasília, 196 - Sumaré, São Paulo - SP',
    'footer.cep': '01259-000, Brazil',
    'footer.aboutUs': 'ABOUT US',
    'footer.workWithUs': 'WORK WITH US',
    'footer.routes': 'ROUTES',
    'footer.cities': 'CITIES',
    'footer.services': 'SERVICES',
    'footer.copyright': '2024 © Executive Luxury Transportation LTDA.',
    'footer.privacy': 'PRIVACY',
    'footer.accessibility': 'ACCESSIBILITY',
    'footer.terms': 'TERMS',
    'footer.whatsapp': 'CHAT ON WHATSAPP',
    'footer.location': 'SÃO PAULO',
    
    // Locations translations
    'locations.topTitle': 'TOP LOCATIONS',
    'locations.title': 'MOST REQUESTED LOCATIONS',
    'locations.allLocations': 'ALL LOCATIONS →',
    'locations.rosewood': 'ROSEWOOD HOTEL - SÃO PAULO',
    'locations.tivoli': 'TIVOLI MOFARREJ SÃO PAULO HOTEL',
    'locations.congonhas': 'AEROPORTO DE SÃO PAULO/CONGONHAS',
    'locations.guarulhos': 'AEROPORTO DE SÃO PAULO/GUARULHOS',
    
    // Testimonial translations
    'testimonial.quote': 'NEW CHAUFFEUR SERVICE SEEKS TO REDEFINE THE CONCEPT OF LUXURY!',
    'testimonial.source': 'L\'OFFICIEL BRASIL',
    
    // Partners translations
    'partners.title': 'EXECUTIVE PARTNERS',
    
    // Routes translations
    'routes.topTitle': 'TOP ROUTES',
    'routes.title': 'CHECK THE ROUTES',
    'routes.allRoutes': 'ALL ROUTES →',
    'routes.guarulhos': 'GUARULHOS INTERNATIONAL AIRPORT (GRU)',
    'routes.congonhas': 'CONGONHAS AIRPORT (CGH)',
    'routes.rosewood': 'ROSEWOOD HOTEL SÃO PAULO',
    'routes.marriott': 'JW MARRIOTT SÃO PAULO',
    'routes.unique': 'HOTEL UNIQUE SÃO PAULO',
    'routes.fasano': 'HOTEL FASANO JARDINS SÃO PAULO',
    'routes.tivoliMofarrej': 'TIVOLI MOFARREJ SÃO PAULO',
    
    // NotFound translations
    'notfound.title': '404',
    'notfound.message': 'Oops! Page not found',
    'notfound.home': 'Return to Home',
    
    // Header translations
    'header.menu': 'MENU',
    'header.portuguese': 'PORTUGUÊS',
    'header.spanish': 'ESPAÑOL',
    'header.english': 'ENGLISH',
    'header.homepage': 'Home Page',
    'header.mapsDemo': 'Google Maps Demo',
    'header.moreOptions': 'More options coming soon...',
    'currency.real': 'REAL',
    'currency.dollar': 'DOLLAR',
    'hero.title': 'THE TRANSPORTATION SERVICE',
    'hero.subtitle': 'YOU NEED',
    'hero.description': 'Experience the highest standard in premium executive transportation',
    // VehicleSelection page
    'vehicle.pickup': 'PICKUP',
    'vehicle.arrival': 'ARRIVAL',
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
    // PassengerData translations
    'passenger.dataNotFound': 'Data not found',
    'passenger.newQuote': 'Please make a new quote.',
    'passenger.backHome': 'Back to Home',
    'passenger.tripFor': 'WHO IS THIS TRIP FOR',
    'passenger.forMe': 'Book for me',
    'passenger.forOther': 'Book for someone else',
    'passenger.executiveTransport': 'Executive Premium Transport',
    'passenger.class': 'CLASS:',
    'passenger.vehicle': 'VEHICLE:',
    'passenger.pickup': 'PICKUP',
    'passenger.arrival': 'ARRIVAL',
    'passenger.estimatedTime': 'Estimated time',
    'passenger.from': 'FROM',
    'passenger.to': 'TO',
    'passenger.fullName': 'Full name',
    'passenger.phone': 'Phone',
    'passenger.email': 'E-mail',
    'passenger.flightNumber': 'Flight number',
    'passenger.plateName': 'Name on plate',
    'passenger.luggageCount': 'Number of bags',
    'passenger.additionalInfo': 'Additional information',
    'passenger.personalInfo': 'PERSONAL INFORMATION',
    'passenger.flightDetails': 'FLIGHT DETAILS',
    'passenger.terminalDetails': 'TERMINAL DETAILS',
    'passenger.observations': 'Observations',
    'passenger.optional': 'Optional',
    'passenger.finishReservation': 'FINISH BOOKING',
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
