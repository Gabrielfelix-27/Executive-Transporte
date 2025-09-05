import React, { createContext, useContext, useState } from 'react';

export type Language = 'pt' | 'en' | 'es';
export type Currency = 'BRL' | 'USD';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
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
    'quote.button': 'COTAR',
    'quote.book': 'RESERVAR',
    'quote.required': 'Campos obrigatórios',
    'quote.fillFields': 'Por favor, preencha origem e destino.',
    'quote.calculated': 'Cotação calculada!',
    'quote.error': 'Erro na cotação',
    'quote.tryAgain': 'Tente novamente em alguns instantes.',
    'quote.bookingRequested': 'Reserva solicitada!',
    'quote.contactSoon': 'Entraremos em contato em breve para confirmar.',
    'quote.formTitle': 'FAÇA SUA RESERVA AGORA!',
    'quote.byDestination': 'POR DESTINO',
    'quote.byHour': 'POR HORA',
    'quote.origin': 'Origem',
    'quote.selectDate': 'Por favor, selecione data e horário',
    'quote.minAdvance': '⚠️ Atenção: Por favor, seleccione uma hora válida.',
    'quote.minAdvanceTime': '⚠️ Atenção: É necessário pelo menos 2 horas de antecedência para reservas.',
    'quote.priceError': 'Erro ao calcular preços. Tente novamente.',
    
    // Vehicle Categories
    'vehicle.economic': 'ECONÔMICO',
    'vehicle.executive': 'EXECUTIVO',
    'vehicle.luxury': 'LUXO',
    'vehicle.suv': 'SUV',
    'vehicle.economicDesc': 'Comodidad básica para viajes cortos',
    'vehicle.executiveDesc': 'Comodidad premium para executivos',
    'vehicle.luxuryDesc': 'Máximo luxo e sofisticação',
    'vehicle.suvDesc': 'Espaço e comodidade para grupos',
    
    // Features translations
    'features.firstClass': 'PRIMEIRA CLASSE',
    'features.firstClassDesc': 'Experimente o mais alto padrão em transporte premium. Sofisticação, glamour e exclusividade para clientes VIP.',
    'features.maxSecurity': 'SEGURANÇA MÁXIMA',
    'features.maxSecurityDesc': 'Proteção com veículos blindados de última geração. Motoristas especializados em segurança VIP.',
    'features.visionBeyond': 'VISÃO ALÉM',
    'features.visionBeyondDesc': 'Veículos com tetos panorâmicos e tecnologia avançada. Design inovador para uma experiência única.',
    'features.guaranteedTrip': 'VIAGEM GARANTIDA',
    'features.guaranteedTripDesc': 'Garantimos sua viagem sem cancelamentos. Serviço confiável 24 horas.',
    'features.ultraWifi': 'WI-FI ULTRA-RÁPIDO',
    'features.ultraWifiDesc': 'Conectividade premium em todos os veículos. Wi-Fi de alta velocidade para sua produtividade.',
    'features.sustainableTrip': 'VIAGEM SUSTENTÁVEL',
    'features.sustainableTripDesc': 'Frota híbrida para uma viagem sustentável. Veículos que preservam o meio ambiente.',
    
    // Services translations
    'services.title': 'NOSSOS SERVIÇOS',
    'services.subtitle': 'CONHEÇA NOSSOS SERVIÇOS PREMIUM',
    'services.onDemand': 'SOB DEMANDA',
    'services.onDemandDesc': 'Serviço personalizado para suas necessidades específicas.',
    'services.airportTransfer': 'TRANSFER PARA<br className="md:hidden" />AEROPORTO',
    'services.airportTransferDesc': 'Transporte confiável para aeroportos com conforto e pontualidade',
    'services.pointToPoint': 'PONTO A PONTO',
    'services.pointToPointDesc': 'Viagens diretas entre destinos com máximo conforto.',
    'services.business': 'CORPORATIVO',
    'services.businessDesc': 'Soluções de transporte para empresas e executivos.',
    'services.executiveProtection': 'PROTEÇÃO EXECUTIVA',
    'services.executiveProtectionDesc': 'Segurança e proteção para clientes VIP.',
    'services.exec360': 'VIP 360',
    'services.exec360Desc': 'Experiência completa de transporte premium.',
    
    // Footer translations
    'footer.company': 'EXECUTIVE',
    'footer.helpCenter': 'ACESSAR CENTRAL DE AJUDA',
    'footer.companyFull': 'Executive Premium',
    'footer.address': 'Rua Baronesa de Bela Vista, 411 - Vila Congonhas, São Paulo - SP, Brasil',
    'footer.phone': '(11) 91585-3292',
    'footer.email': 'executivetransportepremium@gmail.com',
    'footer.instagram': 'Instagram',
    'footer.aboutUs': 'SOBRE NÓS',
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
    'locations.topTitle': 'PRINCIPAIS LOCAIS',
    'locations.title': 'LOCALIDADES MAIS SOLICITADAS',
    'locations.allLocations': 'TODOS OS LOCAIS →',
    'locations.rosewood': 'HOTEL ROSEWOOD - SÃO PAULO',
    'locations.tivoli': 'TIVOLI MOFARREJ SÃO PAULO HOTEL',
    'locations.congonhas': 'AEROPORTO SÃO PAULO/CONGONHAS',
    'locations.guarulhos': 'AEROPORTO SÃO PAULO/GUARULHOS',
    
    // Testimonial translations
    'testimonial.quote': 'Viva o Premium, escolha Executive.',
    'testimonial.source': 'L\'OFFICIEL BRASIL',
    
    // Partners translations
    'partners.title': 'PARCEIROS EXECUTIVE',
    
    // Routes translations
    'routes.topTitle': 'PRINCIPAIS ROTAS',
    'routes.title': 'CONFIRA AS ROTAS',
    'routes.allRoutes': 'TODAS AS ROTAS →',
    'routes.guarulhos': 'AEROPORTO INTERNACIONAL GUARULHOS (GRU)',
    'routes.congonhas': 'AEROPORTO CONGONHAS (CGH)',
    'routes.rosewood': 'HOTEL ROSEWOOD SÃO PAULO',
    'routes.marriott': 'JW MARRIOTT SÃO PAULO',
    'routes.unique': 'HOTEL UNIQUE SÃO PAULO',
    'routes.fasano': 'HOTEL FASANO JARDINS SÃO PAULO',
    'routes.tivoliMofarrej': 'TIVOLI MOFARREJ SÃO PAULO',
    
    // NotFound translations
    'notfound.title': '404',
    'notfound.message': 'Ops! Página não encontrada',
    'notfound.home': 'Voltar ao Início',
    
    // Header translations
    'header.menu': 'MENU',
    'header.portuguese': 'PORTUGUÊS',
    'header.spanish': 'ESPAÑOL',
    'header.english': 'ENGLISH',
    'header.homepage': 'Página Inicial',
    'header.aboutUs': 'Sobre Nós',
    'header.moreOptions': 'Mais opções em breve...',
    'currency.real': 'REAL',
    'currency.dollar': 'DÓLAR',
    'hero.title': 'O SERVIÇO DE TRANSPORTE',
    'hero.subtitle': 'QUE VOCÊ PRECISA',
    'hero.description': 'Experimente o mais alto padrão em transporte premium',
    
    // VehicleSelection page
    'vehicle.pickup': 'EMBARQUE',
    'vehicle.arrival': 'CHEGADA',
    'vehicle.estimatedTime': 'Tempo estimado',
    'vehicle.from': 'DE',
    'vehicle.to': 'PARA',
    'vehicle.priceFrom': 'Preços a partir de',
    'vehicle.priceNote': 'Os preços finais podem variar de acordo com as condições específicas da viagem',
    'vehicle.up_to': 'até',
    'vehicle.passengers': 'passageiros',
    'vehicle.mediumBags': 'bagagens médias',
    'vehicle.largeBags': 'bagagens grandes',
    'vehicle.totalPrice': 'O preço total inclui impostos, pedágios e outras taxas.',
    'vehicle.benefitsTitle': 'Benefícios inclusos:',
    'vehicle.benefit1': 'Wi-Fi gratuito',
    'vehicle.benefit2': 'Motorista profissional',
    'vehicle.benefit3': 'Água gratuita',
    'vehicle.benefit4': 'Pontualidade garantida',
    'vehicle.observationsTitle': 'Observações:',
    'vehicle.observationsText': 'As capacidades de hóspedes/bagagem devem ser respeitadas por motivos de segurança. Se não tiver certeza, selecione uma classe maior, pois os motoristas podem recusar o serviço quando excedido.',
    'vehicle.terms': 'Ver termos e condições',
    'vehicle.continue': 'CONTINUAR',
    
    // Breadcrumb navigation
    'nav.serviceClass': 'Classe de serviço',
    'nav.passengerData': 'Dados do Passageiro',
    'nav.checkout': 'Finalizar',
    
    // PassengerData translations
    'passenger.dataNotFound': 'Dados não encontrados',
    'passenger.newQuote': 'Por favor, faça uma nova cotação.',
    'passenger.backHome': 'Voltar ao Início',
    'passenger.tripFor': 'PARA QUEM É ESTA VIAGEM',
    'passenger.forMe': 'Reservar para mim',
    'passenger.forOther': 'Reservar para outra pessoa',
    'passenger.executiveTransport': 'Executive Transporte Premium',
    'passenger.class': 'CLASSE:',
    'passenger.vehicle': 'VEÍCULO:',
    'passenger.pickup': 'EMBARQUE',
    'passenger.arrival': 'CHEGADA',
    'passenger.estimatedTime': 'Tempo estimado',
    'passenger.from': 'DE',
    'passenger.to': 'PARA',
    'passenger.fullName': 'Nome completo',
    'passenger.phone': 'Telefone',
    'passenger.email': 'E-mail',
    'passenger.flightNumber': 'Número do voo',
    'passenger.plateName': 'Nome na placa',
    'passenger.luggageCount': 'Número de bagagens',
    'passenger.additionalInfo': 'Informações adicionais',
    'passenger.personalInfo': 'INFORMAÇÕES PESSOAIS',
    'passenger.flightDetails': 'DETALHES DO VOO',
    'passenger.terminalDetails': 'DETALHES DO TERMINAL',
    'passenger.observations': 'Observações',
    'passenger.optional': 'Opcional',
    'passenger.finishReservation': 'FINALIZAR RESERVA VIA WHATSAPP',
    'passenger.reservationProcessed': 'Sua reserva foi processada com sucesso!',
    'passenger.pdfDownloaded': 'PDF baixado com sucesso!',
    'passenger.downloadQuotePdf': 'Baixar cotação em PDF',
    'passenger.whatsappOpened': 'WhatsApp aberto com sucesso!',
    'passenger.contactAgent': 'Contatar agente para agilizar o serviço',
    'passenger.completeService': 'Completar serviço',
    'passenger.thankYou': 'Obrigado!',
    'passenger.quoteConcluded': 'Sua cotação foi concluída com sucesso.',
    'passenger.redirecting': 'Redirecionando para a página inicial em alguns segundos...',
    'passenger.distance': 'Distância',
    'passenger.specialRequests': 'Se desejar, pode adicionar solicitações especiais, por exemplo, número de bagagens, assentos para crianças, etc.',
    'passenger.terminalInfo': 'Informações do Terminal',
    'passenger.terminalPlaceholder': 'Ex: Leito, executivo, etc.',
    'passenger.fullNamePlaceholder': 'Nome completo',
    'passenger.phonePlaceholder': '(11) 99999-9999',
    'passenger.emailPlaceholder': 'seuemail@exemplo.com',
    'passenger.additionalObservations': 'Observações Adicionais',
    'passenger.observationsPlaceholder': 'Observações especiais, necessidades especiais, etc.',
    'passenger.howItWorks': 'Como funciona a finalização:',
    'passenger.pdfGenerated': 'Será gerado automaticamente um PDF com todos os detalhes',
    'passenger.fileDownloaded': 'O arquivo será baixado em seu dispositivo',
    'passenger.whatsappRedirect': 'Você será redirecionado para o WhatsApp da Executive Premium',
    'passenger.attachPdfConfirm': 'Anexe o PDF baixado na conversa para confirmar a reserva',
    'passenger.finalizeReservation': 'Finalizar reserva',
    'passenger.fillRequiredFields': 'Por favor, preencha todos os campos obrigatórios (*)',
    'passenger.additionalInfoDesc': 'Se desejar, pode adicionar solicitações especiais, por exemplo, número de bagagens, assentos para crianças, etc.',
    
    // Date formatting
    'date.of': 'DE',
    
    // Days of the week
    'date.sunday': 'Domingo',
    'date.monday': 'Segunda-feira',
    'date.tuesday': 'Terça-feira',
    'date.wednesday': 'Quarta-feira',
    'date.thursday': 'Quinta-feira',
    'date.friday': 'Sexta-feira',
    'date.saturday': 'Sábado',
    
    // Months
    'date.january': 'Janeiro',
    'date.february': 'Fevereiro',
    'date.march': 'Março',
    'date.april': 'Abril',
    'date.may': 'Maio',
    'date.june': 'Junho',
    'date.july': 'Julho',
    'date.august': 'Agosto',
    'date.september': 'Setembro',
    'date.october': 'Outubro',
    'date.november': 'Novembro',
    'date.december': 'Dezembro',
    
    // About Us translations
    'about.title': 'Sobre Nós',
    'about.description1': 'A Executive Premium é uma empresa especializada em transporte de luxo, oferecendo serviços premium para clientes exigentes. Nossa empresa se destaca pela pontualidade, conforto e segurança em todos os serviços.',
    'about.description2': 'Nossa frota inclui veículos de última geração operados por motoristas altamente qualificados. Oferecemos atendimento personalizado 24 horas para diversas necessidades de transporte.',
    'about.description3': 'Especializados em transporte premium, oferecemos uma experiência incomparável para nossos clientes. Conte com a Executive Premium para suas necessidades de transporte de luxo.',
    
    // Additional translations for hardcoded texts
    'trip.summary': 'Resumo da Viagem',
    'trip.origin': 'Origem',
    'trip.destination': 'Destino',
    'trip.dateTime': 'Data e Hora',
    'trip.dateAndTime': 'Data e Horário',
    'trip.distance': 'Distância',
    'trip.originNotInformed': 'Origem não informada',
    'trip.destinationNotInformed': 'Destino não informado',
    'trip.originAddressNotInformed': 'Endereço de origem não informado',
    'trip.destinationAddressNotInformed': 'Endereço de destino não informado',
    
    // Form and interface texts
    'form.typeAddress': 'Digite um endereço...',
    'form.chooseOption': 'Escolha uma das opções abaixo para continuar:',
    'form.attachPdf': 'Anexe o PDF baixado na conversa para confirmar a reserva',
    
    // Placeholders
    'placeholder.flightNumber': 'Ex: G31234',
    'placeholder.terminalInfo': 'Ex: Leito, executivo, etc.',
    'placeholder.fullName': 'Nome completo',
    'placeholder.email': 'seuemail@exemplo.com',
    'placeholder.observations': 'Observações especiais, necessidades especiais, etc.',
    'placeholder.testAddress': 'Digite um endereço para testar (ex: Aeroporto Guarulhos)'
  },
  en: {
    // QuoteForm translations
    'quote.title': 'QUOTE BY DESTINATION',
    'quote.pickup': 'Origin: address, airport, hotel',
    'quote.destination': 'Destination: address, airport, hotel',
    'quote.date': 'Date',
    'quote.time': 'Time',
    'quote.passengers': 'Number of passengers',
    'quote.button': 'QUOTE',
    'quote.book': 'BOOK',
    'quote.required': 'Required fields',
    'quote.fillFields': 'Please fill in origin and destination.',
    'quote.calculated': 'Quote calculated!',
    'quote.error': 'Quote error',
    'quote.tryAgain': 'Please try again in a few moments.',
    'quote.bookingRequested': 'Booking requested!',
    'quote.contactSoon': 'We will contact you soon to confirm.',
    'quote.formTitle': 'MAKE YOUR RESERVATION NOW!',
    'quote.byDestination': 'BY DESTINATION',
    'quote.byHour': 'BY HOUR',
    'quote.origin': 'Origin',
    'quote.selectDate': 'Please select date and time',
    'quote.minAdvance': '⚠️ Attention: Please select a valid time.',
    'quote.minAdvanceTime': '⚠️ Attention: At least 2 hours advance notice is required for bookings.',
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
    'features.firstClassDesc': 'Experience the highest standard in premium transportation. Sophistication, glamour and exclusivity for VIP clients.',
    'features.maxSecurity': 'MAXIMUM SECURITY',
    'features.maxSecurityDesc': 'Protection with state-of-the-art armored vehicles. Drivers specialized in VIP security.',
    'features.visionBeyond': 'VISION BEYOND',
    'features.visionBeyondDesc': 'Vehicles with panoramic roofs and advanced technology. Innovative design for a unique experience.',
    'features.guaranteedTrip': 'GUARANTEED TRIP',
    'features.guaranteedTripDesc': 'We guarantee your trip without cancellations. Reliable 24-hour service.',
    'features.ultraWifi': 'ULTRA-FAST WI-FI',
    'features.ultraWifiDesc': 'Premium connectivity in all vehicles. High-speed Wi-Fi for your productivity.',
    'features.sustainableTrip': 'SUSTAINABLE TRIP',
    'features.sustainableTripDesc': 'Hybrid fleet for a sustainable trip. Vehicles that preserve the environment.',
    
    // Services translations
    'services.title': 'OUR SERVICES',
    'services.subtitle': 'DISCOVER OUR PREMIUM SERVICES',
    'services.onDemand': 'ON DEMAND',
    'services.onDemandDesc': 'Personalized service for your specific needs.',
    'services.airportTransfer': 'AIRPORT TRANSFER',
    'services.airportTransferDesc': 'Reliable transportation to airports with comfort and punctuality.',
    'services.pointToPoint': 'POINT TO POINT',
    'services.pointToPointDesc': 'Direct trips between destinations with maximum comfort.',
    'services.business': 'BUSINESS',
    'services.businessDesc': 'Transportation solutions for companies and executives.',
    'services.executiveProtection': 'EXECUTIVE PROTECTION',
    'services.executiveProtectionDesc': 'Security and protection for VIP clients.',
    'services.exec360': 'VIP 360',
    'services.exec360Desc': 'Complete premium transportation experience.',
    
    // Footer translations
    'footer.company': 'EXECUTIVE',
    'footer.helpCenter': 'ACCESS HELP CENTER',
    'footer.companyFull': 'Executive Premium',
    'footer.address': 'Rua Baronesa de Bela Vista, 411 - Vila Congonhas, São Paulo - SP, Brazil',
    'footer.phone': '(11) 91585-3292',
    'footer.email': 'executivetransportepremium@gmail.com',
    'footer.instagram': 'Instagram',
    'footer.aboutUs': 'ABOUT US',
    'footer.workWithUs': 'WORK WITH US',
    'footer.routes': 'ROUTES',
    'footer.cities': 'CITIES',
    'footer.services': 'SERVICES',
    'footer.copyright': '2025 © Executive Transporte Premium',
    'footer.developedBy': 'Developed by Dreamsetfilms',
    'footer.privacy': 'PRIVACY',
    'footer.accessibility': 'ACCESSIBILITY',
    'footer.terms': 'TERMS',
    'footer.location': 'SÃO PAULO',
    
    // Locations translations
    'locations.topTitle': 'TOP LOCATIONS',
    'locations.title': 'MOST REQUESTED LOCATIONS',
    'locations.allLocations': 'ALL LOCATIONS →',
    'locations.rosewood': 'HOTEL ROSEWOOD - SÃO PAULO',
    'locations.tivoli': 'TIVOLI MOFARREJ SÃO PAULO HOTEL',
    'locations.congonhas': 'SÃO PAULO/CONGONHAS AIRPORT',
    'locations.guarulhos': 'SÃO PAULO/GUARULHOS AIRPORT',
    
    // Testimonial translations
    'testimonial.quote': 'Live Premium, choose Executive.',
    'testimonial.source': 'L\'OFFICIEL BRASIL',
    
    // Partners translations
    'partners.title': 'EXECUTIVE PARTNERS',
    
    // Routes translations
    'routes.topTitle': 'TOP ROUTES',
    'routes.title': 'CHECK THE ROUTES',
    'routes.allRoutes': 'ALL ROUTES →',
    'routes.guarulhos': 'GUARULHOS INTERNACIONAL AIRPORT (GRU)',
    'routes.congonhas': 'CONGONHAS AIRPORT (CGH)',
    'routes.rosewood': 'HOTEL ROSEWOOD SÃO PAULO',
    'routes.marriott': 'JW MARRIOTT SÃO PAULO',
    'routes.unique': 'HOTEL UNIQUE SÃO PAULO',
    'routes.fasano': 'HOTEL FASANO JARDINS SÃO PAULO',
    'routes.tivoliMofarrej': 'TIVOLI MOFARREJ SÃO PAULO',
    
    // NotFound translations
    'notfound.title': '404',
    'notfound.message': 'Oops! Page not found',
    'notfound.home': 'Back to Home',
    
    // Header translations
    'header.menu': 'MENU',
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
    'hero.description': 'Experience the highest standard in premium transportation',
    
    // VehicleSelection page
    'vehicle.pickup': 'PICKUP',
    'vehicle.arrival': 'ARRIVAL',
    'vehicle.estimatedTime': 'Estimated time',
    'vehicle.from': 'FROM',
    'vehicle.to': 'TO',
    'vehicle.priceFrom': 'Prices from',
    'vehicle.priceNote': 'Final prices may vary according to specific trip conditions',
    'vehicle.up_to': 'up to',
    'vehicle.passengers': 'passengers',
    'vehicle.mediumBags': 'medium bags',
    'vehicle.largeBags': 'large bags',
    'vehicle.totalPrice': 'Total price includes taxes, tolls and other fees.',
    'vehicle.benefitsTitle': 'Included benefits:',
    'vehicle.benefit1': 'Free Wi-Fi',
    'vehicle.benefit2': 'Professional driver',
    'vehicle.benefit3': 'Free water',
    'vehicle.benefit4': 'Guaranteed punctuality',
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
    'passenger.luggageCount': 'Number of luggage',
    'passenger.additionalInfo': 'Additional information',
    'passenger.personalInfo': 'PERSONAL INFORMATION',
    'passenger.flightDetails': 'FLIGHT DETAILS',
    'passenger.terminalDetails': 'TERMINAL DETAILS',
    'passenger.observations': 'Observations',
    'passenger.optional': 'Optional',
    'passenger.finishReservation': 'FINISH RESERVATION VIA WHATSAPP',
    'passenger.reservationProcessed': 'Your reservation has been processed successfully!',
    'passenger.pdfDownloaded': 'PDF downloaded successfully!',
    'passenger.downloadQuotePdf': 'Download quote PDF',
    'passenger.whatsappOpened': 'WhatsApp opened successfully!',
    'passenger.contactAgent': 'Contact agent to expedite service',
    'passenger.completeService': 'Complete service',
    'passenger.thankYou': 'Thank you!',
    'passenger.quoteConcluded': 'Your quote has been completed successfully.',
    'passenger.redirecting': 'Redirecting to homepage in a few seconds...',
    'passenger.distance': 'Distance',
    'passenger.specialRequests': 'If desired, you can add special requests, for example, number of luggage, child seats, etc.',
    'passenger.terminalInfo': 'Terminal Information',
    'passenger.terminalPlaceholder': 'Ex: Bed, executive, etc.',
    'passenger.fullNamePlaceholder': 'Full name',
    'passenger.phonePlaceholder': '(11) 99999-9999',
    'passenger.emailPlaceholder': 'youremail@example.com',
    'passenger.additionalObservations': 'Additional Observations',
    'passenger.observationsPlaceholder': 'Special observations, special needs, etc.',
    'passenger.howItWorks': 'How finalization works:',
    'passenger.pdfGenerated': 'A PDF with all details will be automatically generated',
    'passenger.fileDownloaded': 'The file will be downloaded to your device',
    'passenger.whatsappRedirect': 'You will be redirected to Executive Premium WhatsApp',
    'passenger.attachPdfConfirm': 'Attach the downloaded PDF to the conversation to confirm the reservation',
    'passenger.finalizeReservation': 'Finalize reservation',
    'passenger.fillRequiredFields': 'Por favor, complete todos los campos obligatorios (*)',
    'passenger.additionalInfoDesc': 'Si lo desea, puede agregar solicitudes especiales, por ejemplo, número de equipajes, asientos para niños, etc.',
    
    // Date formatting
    'date.of': 'OF',
    
    // Days of the week
    'date.sunday': 'Sunday',
    'date.monday': 'Monday',
    'date.tuesday': 'Tuesday',
    'date.wednesday': 'Wednesday',
    'date.thursday': 'Thursday',
    'date.friday': 'Friday',
    'date.saturday': 'Saturday',
    
    // Months
    'date.january': 'January',
    'date.february': 'February',
    'date.march': 'March',
    'date.april': 'April',
    'date.may': 'May',
    'date.june': 'June',
    'date.july': 'July',
    'date.august': 'August',
    'date.september': 'September',
    'date.october': 'October',
    'date.november': 'November',
    'date.december': 'December',
    
    // About Us translations
    'about.title': 'About Us',
    'about.description1': 'Executive Premium is a company specialized in luxury transportation, offering premium services for demanding clients. Our company stands out for punctuality, comfort and security in all services.',
    'about.description2': 'Our fleet includes state-of-the-art vehicles operated by highly qualified drivers. We offer personalized 24-hour service for various transportation needs.',
    'about.description3': 'Specialized in premium transportation, we offer an unparalleled experience for our clients. Count on Executive Premium for your luxury transportation needs.',
    
    // Additional translations for hardcoded texts
    'trip.summary': 'Trip Summary',
    'trip.origin': 'Origin',
    'trip.destination': 'Destination',
    'trip.dateTime': 'Date and Time',
    'trip.dateAndTime': 'Date and Time',
    'trip.distance': 'Distance',
    'trip.originNotInformed': 'Origin not informed',
    'trip.destinationNotInformed': 'Destination not informed',
    'trip.originAddressNotInformed': 'Origin address not informed',
    'trip.destinationAddressNotInformed': 'Destination address not informed',
    
    // Form and interface texts
    'form.typeAddress': 'Type an address...',
    'form.chooseOption': 'Choose one of the options below to continue:',
    'form.attachPdf': 'Attach the downloaded PDF to the conversation to confirm the reservation',
    
    // Placeholders
    'placeholder.flightNumber': 'Ex: G31234',
    'placeholder.terminalInfo': 'Ex: Bed, executive, etc.',
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
