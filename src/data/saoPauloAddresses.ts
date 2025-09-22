// Base de dados extensa de endereços reais de São Paulo
export interface AddressData {
  id: string;
  main_text: string;
  secondary_text: string;
  full_address: string;
  type: 'street' | 'avenue' | 'airport' | 'shopping' | 'hotel' | 'hospital' | 'university' | 'station' | 'landmark';
  district: string;
  coords: { lat: number; lng: number };
  keywords: string[];
}

export const saoPauloAddresses: AddressData[] = [
  // AEROPORTOS
  {
    id: 'gru_airport',
    main_text: 'Aeroporto Internacional de São Paulo/Guarulhos',
    secondary_text: 'Guarulhos - SP, Brasil',
    full_address: 'Aeroporto Internacional de São Paulo/Guarulhos - Governador André Franco Montoro, Guarulhos - SP',
    type: 'airport',
    district: 'Guarulhos',
    coords: { lat: -23.4356, lng: -46.4731 },
    keywords: ['aeroporto', 'guarulhos', 'gru', 'international', 'airport', 'montoro']
  },
  {
    id: 'cgh_airport',
    main_text: 'Aeroporto de Congonhas',
    secondary_text: 'Vila Congonhas, São Paulo - SP',
    full_address: 'Aeroporto de São Paulo/Congonhas, Av. Washington Luís, s/n - Vila Congonhas, São Paulo - SP',
    type: 'airport',
    district: 'Vila Congonhas',
    coords: { lat: -23.6267, lng: -46.6554 },
    keywords: ['aeroporto', 'congonhas', 'cgh', 'washington', 'luis']
  },

  // ESTAÇÕES DE METRÔ/TREM
  {
    id: 'tiete_station',
    main_text: 'Terminal Rodoviário Tietê',
    secondary_text: 'Santana, São Paulo - SP',
    full_address: 'Terminal Rodoviário Tietê, Av. Cruzeiro do Sul, 1800 - Santana, São Paulo - SP',
    type: 'station',
    district: 'Santana',
    coords: { lat: -23.5151, lng: -46.6256 },
    keywords: ['rodoviária', 'rodoviaria', 'tiete', 'tietê', 'terminal', 'bus', 'ônibus', 'cruzeiro', 'sul']
  },
  {
    id: 'barra_funda_station',
    main_text: 'Terminal Intermodal Palmeiras-Barra Funda',
    secondary_text: 'Barra Funda, São Paulo - SP',
    full_address: 'Terminal Intermodal Palmeiras-Barra Funda, Rua Mário de Andrade, 664 - Barra Funda, São Paulo - SP',
    type: 'station',
    district: 'Barra Funda',
    coords: { lat: -23.5236, lng: -46.6653 },
    keywords: ['terminal', 'barra', 'funda', 'palmeiras', 'intermodal', 'mario', 'andrade']
  },

  // AVENIDAS PRINCIPAIS
  {
    id: 'av_paulista',
    main_text: 'Avenida Paulista',
    secondary_text: 'Bela Vista, São Paulo - SP',
    full_address: 'Avenida Paulista - Bela Vista, São Paulo - SP',
    type: 'avenue',
    district: 'Bela Vista',
    coords: { lat: -23.5614, lng: -46.6562 },
    keywords: ['avenida', 'paulista', 'av', 'bela', 'vista']
  },
  {
    id: 'av_faria_lima',
    main_text: 'Avenida Brigadeiro Faria Lima',
    secondary_text: 'Itaim Bibi, São Paulo - SP',
    full_address: 'Avenida Brigadeiro Faria Lima - Itaim Bibi, São Paulo - SP',
    type: 'avenue',
    district: 'Itaim Bibi',
    coords: { lat: -23.5781, lng: -46.6925 },
    keywords: ['avenida', 'brigadeiro', 'faria', 'lima', 'av', 'itaim', 'bibi']
  },
  {
    id: 'av_berrini',
    main_text: 'Avenida Engenheiro Luís Carlos Berrini',
    secondary_text: 'Brooklin, São Paulo - SP',
    full_address: 'Avenida Engenheiro Luís Carlos Berrini - Brooklin, São Paulo - SP',
    type: 'avenue',
    district: 'Brooklin',
    coords: { lat: -23.6116, lng: -46.6953 },
    keywords: ['avenida', 'engenheiro', 'luis', 'carlos', 'berrini', 'av', 'brooklin']
  },
  {
    id: 'av_ibirapuera',
    main_text: 'Avenida Ibirapuera',
    secondary_text: 'Ibirapuera, São Paulo - SP',
    full_address: 'Avenida Ibirapuera - Ibirapuera, São Paulo - SP',
    type: 'avenue',
    district: 'Ibirapuera',
    coords: { lat: -23.5950, lng: -46.6570 },
    keywords: ['avenida', 'ibirapuera', 'av']
  },
  {
    id: 'av_reboucas',
    main_text: 'Avenida Rebouças',
    secondary_text: 'Pinheiros, São Paulo - SP',
    full_address: 'Avenida Rebouças - Pinheiros, São Paulo - SP',
    type: 'avenue',
    district: 'Pinheiros',
    coords: { lat: -23.5672, lng: -46.6731 },
    keywords: ['avenida', 'rebouças', 'reboucas', 'av', 'pinheiros']
  },

  // RUAS FAMOSAS
  {
    id: 'rua_augusta',
    main_text: 'Rua Augusta',
    secondary_text: 'Consolação, São Paulo - SP',
    full_address: 'Rua Augusta - Consolação, São Paulo - SP',
    type: 'street',
    district: 'Consolação',
    coords: { lat: -23.5545, lng: -46.6634 },
    keywords: ['rua', 'augusta', 'consolação', 'consolacao']
  },
  {
    id: 'rua_oscar_freire',
    main_text: 'Rua Oscar Freire',
    secondary_text: 'Jardins, São Paulo - SP',
    full_address: 'Rua Oscar Freire - Jardins, São Paulo - SP',
    type: 'street',
    district: 'Jardins',
    coords: { lat: -23.5662, lng: -46.6698 },
    keywords: ['rua', 'oscar', 'freire', 'jardins']
  },
  {
    id: 'rua_25_marco',
    main_text: 'Rua 25 de Março',
    secondary_text: 'Centro Histórico, São Paulo - SP',
    full_address: 'Rua 25 de Março - Centro Histórico de São Paulo, São Paulo - SP',
    type: 'street',
    district: 'Centro',
    coords: { lat: -23.5423, lng: -46.6245 },
    keywords: ['rua', '25', 'março', 'marco', 'centro', 'historico']
  },
  {
    id: 'rua_coimbra',
    main_text: 'Rua Coimbra',
    secondary_text: 'Brás, São Paulo - SP',
    full_address: 'Rua Coimbra - Brás, São Paulo - SP',
    type: 'street',
    district: 'Brás',
    coords: { lat: -23.5299, lng: -46.6087 },
    keywords: ['rua', 'coimbra', 'bras', 'brás']
  },
  {
    id: 'rua_barao_ladario',
    main_text: 'Rua Barão de Ladário',
    secondary_text: 'Brás, São Paulo - SP',
    full_address: 'Rua Barão de Ladário - Brás, São Paulo - SP',
    type: 'street',
    district: 'Brás',
    coords: { lat: -23.5287, lng: -46.6123 },
    keywords: ['rua', 'barão', 'barao', 'ladário', 'ladario', 'bras', 'brás']
  },
  {
    id: 'rua_jose_paulino',
    main_text: 'Rua José Paulino',
    secondary_text: 'Bom Retiro, São Paulo - SP',
    full_address: 'Rua José Paulino - Bom Retiro, São Paulo - SP',
    type: 'street',
    district: 'Bom Retiro',
    coords: { lat: -23.5234, lng: -46.6387 },
    keywords: ['rua', 'josé', 'jose', 'paulino', 'bom', 'retiro']
  },
  {
    id: 'rua_direita',
    main_text: 'Rua Direita',
    secondary_text: 'Centro, São Paulo - SP',
    full_address: 'Rua Direita - Centro, São Paulo - SP',
    type: 'street',
    district: 'Centro',
    coords: { lat: -23.5467, lng: -46.6347 },
    keywords: ['rua', 'direita', 'centro']
  },
  {
    id: 'rua_consolacao',
    main_text: 'Rua da Consolação',
    secondary_text: 'Consolação, São Paulo - SP',
    full_address: 'Rua da Consolação - Consolação, São Paulo - SP',
    type: 'street',
    district: 'Consolação',
    coords: { lat: -23.5545, lng: -46.6634 },
    keywords: ['rua', 'consolação', 'consolacao']
  },
  {
    id: 'rua_liberdade',
    main_text: 'Rua da Liberdade',
    secondary_text: 'Liberdade, São Paulo - SP',
    full_address: 'Rua da Liberdade - Liberdade, São Paulo - SP',
    type: 'street',
    district: 'Liberdade',
    coords: { lat: -23.5587, lng: -46.6356 },
    keywords: ['rua', 'liberdade']
  },

  // SHOPPINGS
  {
    id: 'shopping_eldorado',
    main_text: 'Shopping Eldorado',
    secondary_text: 'Pinheiros, São Paulo - SP',
    full_address: 'Shopping Eldorado, Av. Rebouças, 3970 - Pinheiros, São Paulo - SP',
    type: 'shopping',
    district: 'Pinheiros',
    coords: { lat: -23.5672, lng: -46.6731 },
    keywords: ['shopping', 'eldorado', 'rebouças', 'reboucas', 'pinheiros']
  },
  {
    id: 'shopping_ibirapuera',
    main_text: 'Shopping Ibirapuera',
    secondary_text: 'Ibirapuera, São Paulo - SP',
    full_address: 'Shopping Ibirapuera, Av. Ibirapuera, 3103 - Ibirapuera, São Paulo - SP',
    type: 'shopping',
    district: 'Ibirapuera',
    coords: { lat: -23.6167, lng: -46.6642 },
    keywords: ['shopping', 'ibirapuera']
  },
  {
    id: 'shopping_morumbi',
    main_text: 'Shopping Morumbi',
    secondary_text: 'Morumbi, São Paulo - SP',
    full_address: 'Shopping Morumbi, Av. Roque Petroni Júnior, 1089 - Morumbi, São Paulo - SP',
    type: 'shopping',
    district: 'Morumbi',
    coords: { lat: -23.6234, lng: -46.6987 },
    keywords: ['shopping', 'morumbi', 'roque', 'petroni', 'junior']
  },

  // HOTÉIS
  {
    id: 'copacabana_palace_sp',
    main_text: 'Hotel Copacabana Palace São Paulo',
    secondary_text: 'Jardins, São Paulo - SP',
    full_address: 'Hotel Copacabana Palace São Paulo, Alameda Santos, 1437 - Jardins, São Paulo - SP',
    type: 'hotel',
    district: 'Jardins',
    coords: { lat: -23.5662, lng: -46.6698 },
    keywords: ['hotel', 'copacabana', 'palace', 'alameda', 'santos', 'jardins']
  },
  {
    id: 'maksoud_plaza',
    main_text: 'Maksoud Plaza Hotel',
    secondary_text: 'Bela Vista, São Paulo - SP',
    full_address: 'Maksoud Plaza Hotel, Alameda Campinas, 150 - Bela Vista, São Paulo - SP',
    type: 'hotel',
    district: 'Bela Vista',
    coords: { lat: -23.5614, lng: -46.6562 },
    keywords: ['maksoud', 'plaza', 'hotel', 'alameda', 'campinas', 'bela', 'vista']
  },

  // ALPHAVILLE - BARUERI
  {
    id: 'alameda_paris_alphaville',
    main_text: 'Alameda Paris',
    secondary_text: 'Alphaville Residencial Um, Barueri - SP',
    full_address: 'Alameda Paris, Alphaville Residencial Um, Barueri - SP, 06474-003',
    type: 'street',
    district: 'Alphaville',
    coords: { lat: -23.5089, lng: -46.8456 },
    keywords: ['alameda', 'paris', 'alphaville', 'residencial', 'um', 'barueri']
  },

  // HOSPITAIS
  {
    id: 'hospital_sirio_libanes',
    main_text: 'Hospital Sírio-Libanês',
    secondary_text: 'Higienópolis, São Paulo - SP',
    full_address: 'Hospital Sírio-Libanês, Rua Dona Adma Jafet, 91 - Bela Vista, São Paulo - SP',
    type: 'hospital',
    district: 'Bela Vista',
    coords: { lat: -23.5614, lng: -46.6562 },
    keywords: ['hospital', 'sírio', 'sirio', 'libanês', 'libanes', 'dona', 'adma', 'jafet']
  },
  {
    id: 'hospital_einstein',
    main_text: 'Hospital Albert Einstein',
    secondary_text: 'Morumbi, São Paulo - SP',
    full_address: 'Hospital Israelita Albert Einstein, Av. Albert Einstein, 627 - Morumbi, São Paulo - SP',
    type: 'hospital',
    district: 'Morumbi',
    coords: { lat: -23.5987, lng: -46.7123 },
    keywords: ['hospital', 'albert', 'einstein', 'israelita', 'morumbi']
  },

  // UNIVERSIDADES
  {
    id: 'usp',
    main_text: 'Universidade de São Paulo (USP)',
    secondary_text: 'Cidade Universitária, São Paulo - SP',
    full_address: 'Universidade de São Paulo - Cidade Universitária, São Paulo - SP',
    type: 'university',
    district: 'Cidade Universitária',
    coords: { lat: -23.5582, lng: -46.7319 },
    keywords: ['universidade', 'usp', 'são', 'paulo', 'cidade', 'universitária', 'universitaria']
  },
  {
    id: 'mackenzie',
    main_text: 'Universidade Presbiteriana Mackenzie',
    secondary_text: 'Higienópolis, São Paulo - SP',
    full_address: 'Universidade Presbiteriana Mackenzie, Rua da Consolação, 930 - Consolação, São Paulo - SP',
    type: 'university',
    district: 'Consolação',
    coords: { lat: -23.5445, lng: -46.6534 },
    keywords: ['universidade', 'presbiteriana', 'mackenzie', 'consolação', 'consolacao', 'higienópolis', 'higienopolis']
  },

  // PARQUES E MARCOS
  {
    id: 'parque_ibirapuera',
    main_text: 'Parque Ibirapuera',
    secondary_text: 'Ibirapuera, São Paulo - SP',
    full_address: 'Parque Ibirapuera, Av. Paulista, s/n - Ibirapuera, São Paulo - SP',
    type: 'landmark',
    district: 'Ibirapuera',
    coords: { lat: -23.5872, lng: -46.6573 },
    keywords: ['parque', 'ibirapuera']
  },
  {
    id: 'centro_cultural_sp',
    main_text: 'Centro Cultural São Paulo',
    secondary_text: 'Paraíso, São Paulo - SP',
    full_address: 'Centro Cultural São Paulo, Rua Vergueiro, 1000 - Paraíso, São Paulo - SP',
    type: 'landmark',
    district: 'Paraíso',
    coords: { lat: -23.5705, lng: -46.6433 },
    keywords: ['centro', 'cultural', 'são', 'paulo', 'vergueiro', 'paraíso', 'paraiso']
  },

  // RUAS ADICIONAIS IMPORTANTES
  {
    id: 'rua_teodoro_sampaio',
    main_text: 'Rua Teodoro Sampaio',
    secondary_text: 'Pinheiros, São Paulo - SP',
    full_address: 'Rua Teodoro Sampaio - Pinheiros, São Paulo - SP',
    type: 'street',
    district: 'Pinheiros',
    coords: { lat: -23.5672, lng: -46.6731 },
    keywords: ['rua', 'teodoro', 'sampaio', 'pinheiros']
  },
  {
    id: 'rua_haddock_lobo',
    main_text: 'Rua Haddock Lobo',
    secondary_text: 'Jardins, São Paulo - SP',
    full_address: 'Rua Haddock Lobo - Jardins, São Paulo - SP',
    type: 'street',
    district: 'Jardins',
    coords: { lat: -23.5662, lng: -46.6698 },
    keywords: ['rua', 'haddock', 'lobo', 'jardins']
  },
  {
    id: 'rua_dos_pinheiros',
    main_text: 'Rua dos Pinheiros',
    secondary_text: 'Pinheiros, São Paulo - SP',
    full_address: 'Rua dos Pinheiros - Pinheiros, São Paulo - SP',
    type: 'street',
    district: 'Pinheiros',
    coords: { lat: -23.5672, lng: -46.6731 },
    keywords: ['rua', 'dos', 'pinheiros']
  },
  {
    id: 'rua_cardeal_arcoverde',
    main_text: 'Rua Cardeal Arcoverde',
    secondary_text: 'Pinheiros, São Paulo - SP',
    full_address: 'Rua Cardeal Arcoverde - Pinheiros, São Paulo - SP',
    type: 'street',
    district: 'Pinheiros',
    coords: { lat: -23.5672, lng: -46.6731 },
    keywords: ['rua', 'cardeal', 'arcoverde', 'pinheiros']
  },

  // MAIS AVENIDAS
  {
    id: 'av_9_julho',
    main_text: 'Avenida 9 de Julho',
    secondary_text: 'Bela Vista, São Paulo - SP',
    full_address: 'Avenida 9 de Julho - Bela Vista, São Paulo - SP',
    type: 'avenue',
    district: 'Bela Vista',
    coords: { lat: -23.5614, lng: -46.6562 },
    keywords: ['avenida', '9', 'nove', 'julho', 'av', 'bela', 'vista']
  },
  {
    id: 'av_23_maio',
    main_text: 'Avenida 23 de Maio',
    secondary_text: 'Paraíso, São Paulo - SP',
    full_address: 'Avenida 23 de Maio - Paraíso, São Paulo - SP',
    type: 'avenue',
    district: 'Paraíso',
    coords: { lat: -23.5705, lng: -46.6433 },
    keywords: ['avenida', '23', 'vinte', 'três', 'maio', 'av', 'paraíso', 'paraiso']
  },
  {
    id: 'av_ipiranga',
    main_text: 'Avenida Ipiranga',
    secondary_text: 'Centro, São Paulo - SP',
    full_address: 'Avenida Ipiranga - Centro, São Paulo - SP',
    type: 'avenue',
    district: 'Centro',
    coords: { lat: -23.5467, lng: -46.6347 },
    keywords: ['avenida', 'ipiranga', 'av', 'centro']
  },
  {
    id: 'av_sao_joao',
    main_text: 'Avenida São João',
    secondary_text: 'Centro, São Paulo - SP',
    full_address: 'Avenida São João - Centro, São Paulo - SP',
    type: 'avenue',
    district: 'Centro',
    coords: { lat: -23.5467, lng: -46.6347 },
    keywords: ['avenida', 'são', 'sao', 'joão', 'joao', 'av', 'centro']
  },

  // MAIS SHOPPINGS IMPORTANTES
  {
    id: 'shopping_iguatemi',
    main_text: 'Shopping Iguatemi São Paulo',
    secondary_text: 'Jardim Paulista, São Paulo - SP',
    full_address: 'Shopping Iguatemi São Paulo, Av. Brigadeiro Faria Lima, 2232 - Jardim Paulista, São Paulo - SP, 01451-000',
    type: 'shopping',
    district: 'Jardim Paulista',
    coords: { lat: -23.5781, lng: -46.6925 },
    keywords: ['shopping', 'iguatemi', 'faria', 'lima', 'jardim', 'paulista']
  },
  {
    id: 'shopping_cidade_jardim',
    main_text: 'Shopping Cidade Jardim',
    secondary_text: 'Vila Olímpia, São Paulo - SP',
    full_address: 'Shopping Cidade Jardim, Av. Magalhães de Castro, 12000 - Vila Olímpia, São Paulo - SP, 05502-001',
    type: 'shopping',
    district: 'Vila Olímpia',
    coords: { lat: -23.5955, lng: -46.6890 },
    keywords: ['shopping', 'cidade', 'jardim', 'magalhães', 'castro', 'vila', 'olimpia']
  },
  {
    id: 'shopping_villa_lobos',
    main_text: 'Shopping Villa-Lobos',
    secondary_text: 'Alto de Pinheiros, São Paulo - SP',
    full_address: 'Shopping Villa-Lobos, Av. das Nações Unidas, 4777 - Alto de Pinheiros, São Paulo - SP, 05477-000',
    type: 'shopping',
    district: 'Alto de Pinheiros',
    coords: { lat: -23.5672, lng: -46.6731 },
    keywords: ['shopping', 'villa', 'lobos', 'nações', 'unidas', 'alto', 'pinheiros']
  },
  {
    id: 'shopping_market_place',
    main_text: 'Market Place Shopping',
    secondary_text: 'Brooklin, São Paulo - SP',
    full_address: 'Market Place Shopping, Av. Dr. Chucri Zaidan, 902 - Vila Cordeiro, São Paulo - SP, 04583-110',
    type: 'shopping',
    district: 'Brooklin',
    coords: { lat: -23.6116, lng: -46.6953 },
    keywords: ['market', 'place', 'shopping', 'chucri', 'zaidan', 'vila', 'cordeiro', 'brooklin']
  },
  {
    id: 'shopping_analia_franco',
    main_text: 'Shopping Anália Franco',
    secondary_text: 'Vila Formosa, São Paulo - SP',
    full_address: 'Shopping Anália Franco, Av. Regente Feijó, 1739 - Vila Formosa, São Paulo - SP, 03342-000',
    type: 'shopping',
    district: 'Vila Formosa',
    coords: { lat: -23.5505, lng: -46.4741 },
    keywords: ['shopping', 'anália', 'analia', 'franco', 'regente', 'feijó', 'feijo', 'vila', 'formosa']
  },

  // MAIS HOTÉIS IMPORTANTES
  {
    id: 'hotel_renaissance',
    main_text: 'Renaissance São Paulo Hotel',
    secondary_text: 'Jardins, São Paulo - SP',
    full_address: 'Renaissance São Paulo Hotel, Alameda Santos, 2233 - Jardins, São Paulo - SP, 01419-002',
    type: 'hotel',
    district: 'Jardins',
    coords: { lat: -23.5662, lng: -46.6698 },
    keywords: ['hotel', 'renaissance', 'alameda', 'santos', 'jardins']
  },
  {
    id: 'hotel_grand_hyatt',
    main_text: 'Grand Hyatt São Paulo',
    secondary_text: 'Vila Olímpia, São Paulo - SP',
    full_address: 'Grand Hyatt São Paulo, Av. das Nações Unidas, 13301 - Vila Olímpia, São Paulo - SP, 04578-000',
    type: 'hotel',
    district: 'Vila Olímpia',
    coords: { lat: -23.5955, lng: -46.6890 },
    keywords: ['hotel', 'grand', 'hyatt', 'nações', 'unidas', 'vila', 'olimpia']
  },
  {
    id: 'hotel_intercontinental',
    main_text: 'InterContinental São Paulo',
    secondary_text: 'Jardins, São Paulo - SP',
    full_address: 'InterContinental São Paulo, Alameda Santos, 1123 - Jardins, São Paulo - SP, 01419-001',
    type: 'hotel',
    district: 'Jardins',
    coords: { lat: -23.5662, lng: -46.6698 },
    keywords: ['hotel', 'intercontinental', 'alameda', 'santos', 'jardins']
  },
  {
    id: 'hotel_marriott',
    main_text: 'São Paulo Marriott Hotel',
    secondary_text: 'Brooklin, São Paulo - SP',
    full_address: 'São Paulo Marriott Hotel, Av. das Nações Unidas, 18591 - Vila Almeida, São Paulo - SP, 04795-100',
    type: 'hotel',
    district: 'Brooklin',
    coords: { lat: -23.6116, lng: -46.6953 },
    keywords: ['hotel', 'marriott', 'nações', 'unidas', 'vila', 'almeida', 'brooklin']
  },

  // CENTROS EMPRESARIAIS
  {
    id: 'centro_empresarial_faria_lima',
    main_text: 'Centro Empresarial Faria Lima',
    secondary_text: 'Itaim Bibi, São Paulo - SP',
    full_address: 'Centro Empresarial Faria Lima, Av. Brigadeiro Faria Lima, 3064 - Itaim Bibi, São Paulo - SP, 01451-000',
    type: 'landmark',
    district: 'Itaim Bibi',
    coords: { lat: -23.5781, lng: -46.6925 },
    keywords: ['centro', 'empresarial', 'faria', 'lima', 'itaim', 'bibi']
  },
  {
    id: 'world_trade_center',
    main_text: 'World Trade Center São Paulo',
    secondary_text: 'Brooklin, São Paulo - SP',
    full_address: 'World Trade Center São Paulo, Av. das Nações Unidas, 12551 - Brooklin Novo, São Paulo - SP, 04578-903',
    type: 'landmark',
    district: 'Brooklin',
    coords: { lat: -23.6116, lng: -46.6953 },
    keywords: ['world', 'trade', 'center', 'wtc', 'nações', 'unidas', 'brooklin']
  },
  {
    id: 'centro_empresarial_nações_unidas',
    main_text: 'Centro Empresarial Nações Unidas',
    secondary_text: 'Vila Olímpia, São Paulo - SP',
    full_address: 'Centro Empresarial Nações Unidas, Av. das Nações Unidas, 8501 - Pinheiros, São Paulo - SP, 05425-070',
    type: 'landmark',
    district: 'Vila Olímpia',
    coords: { lat: -23.5955, lng: -46.6890 },
    keywords: ['centro', 'empresarial', 'nações', 'unidas', 'vila', 'olimpia', 'pinheiros']
  },

  // BAIRROS IMPORTANTES COM CEPS ESPECÍFICOS
  {
    id: 'vila_madalena',
    main_text: 'Vila Madalena',
    secondary_text: 'Vila Madalena, São Paulo - SP',
    full_address: 'Vila Madalena, São Paulo - SP, 05433-000',
    type: 'landmark',
    district: 'Vila Madalena',
    coords: { lat: -23.5672, lng: -46.6731 },
    keywords: ['vila', 'madalena', 'bairro']
  },
  {
    id: 'moema',
    main_text: 'Moema',
    secondary_text: 'Moema, São Paulo - SP',
    full_address: 'Moema, São Paulo - SP, 04077-000',
    type: 'landmark',
    district: 'Moema',
    coords: { lat: -23.6000, lng: -46.6600 },
    keywords: ['moema', 'bairro']
  },
  {
    id: 'campo_belo',
    main_text: 'Campo Belo',
    secondary_text: 'Campo Belo, São Paulo - SP',
    full_address: 'Campo Belo, São Paulo - SP, 04609-000',
    type: 'landmark',
    district: 'Campo Belo',
    coords: { lat: -23.6200, lng: -46.6700 },
    keywords: ['campo', 'belo', 'bairro']
  },
  {
    id: 'santo_amaro',
    main_text: 'Santo Amaro',
    secondary_text: 'Santo Amaro, São Paulo - SP',
    full_address: 'Santo Amaro, São Paulo - SP, 04752-000',
    type: 'landmark',
    district: 'Santo Amaro',
    coords: { lat: -23.6500, lng: -46.7000 },
    keywords: ['santo', 'amaro', 'bairro']
  },

  // ESTAÇÕES DE METRÔ IMPORTANTES
  {
    id: 'estacao_se',
    main_text: 'Estação Sé',
    secondary_text: 'Centro, São Paulo - SP',
    full_address: 'Estação Sé, Praça da Sé - Centro, São Paulo - SP, 01001-000',
    type: 'station',
    district: 'Centro',
    coords: { lat: -23.5467, lng: -46.6347 },
    keywords: ['estação', 'estacao', 'sé', 'se', 'metrô', 'metro', 'centro', 'praça', 'praca']
  },
  {
    id: 'estacao_faria_lima',
    main_text: 'Estação Faria Lima',
    secondary_text: 'Itaim Bibi, São Paulo - SP',
    full_address: 'Estação Faria Lima, Av. Brigadeiro Faria Lima - Itaim Bibi, São Paulo - SP, 01451-000',
    type: 'station',
    district: 'Itaim Bibi',
    coords: { lat: -23.5781, lng: -46.6925 },
    keywords: ['estação', 'estacao', 'faria', 'lima', 'metrô', 'metro', 'itaim', 'bibi']
  },
  {
    id: 'estacao_vila_olimpia',
    main_text: 'Estação Vila Olímpia',
    secondary_text: 'Vila Olímpia, São Paulo - SP',
    full_address: 'Estação Vila Olímpia, Rua Funchal - Vila Olímpia, São Paulo - SP, 04551-000',
    type: 'station',
    district: 'Vila Olímpia',
    coords: { lat: -23.5955, lng: -46.6890 },
    keywords: ['estação', 'estacao', 'vila', 'olimpia', 'olímpia', 'metrô', 'metro', 'funchal']
  },

  // MAIS HOSPITAIS
  {
    id: 'hospital_das_clinicas',
    main_text: 'Hospital das Clínicas',
    secondary_text: 'Cerqueira César, São Paulo - SP',
    full_address: 'Hospital das Clínicas, Av. Dr. Enéas Carvalho de Aguiar, 255 - Cerqueira César, São Paulo - SP, 05403-000',
    type: 'hospital',
    district: 'Cerqueira César',
    coords: { lat: -23.5614, lng: -46.6562 },
    keywords: ['hospital', 'das', 'clínicas', 'clinicas', 'enéas', 'eneas', 'carvalho', 'aguiar', 'cerqueira', 'césar', 'cesar']
  },
  {
    id: 'hospital_santa_catarina',
    main_text: 'Hospital Santa Catarina',
    secondary_text: 'Paulista, São Paulo - SP',
    full_address: 'Hospital Santa Catarina, Av. Paulista, 200 - Bela Vista, São Paulo - SP, 01310-000',
    type: 'hospital',
    district: 'Bela Vista',
    coords: { lat: -23.5614, lng: -46.6562 },
    keywords: ['hospital', 'santa', 'catarina', 'paulista', 'bela', 'vista']
  },

  // UNIVERSIDADES ADICIONAIS
  {
    id: 'puc_sp',
    main_text: 'PUC-SP',
    secondary_text: 'Perdizes, São Paulo - SP',
    full_address: 'Pontifícia Universidade Católica de São Paulo, Rua Monte Alegre, 984 - Perdizes, São Paulo - SP, 05014-901',
    type: 'university',
    district: 'Perdizes',
    coords: { lat: -23.5281, lng: -46.6731 },
    keywords: ['puc', 'pontifícia', 'pontificia', 'universidade', 'católica', 'catolica', 'monte', 'alegre', 'perdizes']
  },
  {
    id: 'fgv_sp',
    main_text: 'FGV-SP',
    secondary_text: 'Bela Vista, São Paulo - SP',
    full_address: 'Fundação Getulio Vargas, Av. 9 de Julho, 2029 - Bela Vista, São Paulo - SP, 01313-902',
    type: 'university',
    district: 'Bela Vista',
    coords: { lat: -23.5614, lng: -46.6562 },
    keywords: ['fgv', 'fundação', 'fundacao', 'getulio', 'vargas', '9', 'nove', 'julho', 'bela', 'vista']
  }
];

