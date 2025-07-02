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