import React, { createContext, useContext, useState } from 'react';

export type Language = 'pt';
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
