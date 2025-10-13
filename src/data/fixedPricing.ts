// Configuração de tarifas fixas por região e categoria de veículo

export interface FixedRoute {
  from: string;
  to: string[];
  prices: {
    executivoSedan: number;
    executivoComum: number;
    executivoPremiumBlindado: number;
    minivanComum: number;
    minivanBlindada: number;
    van15Lugares?: number;
  };
}

export interface LocationInfo {
  name: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  cepRanges?: string[];
  keywords: string[];
}

// Definição dos locais conhecidos
export const KNOWN_LOCATIONS: { [key: string]: LocationInfo } = {
  // Aeroportos
  congonhas: {
    name: 'Aeroporto de Congonhas',
    address: 'Av. Washington Luís, s/n - Campo Belo, São Paulo - SP, 04626-911',
    coordinates: { lat: -23.6267, lng: -46.6554 },
    keywords: ['congonhas', 'cgh', 'aeroporto congonhas', 'washington luis']
  },
  guarulhos: {
    name: 'Aeroporto de Guarulhos',
    address: 'Rod. Hélio Smidt, s/n - Cumbica, Guarulhos - SP, 07190-100',
    coordinates: { lat: -23.4356, lng: -46.4731 },
    keywords: ['gru', 'aeroporto guarulhos', 'helio smidt', 'cumbica', 'aeroporto de guarulhos']
  },
  guarulhosRegiao: {
    name: 'Guarulhos (Região)',
    address: 'Guarulhos - SP',
    coordinates: { lat: -23.4356, lng: -46.4731 },
    cepRanges: ['07000-001 a 07399-999'],
    keywords: ['guarulhos', 'guarulhos região', 'guarulhos cidade', 'centro guarulhos', 'guarulhos sp']
  },
  viracopos: {
    name: 'Aeroporto de Viracopos',
    address: 'Rod. Santos Dumont, km 66 - Campinas - SP, 13052-901',
    coordinates: { lat: -23.0074, lng: -47.1344 },
    cepRanges: ['13052-900', '13052-970'],
    keywords: ['viracopos', 'vcp', 'aeroporto viracopos', 'campinas', 'santos dumont']
  },

  // Regiões de São Paulo
  paulista: {
    name: 'Avenida Paulista',
    address: 'Avenida Paulista - Bela Vista, São Paulo - SP',
    coordinates: { lat: -23.5614, lng: -46.6562 },
    cepRanges: ['01310-000 a 01310-300', '01311-000 a 01311-100'],
    keywords: ['paulista', 'avenida paulista', 'bela vista']
  },
  itaim: {
    name: 'Itaim Bibi',
    address: 'Itaim Bibi - São Paulo - SP',
    coordinates: { lat: -23.5847, lng: -46.6748 },
    cepRanges: ['01451-010 a 04563-070'],
    keywords: ['itaim', 'itaim bibi', 'iguatemi', 'cidade jardim']
  },
  vilaOlimpia: {
    name: 'Vila Olímpia',
    address: 'Vila Olímpia - São Paulo - SP',
    coordinates: { lat: -23.5955, lng: -46.6890 },
    cepRanges: ['04537-130 a 04553-903'],
    keywords: ['vila olimpia', 'vila olímpia', 'fiandeiras', 'francis plante']
  },
  pinheiros: {
    name: 'Pinheiros',
    address: 'Pinheiros - São Paulo - SP',
    coordinates: { lat: -23.5672, lng: -46.6731 },
    cepRanges: ['01458-970 a 05432-070'],
    keywords: ['pinheiros']
  },
  lapa: {
    name: 'Lapa',
    address: 'Lapa - São Paulo - SP',
    coordinates: { lat: -23.5281, lng: -46.7056 },
    cepRanges: ['05038-090 a 05086-900'],
    keywords: ['lapa', 'nossa senhora da lapa']
  },
  butanta: {
    name: 'Butantã',
    address: 'Butantã - São Paulo - SP',
    coordinates: { lat: -23.5672, lng: -46.7281 },
    cepRanges: ['05501-000 a 05582-001'],
    keywords: ['butanta', 'butantã', 'valdemar ferreira']
  },

  // Regiões próximas (incluídas nas tarifas de Congonhas)
  moema: {
    name: 'Moema',
    address: 'Moema - São Paulo - SP',
    coordinates: { lat: -23.6063, lng: -46.6645 },
    cepRanges: ['04077-000 a 04094-050'],
    keywords: ['moema', 'ibirapuera']
  },
  brooklin: {
    name: 'Brooklin',
    address: 'Brooklin - São Paulo - SP',
    coordinates: { lat: -23.6063, lng: -46.6895 },
    cepRanges: ['04561-000 a 04707-000'],
    keywords: ['brooklin', 'campo belo', 'santo amaro']
  },
  jardins: {
    name: 'Jardins',
    address: 'Jardins - São Paulo - SP',
    coordinates: { lat: -23.5614, lng: -46.6562 },
    cepRanges: ['01401-000 a 01455-070'],
    keywords: ['jardins', 'jardim europa', 'jardim america', 'jardim paulista']
  },
  vilaMariana: {
    name: 'Vila Mariana',
    address: 'Vila Mariana - São Paulo - SP',
    coordinates: { lat: -23.5881, lng: -46.6394 },
    cepRanges: ['04013-000 a 04077-000'],
    keywords: ['vila mariana', 'paraiso', 'ana rosa']
  },

  // Outras regiões
  alphaville: {
    name: 'Alphaville',
    address: 'Alphaville - Barueri/Santana de Parnaíba - SP',
    coordinates: { lat: -23.5181, lng: -46.8406 },
    cepRanges: ['06481-500 a 06484-000', '06542-165'],
    keywords: ['alphaville', 'barueri', 'santana de parnaiba', 'mongagua']
  },
  portoSantos: {
    name: 'Porto de Santos',
    address: 'Av. Conselheiro Rodrigues Alves, s/n - Macuco, Santos - SP, 11015-900',
    coordinates: { lat: -23.9618, lng: -46.3322 },
    cepRanges: ['11015-900', '11015-911'],
    keywords: ['porto santos', 'santos', 'rodrigues alves', 'macuco', 'cais marinha']
  },

  // Grande São Paulo - Região específica para regras de Viracopos
  // Zona Oeste de São Paulo
  zonaOeste: {
    name: 'Zona Oeste de São Paulo',
    address: 'Zona Oeste - São Paulo - SP',
    coordinates: { lat: -23.5281, lng: -46.7281 },
    cepRanges: ['05000-000 a 05999-999'],
    keywords: ['zona oeste', 'perdizes', 'pompeia', 'barra funda', 'agua branca', 'vila leopoldina', 'jaguare', 'rio pequeno', 'raposo tavares', 'butanta', 'morumbi', 'vila sonia', 'jardim paulista oeste']
  },

  // Zona Sul de São Paulo
  zonaSul: {
    name: 'Zona Sul de São Paulo',
    address: 'Zona Sul - São Paulo - SP',
    coordinates: { lat: -23.6267, lng: -46.6554 },
    cepRanges: ['04000-000 a 04999-999'],
    keywords: ['zona sul', 'vila mariana', 'saude', 'cursino', 'ipiranga', 'sacoma', 'jabaquara', 'cidade ademar', 'pedreira', 'cidade dutra', 'socorro', 'cidade tiradentes', 'grajaú', 'parelheiros']
  },

  // Zona Leste de São Paulo
  zonaLeste: {
    name: 'Zona Leste de São Paulo',
    address: 'Zona Leste - São Paulo - SP',
    coordinates: { lat: -23.5505, lng: -46.4741 },
    cepRanges: ['03000-000 a 03999-999'],
    keywords: ['zona leste', 'mooca', 'tatuape', 'penha', 'vila formosa', 'vila matilde', 'vila prudente', 'sapopemba', 'vila carrão', 'aricanduva', 'cidade tiradentes', 'itaquera', 'guaianases', 'lajeado', 'itaim paulista']
  },

  // São Paulo Capital
  saoPauloCapital: {
    name: 'São Paulo Capital',
    address: 'São Paulo - SP',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    cepRanges: ['01000-000 a 05999-999', '08000-000 a 08499-999'],
    keywords: ['são paulo', 'sao paulo', 'capital', 'centro', 'centro histórico', 'república', 'sé', 'liberdade', 'bela vista', 'consolação', 'higienópolis', 'santa cecília', 'campos elíseos', 'bom retiro', 'luz', 'brás', 'pari', 'canindé', 'vila guilherme', 'santana', 'tucuruvi', 'jaçanã', 'tremembé', 'mandaqui', 'casa verde', 'limão', 'cachoeirinha', 'brasilândia', 'freguesia do ó', 'pirituba', 'jaraguá', 'perus', 'anhanguera']
  },

  // ABC Paulista
  abcPaulista: {
    name: 'ABC Paulista',
    address: 'Região do ABC - SP',
    coordinates: { lat: -23.6629, lng: -46.5331 },
    cepRanges: ['09000-000 a 09999-999'],
    keywords: ['abc paulista', 'santo andre', 'santo andré', 'são bernardo', 'sao bernardo', 'diadema', 'maua', 'mauá', 'ribeirão pires', 'ribeirao pires', 'rio grande da serra', 'são caetano', 'sao caetano', 'são caetano do sul', 'sao caetano do sul']
  },

  grandeSaoPaulo: {
    name: 'Grande São Paulo',
    address: 'Região Metropolitana de São Paulo - SP',
    coordinates: { lat: -23.5505, lng: -46.6333 },
    cepRanges: ['06000-000 a 09999-999'],
    keywords: ['grande são paulo', 'região metropolitana']
  }
};

