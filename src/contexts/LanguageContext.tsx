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
    'vehicle.suvDesc': 'Espaço e comodidade para grupos',
    
    // Features translations
    'features.firstClass': 'PRIMEIRA CLASSE',
    'features.firstClassDesc': 'Experimente o mais alto padrão em transporte privado. Sofisticação, glamour e exclusividade para quem exige um serviço impecável em cada detalhe.',
    'features.maxSecurity': 'MÁXIMA SEGURANÇA',
    'features.maxSecurityDesc': 'Viaje com confiança sabendo que sua segurança é nossa prioridade número 1. Carros blindados e motoristas minuciosamente selecionados e treinados.',
    'features.visionBeyond': 'VISÃO ALÉM',
    'features.visionBeyondDesc': 'Desfrute de vistas deslumbrantes com nossos tetos panorâmicos. Design inovador e tecnologia que enriquecem e elevam sua experiência de viagem.',
    'features.guaranteedTrip': 'VIAGEM GARANTIDA',
    'features.guaranteedTripDesc': 'Garantimos sua viagem sem cancelamentos. Nossos motoristas sempre realizarão todas as corridas, garantindo que nosso serviço seja sempre confiável.',
    'features.ultraWifi': 'WI-FI ULTRA-RÁPIDO',
    'features.ultraWifiDesc': 'Mantenha-se online sem preocupações. Nosso Wi-Fi de alta velocidade em todos os veículos garante uma experiência ininterrupta.',
    'features.sustainableTrip': 'VIAGEM SUSTENTÁVEL',
    'features.sustainableTripDesc': 'Frota híbrida de luxo sustentável, nossos carros híbridos unem sofisticação, conforto e exclusividade, preservando o meio ambiente em cada viagem.',
    
    // Services translations
    'services.title': 'VEÍCULOS BLINDADOS DE LUXO',
    'services.subtitle': 'OS SERVIÇOS MAIS ESCOLHIDOS',
    'services.onDemand': 'SERVIÇO SOB DEMANDA',
    'services.onDemandDesc': 'Motoristas inteiramente exclusivos para atender suas demandas.',
    'services.airportTransfer': 'TRANSFER AEROPORTO',
    'services.airportTransferDesc': 'Seu tempo é precioso e seu conforto é fundamental.',
    'services.pointToPoint': 'PONTO A PONTO',
    'services.pointToPointDesc': 'Sua solução de conforto e luxo para viagens de longa distância.',
    'services.business': 'BUSINESS',
    'services.businessDesc': 'Produtividade no trânsito? Trabalhe com luxo e conforto enquanto viaja.',
    'services.executiveProtection': 'PROTEÇÃO EXECUTIVA',
    'services.executiveProtectionDesc': 'Segurança para sua proteção com discrição e sofisticação.',
    'services.exec360': 'EXEC360',
    'services.exec360Desc': 'Da mobilidade ao lazer. Seja Executive e exclusivo em tudo.',
    
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
    'testimonial.quote': 'TRANSFORMANDO CADA VIAGEM EM\nUMA EXPERIÊNCIA DE PRIMEIRA CLASSE!',
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
    'hero.description': 'Experimente o mais alto padrão em transporte executivo premium',
    
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
    
    // About Us translations
    'about.title': 'Sobre Nós',
    'about.description1': 'Na Executive Transporte Premium, oferecemos uma experiência de mobilidade sofisticada e confiável para pessoas e empresas exigentes. Operamos em São Paulo com foco em pontualidade, conforto e segurança, seja para compromissos corporativos, eventos, transfers executivos ou momentos especiais.',
    'about.description2': 'Contamos com uma equipe de motoristas altamente qualificados, frota premium e atendimento personalizado, ideal para quem busca profissionalismo em cada viagem.',
    'about.description3': 'Seja para viagens de negócios, recepção executiva, transfers para aeroporto ou tours personalizados, conte com a Executive para proporcionar uma viagem que atenda às suas necessidades.',
    
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
    'features.firstClassDesc': 'Experience the highest standard in private transportation. Sophistication, glamour and exclusivity for those who demand impeccable service in every detail.',
    'features.maxSecurity': 'MAXIMUM SECURITY',
    'features.maxSecurityDesc': 'Travel with confidence knowing your safety is our number 1 priority. Armored cars and meticulously selected and trained drivers.',
    'features.visionBeyond': 'VISION BEYOND',
    'features.visionBeyondDesc': 'Enjoy stunning views with our panoramic roofs. Innovative design and technology that enrich and elevate your travel experience.',
    'features.guaranteedTrip': 'GUARANTEED TRIP',
    'features.guaranteedTripDesc': 'We guarantee your trip without cancellations. Our drivers will always complete all rides, ensuring our service is always reliable.',
    'features.ultraWifi': 'ULTRA-FAST WI-FI',
    'features.ultraWifiDesc': 'Stay online without worries. Our high-speed Wi-Fi in all vehicles ensures an uninterrupted experience.',
    'features.sustainableTrip': 'SUSTAINABLE TRIP',
    'features.sustainableTripDesc': 'Sustainable luxury hybrid fleet, our hybrid cars combine sophistication, comfort and exclusivity, preserving the environment on every trip.',
    
    // Services translations
    'services.title': 'LUXURY ARMORED VEHICLES',
    'services.subtitle': 'THE MOST CHOSEN SERVICES',
    'services.onDemand': 'ON-DEMAND SERVICE',
    'services.onDemandDesc': 'Entirely exclusive drivers to meet your demands.',
    'services.airportTransfer': 'AIRPORT TRANSFER',
    'services.airportTransferDesc': 'Your time is precious and your comfort is fundamental.',
    'services.pointToPoint': 'POINT TO POINT',
    'services.pointToPointDesc': 'Your comfort and luxury solution for long-distance travel.',
    'services.business': 'BUSINESS',
    'services.businessDesc': 'Productivity in traffic? Work with luxury and comfort while traveling.',
    'services.executiveProtection': 'EXECUTIVE PROTECTION',
    'services.executiveProtectionDesc': 'Security for your protection with discretion and sophistication.',
    'services.exec360': 'EXEC360',
    'services.exec360Desc': 'From mobility to leisure. Be Executive and exclusive in everything.',
    
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
    'testimonial.quote': 'TRANSFORMING EVERY TRIP INTO\nA FIRST CLASS EXPERIENCE!',
    'testimonial.source': 'L\'OFFICIEL BRASIL',
    
    // Partners translations
    'partners.title': 'EXECUTIVE PARTNERS',
    
    // Routes translations
    'routes.topTitle': 'TOP ROUTES',
    'routes.title': 'CHECK THE ROUTES',
    'routes.allRoutes': 'ALL ROUTES →',
    'routes.guarulhos': 'GUARULHOS INTERNATIONAL AIRPORT (GRU)',
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
    'hero.description': 'Experience the highest standard in premium executive transportation',
    
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
    'passenger.fillRequiredFields': 'Please fill in all required fields (*)',
    'passenger.additionalInfoDesc': 'If desired, you can add special requests, for example, number of luggage, child seats, etc.',
    
    // Date formatting
    'date.of': 'OF',
    
    // About Us translations
    'about.title': 'About Us',
    'about.description1': 'At Executive Transporte Premium, we offer a sophisticated and reliable mobility experience for demanding people and companies. We operate in São Paulo with a focus on punctuality, comfort and safety, whether for corporate appointments, events, executive transfers or special moments.',
    'about.description2': 'We have a team of highly qualified drivers, premium fleet and personalized service, ideal for those seeking professionalism in every trip.',
    'about.description3': 'Whether for business trips, executive reception, airport transfers or personalized tours, count on Executive to provide a trip that meets your needs.',
    
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
  },
  es: {
    // QuoteForm translations
    'quote.title': 'COTIZACIÓN POR DESTINO',
    'quote.pickup': 'Origen: dirección, aeropuerto, hotel',
    'quote.destination': 'Destino: dirección, aeropuerto, hotel',
    'quote.date': 'Fecha',
    'quote.time': 'Hora',
    'quote.passengers': 'Número de pasajeros',
    'quote.button': 'COTIZAR',
    'quote.book': 'RESERVAR',
    'quote.required': 'Campos obligatorios',
    'quote.fillFields': 'Por favor, complete origen y destino.',
    'quote.calculated': '¡Cotización calculada!',
    'quote.error': 'Error en la cotización',
    'quote.tryAgain': 'Inténtelo de nuevo en unos momentos.',
    'quote.bookingRequested': '¡Reserva solicitada!',
    'quote.contactSoon': 'Nos pondremos en contacto pronto para confirmar.',
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
    'vehicle.economicDesc': 'Comodidad básica para viajes cortos',
    'vehicle.executiveDesc': 'Comodidad premium para ejecutivos',
    'vehicle.luxuryDesc': 'Máximo lujo y sofisticación',
    'vehicle.suvDesc': 'Espacio y comodidad para grupos',
    
    // Features translations
    'features.firstClass': 'PRIMERA CLASE',
    'features.firstClassDesc': 'Experimente el más alto estándar en transporte privado. Sofisticación, glamour y exclusividad para quienes exigen un servicio impecable en cada detalle.',
    'features.maxSecurity': 'MÁXIMA SEGURIDAD',
    'features.maxSecurityDesc': 'Viaje con confianza sabiendo que su seguridad es nuestra prioridad número 1. Autos blindados y conductores minuciosamente seleccionados y entrenados.',
    'features.visionBeyond': 'VISIÓN MÁS ALLÁ',
    'features.visionBeyondDesc': 'Disfrute de vistas impresionantes con nuestros techos panorámicos. Diseño innovador y tecnología que enriquecen y elevan su experiencia de viaje.',
    'features.guaranteedTrip': 'VIAJE GARANTIZADO',
    'features.guaranteedTripDesc': 'Garantizamos su viaje sin cancelaciones. Nuestros conductores siempre realizarán todos los viajes, asegurando que nuestro servicio sea siempre confiable.',
    'features.ultraWifi': 'WI-FI ULTRA-RÁPIDO',
    'features.ultraWifiDesc': 'Manténgase en línea sin preocupaciones. Nuestro Wi-Fi de alta velocidad en todos los vehículos garantiza una experiencia ininterrumpida.',
    'features.sustainableTrip': 'VIAJE SOSTENIBLE',
    'features.sustainableTripDesc': 'Flota híbrida de lujo sostenible, nuestros autos híbridos unen sofisticación, comodidad y exclusividad, preservando el medio ambiente en cada viaje.',
    
    // Services translations
    'services.title': 'VEHÍCULOS BLINDADOS DE LUJO',
    'services.subtitle': 'LOS SERVICIOS MÁS ELEGIDOS',
    'services.onDemand': 'SERVICIO BAJO DEMANDA',
    'services.onDemandDesc': 'Conductores enteramente exclusivos para atender sus demandas.',
    'services.airportTransfer': 'TRANSFER AEROPUERTO',
    'services.airportTransferDesc': 'Su tiempo es precioso y su comodidad es fundamental.',
    'services.pointToPoint': 'PUNTO A PUNTO',
    'services.pointToPointDesc': 'Su solución de comodidad y lujo para viajes de larga distancia.',
    'services.business': 'BUSINESS',
    'services.businessDesc': '¿Productividad en el tráfico? Trabaje con lujo y comodidad mientras viaja.',
    'services.executiveProtection': 'PROTECCIÓN EJECUTIVA',
    'services.executiveProtectionDesc': 'Seguridad para su protección con discreción y sofisticación.',
    'services.exec360': 'EXEC360',
    'services.exec360Desc': 'De la movilidad al ocio. Sea Executive y exclusivo en todo.',
    
    // Footer translations
    'footer.company': 'EXECUTIVE',
    'footer.helpCenter': 'ACCEDER CENTRO DE AYUDA',
    'footer.companyFull': 'Executive Premium',
    'footer.address': 'Rua Baronesa de Bela Vista, 411 - Vila Congonhas, São Paulo - SP, Brasil',
    'footer.phone': '(11) 91585-3292',
    'footer.email': 'executivetransportepremium@gmail.com',
    'footer.instagram': 'Instagram',
    'footer.aboutUs': 'SOBRE NOSOTROS',
    'footer.workWithUs': 'TRABAJE CON NOSOTROS',
    'footer.routes': 'RUTAS',
    'footer.cities': 'CIUDADES',
    'footer.services': 'SERVICIOS',
    'footer.copyright': '2025 © Executive Transporte Premium',
    'footer.developedBy': 'Desarrollado por Dreamsetfilms',
    'footer.privacy': 'PRIVACIDAD',
    'footer.accessibility': 'ACCESIBILIDAD',
    'footer.terms': 'TÉRMINOS',
    'footer.location': 'SÃO PAULO',
    
    // Locations translations
    'locations.topTitle': 'PRINCIPALES LUGARES',
    'locations.title': 'LOCALIDADES MÁS SOLICITADAS',
    'locations.allLocations': 'TODOS LOS LUGARES →',
    'locations.rosewood': 'HOTEL ROSEWOOD - SÃO PAULO',
    'locations.tivoli': 'TIVOLI MOFARREJ SÃO PAULO HOTEL',
    'locations.congonhas': 'AEROPUERTO SÃO PAULO/CONGONHAS',
    'locations.guarulhos': 'AEROPUERTO SÃO PAULO/GUARULHOS',
    
    // Testimonial translations
    'testimonial.quote': 'TRANSFORMANDO CADA VIAJE EN\n¡UNA EXPERIENCIA DE PRIMERA CLASE!',
    'testimonial.source': 'L\'OFFICIEL BRASIL',
    
    // Partners translations
    'partners.title': 'SOCIOS EXECUTIVE',
    
    // Routes translations
    'routes.topTitle': 'PRINCIPALES RUTAS',
    'routes.title': 'CONSULTE LAS RUTAS',
    'routes.allRoutes': 'TODAS LAS RUTAS →',
    'routes.guarulhos': 'AEROPUERTO INTERNACIONAL GUARULHOS (GRU)',
    'routes.congonhas': 'AEROPUERTO CONGONHAS (CGH)',
    'routes.rosewood': 'HOTEL ROSEWOOD SÃO PAULO',
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
    'header.homepage': 'Página de Inicio',
    'header.aboutUs': 'Sobre Nosotros',
    'header.moreOptions': 'Más opciones próximamente...',
    'currency.real': 'REAL',
    'currency.dollar': 'DÓLAR',
    'hero.title': 'EL SERVICIO DE TRANSPORTE',
    'hero.subtitle': 'QUE NECESITAS',
    'hero.description': 'Experimente el más alto estándar en transporte ejecutivo premium',
    
    // VehicleSelection page
    'vehicle.pickup': 'EMBARQUE',
    'vehicle.arrival': 'LLEGADA',
    'vehicle.estimatedTime': 'Tiempo estimado',
    'vehicle.from': 'DE',
    'vehicle.to': 'PARA',
    'vehicle.priceFrom': 'Precios desde',
    'vehicle.priceNote': 'Los precios finales pueden variar según las condiciones específicas del viaje',
    'vehicle.up_to': 'hasta',
    'vehicle.passengers': 'pasajeros',
    'vehicle.mediumBags': 'equipajes medianos',
    'vehicle.largeBags': 'equipajes grandes',
    'vehicle.totalPrice': 'El precio total incluye impuestos, peajes y otras tasas.',
    'vehicle.benefitsTitle': 'Beneficios incluidos:',
    'vehicle.benefit1': 'Wi-Fi gratuito',
    'vehicle.benefit2': 'Conductor profesional',
    'vehicle.benefit3': 'Agua gratuita',
    'vehicle.benefit4': 'Puntualidad garantizada',
    'vehicle.observationsTitle': 'Observaciones:',
    'vehicle.observationsText': 'Las capacidades de huéspedes/equipaje deben respetarse por razones de seguridad. Si no está seguro, seleccione una clase mayor, ya que los conductores pueden rechazar el servicio cuando se exceda.',
    'vehicle.terms': 'Ver términos y condiciones',
    'vehicle.continue': 'CONTINUAR',
    
    // Breadcrumb navigation
    'nav.serviceClass': 'Clase de Servicio',
    'nav.passengerData': 'Datos del Pasajero',
    'nav.checkout': 'Finalizar',
    
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
    'passenger.pickup': 'EMBARQUE',
    'passenger.arrival': 'LLEGADA',
    'passenger.estimatedTime': 'Tiempo estimado',
    'passenger.from': 'DE',
    'passenger.to': 'PARA',
    'passenger.fullName': 'Nombre completo',
    'passenger.phone': 'Teléfono',
    'passenger.email': 'Email',
    'passenger.flightNumber': 'Número de vuelo',
    'passenger.plateName': 'Nombre en la placa',
    'passenger.luggageCount': 'Número de equipajes',
    'passenger.additionalInfo': 'Información adicional',
    'passenger.personalInfo': 'INFORMACIÓN PERSONAL',
    'passenger.flightDetails': 'DETALLES DEL VUELO',
    'passenger.terminalDetails': 'DETALLES DEL TERMINAL',
    'passenger.observations': 'Observaciones',
    'passenger.optional': 'Opcional',
    'passenger.finishReservation': 'FINALIZAR RESERVA VÍA WHATSAPP',
    'passenger.reservationProcessed': '¡Su reserva ha sido procesada con éxito!',
    'passenger.pdfDownloaded': '¡PDF descargado con éxito!',
    'passenger.downloadQuotePdf': 'Descargar cotización en PDF',
    'passenger.whatsappOpened': '¡WhatsApp abierto con éxito!',
    'passenger.contactAgent': 'Contactar agente para agilizar el servicio',
    'passenger.completeService': 'Completar servicio',
    'passenger.thankYou': '¡Gracias!',
    'passenger.quoteConcluded': 'Su cotización ha sido completada con éxito.',
    'passenger.redirecting': 'Redirigiendo a la página de inicio en unos segundos...',
    'passenger.distance': 'Distancia',
    'passenger.specialRequests': 'Si lo desea, puede agregar solicitudes especiales, por ejemplo, número de equipajes, asientos para niños, etc.',
    'passenger.terminalInfo': 'Información del Terminal',
    'passenger.terminalPlaceholder': 'Ej: Cama, ejecutivo, etc.',
    'passenger.fullNamePlaceholder': 'Nombre completo',
    'passenger.phonePlaceholder': '(11) 99999-9999',
    'passenger.emailPlaceholder': 'suemail@ejemplo.com',
    'passenger.additionalObservations': 'Observaciones Adicionales',
    'passenger.observationsPlaceholder': 'Observaciones especiales, necesidades especiales, etc.',
    'passenger.howItWorks': 'Cómo funciona la finalización:',
    'passenger.pdfGenerated': 'Se generará automáticamente un PDF con todos los detalles',
    'passenger.fileDownloaded': 'El archivo se descargará en su dispositivo',
    'passenger.whatsappRedirect': 'Será redirigido al WhatsApp de Executive Premium',
    'passenger.attachPdfConfirm': 'Adjunte el PDF descargado en la conversación para confirmar la reserva',
    'passenger.finalizeReservation': 'Finalizar reserva',
    'passenger.fillRequiredFields': 'Por favor, complete todos los campos obligatorios (*)',
    'passenger.additionalInfoDesc': 'Si lo desea, puede agregar solicitudes especiales, por ejemplo, número de equipajes, asientos para niños, etc.',
    
    // Date formatting
    'date.of': 'DE',
    
    // About Us translations
    'about.title': 'Sobre Nosotros',
    'about.description1': 'En Executive Transporte Premium, ofrecemos una experiencia de movilidad sofisticada y confiable para personas y empresas exigentes. Operamos en São Paulo con enfoque en puntualidad, comodidad y seguridad, ya sea para citas corporativas, eventos, transfers ejecutivos o momentos especiales.',
    'about.description2': 'Contamos con un equipo de conductores altamente calificados, flota premium y atención personalizada, ideal para quienes buscan profesionalismo en cada viaje.',
    'about.description3': 'Ya sea para viajes de negocios, recepción ejecutiva, transfers al aeropuerto o tours personalizados, cuente con Executive para proporcionar un viaje que satisfaga sus necesidades.',
    
    // Additional translations for hardcoded texts
    'trip.summary': 'Resumen del Viaje',
    'trip.origin': 'Origen',
    'trip.destination': 'Destino',
    'trip.dateTime': 'Fecha y Hora',
    'trip.dateAndTime': 'Fecha y Hora',
    'trip.distance': 'Distancia',
    'trip.originNotInformed': 'Origen no informado',
    'trip.destinationNotInformed': 'Destino no informado',
    'trip.originAddressNotInformed': 'Dirección de origen no informada',
    'trip.destinationAddressNotInformed': 'Dirección de destino no informada',
    
    // Form and interface texts
    'form.typeAddress': 'Escriba una dirección...',
    'form.chooseOption': 'Elija una de las opciones a continuación para continuar:',
    'form.attachPdf': 'Adjunte el PDF descargado en la conversación para confirmar la reserva',
    
    // Placeholders
    'placeholder.flightNumber': 'Ej: G31234',
    'placeholder.terminalInfo': 'Ej: Cama, ejecutivo, etc.',
    'placeholder.fullName': 'Nombre completo',
    'placeholder.email': 'suemail@ejemplo.com',
    'placeholder.observations': 'Observaciones especiales, necesidades especiales, etc.',
    'placeholder.testAddress': 'Escriba una dirección para probar (ej: Aeropuerto Guarulhos)'
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