// Função de busca inteligente
export const searchAddresses = (query: string, maxResults: number = 8): AddressData[] => {
  if (!query || query.length < 1) {
    return [];
  }

  const normalizedQuery = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .trim();

  const queryWords = normalizedQuery.split(/\s+/);

  const results = saoPauloAddresses
    .map(address => {
      let score = 0;
      const addressText = address.main_text.toLowerCase() + ' ' + address.secondary_text.toLowerCase();
      const normalizedAddressText = addressText
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

      // Pontuação por correspondência exata no início
      if (normalizedAddressText.startsWith(normalizedQuery)) {
        score += 100;
      }

      // Pontuação por correspondência de palavras
      queryWords.forEach(word => {
        if (word.length >= 2) {
          // Correspondência exata da palavra
          if (normalizedAddressText.includes(word)) {
            score += 50;
          }
          
          // Correspondência nas keywords
          const keywordMatch = address.keywords.some(keyword => 
            keyword.toLowerCase().includes(word)
          );
          if (keywordMatch) {
            score += 30;
          }

          // Correspondência parcial (fuzzy)
          if (word.length >= 3) {
            const fuzzyMatch = normalizedAddressText.includes(word.substring(0, 3));
            if (fuzzyMatch) {
              score += 10;
            }
          }
        }
      });

      // Bônus para tipos importantes
      if (address.type === 'airport') score += 20;
      if (address.type === 'station') score += 15;
      if (address.type === 'shopping') score += 10;
      if (address.type === 'avenue') score += 5;

      return { ...address, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return results;
};