// Definição das rotas com tarifas fixas
export const FIXED_ROUTES: FixedRoute[] = [
  // Rotas do Aeroporto de Congonhas
  {
    from: 'congonhas',
    to: ['paulista', 'itaim', 'vilaOlimpia', 'pinheiros', 'lapa', 'butanta', 'moema', 'brooklin', 'jardins', 'vilaMariana'],
    prices: {
      executivoSedan: 240.00,
      executivoComum: 330.00,
      executivoPremiumBlindado: 650.00,
      minivanComum: 650.00,
      minivanBlindada: 1150.00,  // Ajustado conforme solicitação
      van15Lugares: 790.00       // Ajustado conforme solicitação
    }
  },
  {
    from: 'congonhas',
    to: ['alphaville'],
    prices: {
      executivoSedan: 390.00,
      executivoComum: 490.00,
      executivoPremiumBlindado: 990.00,
      minivanComum: 790.00,
      minivanBlindada: 1450.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'congonhas',
    to: ['portoSantos'],
    prices: {
      executivoSedan: 690.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1090.00,
      minivanBlindada: 2100.00,
      van15Lugares: 1290.00
    }
  },
  {
    from: 'congonhas',
    to: ['abcPaulista'],
    prices: {
      executivoSedan: 240.00,
      executivoComum: 330.00,
      executivoPremiumBlindado: 650.00,
      minivanComum: 650.00,
      minivanBlindada: 1150.00,
      van15Lugares: 790.00
    }
  },
  {
    from: 'congonhas',
    to: ['saoPauloCapital'],
    prices: {
      executivoSedan: 240.00,
      executivoComum: 330.00,
      executivoPremiumBlindado: 650.00,
      minivanComum: 650.00,
      minivanBlindada: 1150.00,
      van15Lugares: 790.00
    }
  },
  {
    from: 'guarulhos',
    to: ['saoPauloCapital'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },

  // Rotas reversas - De Congonhas para Guarulhos
  {
    from: 'congonhas',
    to: ['guarulhosRegiao'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'saoPauloCapital',
    to: ['guarulhosRegiao'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'abcPaulista',
    to: ['guarulhosRegiao'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },

  // Rotas do Aeroporto de Guarulhos
  {
    from: 'guarulhos',
    to: ['paulista', 'itaim', 'vilaOlimpia', 'pinheiros', 'lapa', 'butanta'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'guarulhos',
    to: ['zonaOeste'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'guarulhos',
    to: ['zonaSul'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'guarulhos',
    to: ['zonaLeste'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'guarulhos',
    to: ['abcPaulista'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'guarulhos',
    to: ['alphaville'],
    prices: {
      executivoSedan: 440.00,
      executivoComum: 540.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 890.00,
      minivanBlindada: 1600.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'guarulhos',
    to: ['portoSantos'],
    prices: {
      executivoSedan: 690.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1290.00,
      minivanBlindada: 2100.00,
      van15Lugares: 1290.00
    }
  },

  // Rotas do Aeroporto de Viracopos
  {
    from: 'viracopos',
    to: ['paulista', 'itaim', 'vilaOlimpia', 'pinheiros', 'lapa', 'butanta'],
    prices: {
      executivoSedan: 690.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1100.00,
      minivanBlindada: 1800.00,
      van15Lugares: 990.00
    }
  },

  // Viracopos para Grande São Paulo (regra específica com validação de CEP)
  {
    from: 'viracopos',
    to: ['grandeSaoPaulo'],
    prices: {
      executivoSedan: 690.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1100.00,
      minivanBlindada: 1800.00,
      van15Lugares: 990.00
    }
  },

  // Rotas reversas para Guarulhos Região
  {
    from: 'saoPauloCapital',
    to: ['guarulhosRegiao'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'abcPaulista',
    to: ['guarulhosRegiao'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },

  // Rotas de Guarulhos (Aeroporto) para regiões específicas de São Paulo
  {
    from: 'guarulhos',
    to: ['moema', 'vilaMariana', 'brooklin', 'jardins', 'itaim', 'vilaOlimpia', 'pinheiros', 'butanta', 'lapa'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  // Rotas de Guarulhos (Região) para regiões específicas de São Paulo
  {
    from: 'guarulhosRegiao',
    to: ['moema', 'vilaMariana', 'brooklin', 'jardins', 'itaim', 'vilaOlimpia', 'pinheiros', 'butanta', 'lapa'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'guarulhos',
    to: ['zonaOeste', 'zonaSul'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'guarulhosRegiao',
    to: ['zonaOeste', 'zonaSul', 'zonaLeste', 'saoPauloCapital', 'abcPaulista'],
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  }
];

// Tarifas de diária
export const DAILY_RATES = {
  executivoSedan: 750.00,
  executivoComum: 890.00,
  executivoPremiumBlindado: 1450.00,
  minivanComum: 1650.00,
  minivanBlindada: 2500.00,
  van15Lugares: 1750.00
};

// Função para identificar localização baseada no endereço
export const identifyLocation = (address: string): string | null => {
  const normalizedAddress = address.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s]/g, ' ') // Remove pontuação
    .replace(/\s+/g, ' ') // Normaliza espaços
    .trim();

  console.log(`🔍 Identificando localização para: "${address}" → normalizado: "${normalizedAddress}"`);

  for (const [locationKey, locationInfo] of Object.entries(KNOWN_LOCATIONS)) {
    for (const keyword of locationInfo.keywords) {
      const normalizedKeyword = keyword.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      
      if (normalizedAddress.includes(normalizedKeyword)) {
        console.log(`✅ Localização identificada: ${locationKey} (palavra-chave: "${keyword}")`);
        return locationKey;
      }
    }
  }

  console.log(`❌ Localização não identificada para: "${address}"`);
  return null;
};

// Função para buscar tarifa fixa
export const findFixedPrice = (
  origin: string, 
  destination: string, 
  vehicleType: keyof typeof DAILY_RATES
): number | null => {
  const originLocation = identifyLocation(origin);
  const destinationLocation = identifyLocation(destination);

  console.log(`💰 Buscando tarifa fixa: ${originLocation} → ${destinationLocation} (${vehicleType})`);

  if (!originLocation || !destinationLocation) {
    console.log(`❌ Uma das localizações não foi identificada`);
    return null;
  }

  // Buscar rota direta
  const directRoute = FIXED_ROUTES.find(route => 
    route.from === originLocation && route.to.includes(destinationLocation)
  );

  if (directRoute && directRoute.prices[vehicleType] !== undefined) {
    const price = directRoute.prices[vehicleType]!;
    console.log(`✅ Tarifa fixa encontrada (direta): R$ ${price.toFixed(2)}`);
    return price;
  }

  // Buscar rota inversa
  const reverseRoute = FIXED_ROUTES.find(route => 
    route.from === destinationLocation && route.to.includes(originLocation)
  );

  if (reverseRoute && reverseRoute.prices[vehicleType] !== undefined) {
    const price = reverseRoute.prices[vehicleType]!;
    console.log(`✅ Tarifa fixa encontrada (inversa): R$ ${price.toFixed(2)}`);
    return price;
  }

  console.log(`❌ Tarifa fixa não encontrada para esta rota`);
  return null;
};

// Função para verificar se é uma solicitação de diária
export const isDailyRequest = (address: string): boolean => {
  const normalizedAddress = address.toLowerCase();
  const dailyKeywords = [
    'diaria', 'diária', 'disposicao', 'disposição', 
    '10h', '10 horas', 'dia todo', 'day use'
  ];
  
  return dailyKeywords.some(keyword => normalizedAddress.includes(keyword));
};