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
    'about.description3': 'Seja para viagens de negócios, recepção de executivos, translados para aeroportos ou passeios personalizados, conte com a Executive para proporcionar uma jornada à altura da sua necessidade.',
    
    // Additional translations for hardcoded texts
    'trip.summary': 'Resumo da Viagem',
    'trip.origin': 'Origem',
    'trip.destination': 'Destino',
    'trip.dateTime': 'Data e Horário',
    'trip.dateAndTime': 'Data e Horário',
    'trip.distance': 'Distância',
    'trip.priceFactors': 'Fatores de Preço',
    'trip.originNotInformed': 'Origem não informada',
    'trip.destinationNotInformed': 'Destino não informado',
    'trip.originAddressNotInformed': 'Endereço de origem não informado',
    'trip.destinationAddressNotInformed': 'Endereço de destino não informado',
    'vehicle.priceFactorsLabel': 'Fatores de preço',
    'vehicle.priceFactors': 'Fatores de Preço',
    
    // Form and interface texts
    'form.typeAddress': 'Digite um endereço...',
    'form.chooseOption': 'Escolha uma das opções abaixo para continuar:',
    'form.attachPdf': 'Anexe o PDF baixado na conversa para confirmar a reserva',
    
    // PassengerData page texts
    'passenger.reservationProcessed': 'Sua reserva foi processada com sucesso!',
    'passenger.pdfDownloaded': 'PDF baixado com sucesso!',
    'passenger.downloadQuotePdf': 'Baixar orçamento em PDF',
    'passenger.whatsappOpened': 'WhatsApp aberto com sucesso!',
    'passenger.contactAgent': 'Falar com atendente para adiantar o atendimento',
    'passenger.completeService': 'Concluir atendimento',
    'passenger.thankYou': 'Obrigado!',
    'passenger.quoteConcluded': 'Seu orçamento foi concluído com sucesso.',
    'passenger.redirecting': 'Redirecionando para a página inicial em alguns segundos...',
    'passenger.distance': 'Distância',
    'passenger.additionalInfo': 'Forneça informações adicionais',
    'passenger.specialRequests': 'Se desejar, você pode adicionar solicitações especiais, por exemplo, quantidade de malas, cadeiras de criança, etc.',
    'passenger.terminalInfo': 'Informações do Terminal',
    'passenger.terminalPlaceholder': 'Ex: Leito, executivo, etc.',
    'passenger.luggageCount': 'Número de Malas',
    'passenger.fullNamePlaceholder': 'Nome completo',
    'passenger.phonePlaceholder': '(11) 99999-9999',
    'passenger.emailPlaceholder': 'seuemail@exemplo.com',
    'passenger.additionalObservations': 'Observações Adicionais',
    'passenger.observationsPlaceholder': 'Observações especiais, necessidades especiais, etc.',
    'passenger.howItWorks': 'Como funciona a finalização:',
    'passenger.pdfGenerated': 'Um PDF será gerado automaticamente com todos os detalhes',
    'passenger.fileDownloaded': 'O arquivo será baixado em seu dispositivo',
    'passenger.whatsappRedirect': 'Você será redirecionado para o WhatsApp da Executive Premium',
    'passenger.attachPdfConfirm': 'Anexe o PDF baixado na conversa para confirmar a reserva',
    'passenger.finalizeReservation': 'Finalizar reserva',
    'passenger.fillRequiredFields': 'Por favor, preencha todos os campos obrigatórios (*)',
    'passenger.additionalInfo': 'Forneça informações adicionais',
    'passenger.additionalInfoDesc': 'Se desejar, você pode adicionar solicitações especiais, por exemplo, quantidade de malas, cadeiras de criança, etc.',
    'passenger.terminalInfo': 'Informações do Terminal',
    'passenger.luggageCount': 'Número de Malas',
    'passenger.additionalObservations': 'Observações Adicionais',
    'passenger.howItWorks': 'Como funciona a finalização:',
    'passenger.pdfGenerated': 'Um PDF será gerado automaticamente com todos os detalhes',
    'passenger.fileDownloaded': 'O arquivo será baixado em seu dispositivo',
    'passenger.whatsappRedirect': 'Você será redirecionado para o WhatsApp da Executive Premium',
    'passenger.finalizeReservation': 'Finalizar reserva',
    'placeholder.flightNumber': 'Ex: G31234',
    'placeholder.terminalInfo': 'Ex: Leito, executivo, etc.',
    'placeholder.fullName': 'Nome completo',
    'placeholder.email': 'seuemail@exemplo.com',
    'placeholder.observations': 'Observações especiais, necessidades especiais, etc.',
    'placeholder.testAddress': 'Digite um endereço para testar (ex: Aeroporto Guarulhos)',
    
    // Business page translations
    'business.executiveTransferTitle': 'TRANSFER EXECUTIVO EXECUTIVE PREMIUM — CHEGUE COM CLASSE',
    'business.executiveTransferDesc1': 'Se você acaba de desembarcar, cansado após um voo longo, não há forma mais tranquila e elegante de seguir viagem do que com um transfer Executive Premium direto do aeroporto ao seu destino.',
    'business.executiveTransferDesc2': 'Atuamos exclusivamente em São Paulo, oferecendo uma alternativa premium para quem deseja evitar o estresse do transporte público ou a imprevisibilidade dos táxis locais. Nossos motoristas acompanham seu voo em tempo real e se ajustam automaticamente a qualquer atraso, garantindo uma recepção pontual e personalizada.',
    'business.executiveTransferDesc3': 'Todos os condutores Executive Premium são cuidadosamente selecionados, altamente treinados e possuem conhecimento profundo da cidade. Estão sempre prontos para oferecer orientações e sugestões sob medida para a sua estadia.',
    'business.mobileOfficeTitle': 'SEU ESCRITÓRIO EM MOVIMENTO',
    'business.mobileOfficeDesc1': 'Transforme cada trajeto em um momento produtivo com a Executive Premium. Nossos veículos foram cuidadosamente escolhidos para oferecer o ambiente ideal para que você possa trabalhar, se concentrar ou simplesmente relaxar com total privacidade e silêncio.',
    'business.mobileOfficeDesc2': 'Graças aos motores híbridos, os carros da Executive Premium oferecem uma condução extremamente silenciosa — perfeita para chamadas de vídeo, leitura de relatórios ou revisão de apresentações durante o caminho. O Wi-Fi a bordo garantem que você esteja sempre conectado, sem depender de redes públicas instáveis.',
    'business.mobileOfficeDesc3': 'Para garantir a máxima discrição, todos os nossos veículos contam com vidros de privacidade blindados, criando um ambiente reservado, elegante e livre de distrações externas.',
    'business.mobileOfficeDesc4': 'Seja indo para uma reunião importante ou retornando de um compromisso, com a Executive Premium, cada trajeto é uma extensão do seu escritório — com conforto, sofisticação e foco.',
    'business.easyBookingTitle': 'RESERVE COM FACILIDADE',
    'business.easyBookingDesc1': 'Reservar seu transfer com a Executive Premium é simples e direto. Através do nosso site ou aplicativo, você escolhe o ponto de partida, destino e a categoria do veículo que melhor se adequa à sua ocasião.',
    'business.easyBookingDesc2': 'Transparência é um dos nossos pilares: o valor exibido na reserva é exatamente o que você pagará — sem taxas ocultas ou surpresas. Uma forma clara e elegante de começar sua experiência em São Paulo.',
    'business.ctaTitle': 'Pronto para elevar suas viagens de negócios?',
    'business.ctaDesc': 'Experimente o transporte executivo da Executive Premium e transforme cada trajeto em uma oportunidade de produtividade.',
    'business.ctaButton': 'SOLICITAR COTAÇÃO'
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
    'quote.calculated': 'Quote calculated!',
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
    'features.ultraWifi': 'ULTRA-FAST WI-FI',
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
    'services.executiveProtectionDesc': 'Seguridad para sua protección con discreción y sofisticación.',
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
    'footer.workWithUs': 'TRABALHE CON NOSOTROS',
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
    
    // Testimonial translations (português - linha 111)
    'testimonial.quote': 'TRANSFORMANDO CADA VIAGEM EM UMA EXPERIÊNCIA DE PRIMEIRA CLASSE!',
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
    'notfound.message': 'Oops! Page not found',
    'notfound.home': 'Back to Home',
    
    // Header translations
    'header.menu': 'MENÚ',
    'header.portuguese': 'PORTUGUÊS',
    'header.spanish': 'ESPAÑOL',
    'header.english': 'ENGLISH',
    'header.homepage': 'Homepage',
    'header.aboutUs': 'About Us',
    'header.moreOptions': 'More options coming soon...',
    'currency.real': 'REAL',
    'currency.dollar': 'DOLLAR',
    'hero.title': 'THE TRANSPORT SERVICE',
    'hero.subtitle': 'YOU NEED',
    'hero.description': 'Experience the highest standard in premium executive transportation',
    // VehicleSelection page
    'vehicle.pickup': 'PICKUP',
    'vehicle.arrival': 'ARRIVAL',
    'vehicle.estimatedTime': 'Estimated time',
    'vehicle.priceFactors': 'Price factors',
    'vehicle.from': 'FROM',
    'vehicle.to': 'TO',
    'vehicle.priceFrom': 'Prices from',
    'vehicle.priceNote': 'Final prices may vary according to specific trip conditions',
    'vehicle.up_to': 'up to',
    'vehicle.passengers': 'passengers',
    'vehicle.mediumBags': 'medium-sized bags',
    'vehicle.largeBags': 'large-sized bags',
    'vehicle.totalPrice': 'Total price includes taxes, tolls and other charges.',
    'vehicle.benefitsTitle': 'Included benefits:',
    'vehicle.benefit1': 'Free Wi-Fi',
    'vehicle.benefit2': 'Professional driver',
    'vehicle.benefit3': 'Free water',
    'vehicle.benefit4': 'Guaranteed punctuality',
    'vehicle.observationsTitle': 'Observations:',
    'vehicle.observationsText': 'Guest/baggage capacities must be respected for safety reasons. If unsure, select a larger class, as drivers may refuse service when they are exceeded.',
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
    'passenger.executiveTransport': 'Executive Transporte Premium',
    'passenger.class': 'CLASS:',
    'passenger.vehicle': 'VEHICLE:',
    'passenger.pickup': 'PICKUP',
    'passenger.arrival': 'ARRIVAL',
    'passenger.estimatedTime': 'Estimated time',
    'passenger.from': 'FROM',
    'passenger.to': 'TO',
    'passenger.fullName': 'Full name',
    'passenger.phone': 'Phone',
    'passenger.email': 'Email',
    'passenger.flightNumber': 'Flight number',
    'passenger.plateName': 'Name on plate',
    'passenger.luggageCount': 'Number of bags',
    'passenger.additionalInfo': 'Additional information',
    'passenger.personalInfo': 'PERSONAL INFORMATION',
    'passenger.flightDetails': 'FLIGHT DETAILS',
    'passenger.terminalDetails': 'TERMINAL DETAILS',
    'passenger.observations': 'Observations',
    'passenger.optional': 'Optional',
    'passenger.finishReservation': 'FINISH RESERVATION VIA WHATSAPP',
    
    // Date formatting
    'date.of': 'OF',
    
    // About Us translations
    'about.title': 'About Us',
    'about.description1': 'At Executive Transporte Premium, we offer a sophisticated and reliable mobility experience for demanding individuals and companies. We operate in São Paulo with a focus on punctuality, comfort and safety, whether for corporate appointments, events, executive transfers or special moments.',
    'about.description2': 'We have a team of highly qualified drivers, premium fleet and personalized service, ideal for those seeking professionalism in every journey.',
    'about.description3': 'Whether for business trips, executive reception, airport transfers or personalized tours, count on Executive to provide a journey that meets your needs.',
    
    // Additional translations for hardcoded texts
    'trip.summary': 'Trip Summary',
    'trip.origin': 'Origin',
    'trip.destination': 'Destination',
    'trip.dateTime': 'Date and Time',
    'trip.dateAndTime': 'Date and Time',
    'trip.distance': 'Distance',
    'trip.priceFactors': 'Price Factors',
    'trip.originNotInformed': 'Origin not informed',
    'trip.destinationNotInformed': 'Destination not informed',
    'trip.originAddressNotInformed': 'Origin address not informed',
    'trip.destinationAddressNotInformed': 'Destination address not informed',
    'vehicle.priceFactorsLabel': 'Price factors',
    'vehicle.priceFactors': 'Price Factors',
    
    // Form and interface texts
    'form.typeAddress': 'Type an address...',
    'form.chooseOption': 'Choose one of the options below to continue:',
    'form.attachPdf': 'Attach the downloaded PDF to the conversation to confirm the reservation',
    
    // PassengerData page texts
    'passenger.reservationProcessed': 'Your reservation has been processed successfully!',
    'passenger.pdfDownloaded': 'PDF downloaded successfully!',
    'passenger.downloadQuotePdf': 'Download quote in PDF',
    'passenger.whatsappOpened': 'WhatsApp opened successfully!',
    'passenger.contactAgent': 'Talk to agent to expedite service',
    'passenger.completeService': 'Complete service',
    'passenger.thankYou': 'Thank you!',
    'passenger.quoteConcluded': 'Your quote has been completed successfully.',
    'passenger.redirecting': 'Redirecting to home page in a few seconds...',
    'passenger.distance': 'Distance',
    'passenger.additionalInfo': 'Provide additional information',
    'passenger.specialRequests': 'If you wish, you can add special requests, for example, number of bags, child seats, etc.',
    'passenger.terminalInfo': 'Terminal Information',
    'passenger.terminalPlaceholder': 'Ex: Sleeper, executive, etc.',
    'passenger.luggageCount': 'Number of Bags',
    'passenger.fullNamePlaceholder': 'Full name',
    'passenger.phonePlaceholder': '(11) 99999-9999',
    'passenger.emailPlaceholder': 'youremail@example.com',
    'passenger.additionalObservations': 'Additional Observations',
    'passenger.observationsPlaceholder': 'Special observations, special needs, etc.',
    'passenger.howItWorks': 'How finalization works:',
    'passenger.pdfGenerated': 'A PDF will be automatically generated with all details',
    'passenger.fileDownloaded': 'The file will be downloaded to your device',
    'passenger.whatsappRedirect': 'You will be redirected to Executive Premium WhatsApp',
    'passenger.attachPdfConfirm': 'Attach the downloaded PDF to the conversation to confirm the reservation',
    'passenger.finalizeReservation': 'Finalize reservation',
    'passenger.fillRequiredFields': 'Please fill in all required fields (*)',
      'passenger.additionalInfo': 'Provide additional information',
      'passenger.additionalInfoDesc': 'If desired, you can add special requests, for example, number of bags, child seats, etc.',
      'passenger.terminalInfo': 'Terminal Information',
      'passenger.luggageCount': 'Number of Bags',
      'passenger.additionalObservations': 'Additional Observations',
      'passenger.howItWorks': 'How finalization works:',
      'passenger.pdfGenerated': 'A PDF will be automatically generated with all details',
      'passenger.fileDownloaded': 'The file will be downloaded to your device',
      'passenger.whatsappRedirect': 'You will be redirected to Executive Premium WhatsApp',
      'passenger.finalizeReservation': 'Finalize reservation',
      'placeholder.flightNumber': 'Ex: G31234',
      'placeholder.terminalInfo': 'Ex: Sleeper, executive, etc.',
      'placeholder.fullName': 'Full name',
      'placeholder.email': 'youremail@example.com',
      'placeholder.observations': 'Special observations, special needs, etc.',
      'placeholder.testAddress': 'Type an address to test (ex: Guarulhos Airport)'
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
