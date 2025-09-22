// Sistema de precificação baseado em CEPs
// Regra-chave: o preço é bidirecional (ida = volta). Se A→B custa X, então B→A também custa X.

export interface CepRegion {
  name: string;
  cep: string;
  cepRange?: { start: string; end: string };
}

export interface CepPriceRoute {
  from: string;
  to: string;
  prices: {
    executivoSedan: number;
    executivoComum: number;
    executivoPremiumBlindado: number;
    minivanComum: number;
    minivanBlindada: number;
    van15Lugares: number;
  };
}

// Mapeamento de CEPs para regiões conhecidas
export const CEP_REGIONS: { [key: string]: CepRegion } = {
  paulista: {
    name: 'Av. Paulista',
    cep: '01310-100'
  },
  itaim: {
    name: 'Itaim Bibi',
    cep: '04532-060'
  },
  vilaOlimpia: {
    name: 'Vila Olímpia',
    cep: '04551-000'
  },
  pinheiros: {
    name: 'Pinheiros',
    cep: '05422-000'
  },
  lapa: {
    name: 'Lapa',
    cep: '05075-010'
  },
  butanta: {
    name: 'Butantã',
    cep: '05508-900'
  },
  alphaville: {
    name: 'Alphaville',
    cep: '06454-000'
  },
  portoSantos: {
    name: 'Porto de Santos',
    cep: '11015-900'
  },
  congonhas: {
    name: 'Congonhas (Aeroporto)',
    cep: '04626-911',
    cepRange: { start: '04626-000', end: '04627-999' }
  },
  guarulhos: {
    name: 'Guarulhos/GRU (Aeroporto)',
    cep: '07190-100',
    cepRange: { start: '07000-000', end: '07999-999' }
  },
  guarulhosRegiao: {
    name: 'Guarulhos (Região)',
    cep: '07000-001',
    cepRange: { start: '07000-001', end: '07399-999' }
  },
  viracopos: {
    name: 'Viracopos/Campinas (Aeroporto)',
    cep: '13052-900'
  },
  saoPauloCapital: {
    name: 'São Paulo Capital',
    cep: '01000-000',
    cepRange: { start: '01000-000', end: '05999-999' }
  },
  saoPauloCapitalContinuacao: {
    name: 'São Paulo Capital (Continuação)',
    cep: '08000-000',
    cepRange: { start: '08000-000', end: '08499-999' }
  },
  zonaOesteSP: {
    name: 'Zona Oeste de São Paulo',
    cep: '05000-000',
    cepRange: { start: '05000-000', end: '05999-999' }
  },
  zonaSulSP: {
    name: 'Zona Sul de São Paulo',
    cep: '04000-000',
    cepRange: { start: '04000-000', end: '04999-999' }
  },
  zonaLesteSP: {
    name: 'Zona Leste de São Paulo',
    cep: '03000-000',
    cepRange: { start: '03000-000', end: '03999-999' }
  },
  diadema: {
    name: 'Diadema',
    cep: '09900-000',
    cepRange: { start: '09900-000', end: '09999-999' }
  },
  saoBernardo: {
    name: 'São Bernardo do Campo',
    cep: '09600-000',
    cepRange: { start: '09600-000', end: '09899-999' }
  },
  santoAndre: {
    name: 'Santo André',
    cep: '09000-000',
    cepRange: { start: '09000-000', end: '09299-999' }
  },
  maua: {
    name: 'Mauá',
    cep: '09300-000',
    cepRange: { start: '09300-000', end: '09399-999' }
  },
  ribeiraPires: {
    name: 'Ribeirão Pires',
    cep: '09400-000',
    cepRange: { start: '09400-000', end: '09449-999' }
  },
  rioGrandeSerra: {
    name: 'Rio Grande da Serra',
    cep: '09450-000',
    cepRange: { start: '09450-000', end: '09499-999' }
  },
  saoCaetano: {
    name: 'São Caetano do Sul',
    cep: '09500-000',
    cepRange: { start: '09500-000', end: '09599-999' }
  },
  grandeSaoPaulo: {
    name: 'Grande São Paulo',
    cep: '06000-000',
    cepRange: { start: '06000-000', end: '09999-999' }
  },
  // Novas regiões com preços negociáveis
  osasco: {
    name: 'Osasco',
    cep: '06000-000',
    cepRange: { start: '06000-000', end: '06299-999' }
  },
  carapicuiba: {
    name: 'Carapicuíba',
    cep: '06300-000',
    cepRange: { start: '06300-000', end: '06399-999' }
  },
  barueriAlphaville: {
    name: 'Barueri (Alphaville)',
    cep: '06454-000',
    cepRange: { start: '06454-000', end: '06455-040' }
  },
  barueriAlphavilleResidencial: {
    name: 'Barueri (Alphaville Residencial Um)',
    cep: '06474-000',
    cepRange: { start: '06474-000', end: '06474-330' }
  },
  santanaParnaiba: {
    name: 'Santana de Parnaíba',
    cep: '06500-000',
    cepRange: { start: '06500-000', end: '06549-999' }
  },
  itapevi: {
    name: 'Itapevi',
    cep: '06650-000',
    cepRange: { start: '06650-000', end: '06699-999' }
  },
  cotia: {
    name: 'Cotia',
    cep: '06700-000',
    cepRange: { start: '06700-000', end: '06729-999' }
  },
  vargemGrandePaulista: {
    name: 'Vargem Grande Paulista',
    cep: '06730-000',
    cepRange: { start: '06730-000', end: '06749-999' }
  },
  taboaoSerra: {
    name: 'Taboão da Serra',
    cep: '06750-000',
    cepRange: { start: '06750-000', end: '06799-999' }
  },
  itapecerica: {
    name: 'Itapecerica da Serra',
    cep: '06850-000',
    cepRange: { start: '06850-000', end: '06889-999' }
  }
};

// Tabela de preços DE → PARA baseada em CEPs
export const CEP_PRICE_ROUTES: CepPriceRoute[] = [
  // Congonhas para regiões de São Paulo
  {
    from: 'congonhas',
    to: 'paulista',
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
    to: 'itaim',
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
    to: 'vilaOlimpia',
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
    to: 'pinheiros',
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
    to: 'lapa',
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
    to: 'butanta',
    prices: {
      executivoSedan: 240.00,
      executivoComum: 330.00,
      executivoPremiumBlindado: 650.00,
      minivanComum: 650.00,
      minivanBlindada: 1150.00,
      van15Lugares: 790.00
    }
  },
  // Novas rotas Congonhas para regiões específicas
  {
    from: 'congonhas',
    to: 'zonaOesteSP',
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
    to: 'zonaSulSP',
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
    to: 'zonaLesteSP',
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
    to: 'diadema',
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
    to: 'saoBernardo',
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
    to: 'santoAndre',
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
    to: 'maua',
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
    to: 'ribeiraPires',
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
    to: 'rioGrandeSerra',
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
    to: 'saoCaetano',
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
    to: 'saoPauloCapital',
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
      to: 'saoPauloCapitalContinuacao',
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
      to: 'saoPauloCapital',
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
      to: 'saoPauloCapitalContinuacao',
      prices: {
        executivoSedan: 310.00,
        executivoComum: 380.00,
        executivoPremiumBlindado: 850.00,
        minivanComum: 720.00,
        minivanBlindada: 1350.00,
        van15Lugares: 990.00
      }
    },
  // Guarulhos para regiões de São Paulo
  {
    from: 'guarulhos',
    to: 'paulista',
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
    to: 'itaim',
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
    to: 'vilaOlimpia',
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
    to: 'pinheiros',
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
    to: 'lapa',
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
    to: 'butanta',
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  // Novas rotas GRU para regiões específicas
  {
    from: 'guarulhos',
    to: 'zonaOesteSP',
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
    to: 'zonaSulSP',
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
    to: 'zonaLesteSP',
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
    to: 'diadema',
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
    to: 'saoBernardo',
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
    to: 'santoAndre',
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
    to: 'maua',
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
    to: 'ribeiraPires',
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
    to: 'rioGrandeSerra',
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
    to: 'saoCaetano',
    prices: {
      executivoSedan: 310.00,
      executivoComum: 380.00,
      executivoPremiumBlindado: 850.00,
      minivanComum: 720.00,
      minivanBlindada: 1350.00,
      van15Lugares: 990.00
    }
  },
  // Viracopos para Grande São Paulo},
  {
    from: 'guarulhos',
    to: 'congonhas',
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
    from: 'viracopos',
    to: 'grandeSaoPaulo',
    prices: {
      executivoSedan: 690.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1100.00,
      minivanBlindada: 1800.00,
      van15Lugares: 1390.00
    }
  },
  // Congonhas para Alphaville/Osasco/Carapicuíba
  {
    from: 'congonhas',
    to: 'alphaville',
    prices: {
      executivoSedan: 390.00,
      executivoComum: 490.00,
      executivoPremiumBlindado: 890.00,
      minivanComum: 790.00,
      minivanBlindada: 1450.00,
      van15Lugares: 790.00
    }
  },
  {
    from: 'congonhas',
    to: 'osasco',
    prices: {
      executivoSedan: 390.00,
      executivoComum: 490.00,
      executivoPremiumBlindado: 890.00,
      minivanComum: 790.00,
      minivanBlindada: 1450.00,
      van15Lugares: 790.00
    }
  },
  {
    from: 'congonhas',
    to: 'carapicuiba',
    prices: {
      executivoSedan: 390.00,
      executivoComum: 490.00,
      executivoPremiumBlindado: 890.00,
      minivanComum: 790.00,
      minivanBlindada: 1450.00,
      van15Lugares: 790.00
    }
  },
  // Guarulhos para Alphaville/Osasco/Carapicuíba
  {
    from: 'guarulhos',
    to: 'alphaville',
    prices: {
      executivoSedan: 440.00,
      executivoComum: 540.00,
      executivoPremiumBlindado: 990.00,
      minivanComum: 890.00,
      minivanBlindada: 1600.00,
      van15Lugares: 890.00
    }
  },
  {
    from: 'guarulhos',
    to: 'osasco',
    prices: {
      executivoSedan: 440.00,
      executivoComum: 540.00,
      executivoPremiumBlindado: 990.00,
      minivanComum: 890.00,
      minivanBlindada: 1600.00,
      van15Lugares: 890.00
    }
  },
  {
    from: 'guarulhos',
    to: 'carapicuiba',
    prices: {
      executivoSedan: 440.00,
      executivoComum: 540.00,
      executivoPremiumBlindado: 990.00,
      minivanComum: 890.00,
      minivanBlindada: 1600.00,
      van15Lugares: 890.00
    }
  },
  // Congonhas → Porto de Santos
  {
    from: 'congonhas',
    to: 'portoSantos',
    prices: {
      executivoSedan: 890.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1090.00,
      minivanBlindada: 2100.00,
      van15Lugares: 1290.00
    }
  },
  // Guarulhos → Porto de Santos
  {
    from: 'guarulhos',
    to: 'portoSantos',
    prices: {
      executivoSedan: 890.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1290.00,
      minivanBlindada: 2100.00,
      van15Lugares: 1590.00
    }
  },

  // Rotas reversas para Guarulhos Região
  {
    from: 'saoPauloCapital',
    to: 'guarulhosRegiao',
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
    from: 'saoPauloCapitalContinuacao',
    to: 'guarulhosRegiao',
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
    from: 'diadema',
    to: 'guarulhosRegiao',
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
    from: 'saoBernardo',
    to: 'guarulhosRegiao',
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
    from: 'santoAndre',
    to: 'guarulhosRegiao',
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
    from: 'maua',
    to: 'guarulhosRegiao',
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
    from: 'ribeiraPires',
    to: 'guarulhosRegiao',
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
    from: 'rioGrandeSerra',
    to: 'guarulhosRegiao',
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
    from: 'saoCaetano',
    to: 'guarulhosRegiao',
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
    from: 'congonhas',
    to: 'guarulhosRegiao',
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
    to: 'guarulhosRegiao',
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
    from: 'santoAndre',
    to: 'guarulhosRegiao',
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
    from: 'maua',
    to: 'guarulhosRegiao',
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
    from: 'ribeirãoPires',
    to: 'guarulhosRegiao',
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
    from: 'rioGrandeDaSerra',
    to: 'guarulhosRegiao',
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
    from: 'saoCaetanoDoSul',
    to: 'guarulhosRegiao',
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
    from: 'saoBernardoDoCampo',
    to: 'guarulhosRegiao',
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
    from: 'diadema',
    to: 'guarulhosRegiao',
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
    from: 'viracopos',
    to: 'saoPauloCapital',
    prices: {
      executivoSedan: 690.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1100.00,
      minivanBlindada: 1800.00,
      van15Lugares: 990.00
    }
  },
  {
    from: 'viracopos',
    to: 'guarulhosRegiao',
    prices: {
      executivoSedan: 690.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1100.00,
      minivanBlindada: 1800.00,
      van15Lugares: 990.00
    }
  },

  {
    from: 'guarulhos',
    to: 'alphaville',
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
    from: 'congonhas',
    to: 'portoSantos',
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
    from: 'guarulhos',
    to: 'portoSantos',
    prices: {
      executivoSedan: 690.00,
      executivoComum: 890.00,
      executivoPremiumBlindado: 1450.00,
      minivanComum: 1290.00,
      minivanBlindada: 2100.00,
      van15Lugares: 1290.00
    }
  }
];

// Função para normalizar CEP (remove pontos, hífens e espaços)
export const normalizeCep = (cep: string): string => {
  return cep.replace(/[^0-9]/g, '');
};

// Função para verificar se um CEP está na faixa da Grande São Paulo
export const isInGrandeSaoPauloRange = (cep: string): boolean => {
  const normalizedCep = normalizeCep(cep);
  const cepNumber = parseInt(normalizedCep);
  return cepNumber >= 6000000 && cepNumber <= 9999999;
};

// Função para verificar se um CEP está na região intra-regional da Grande São Paulo
export const isInIntraRegionalGrandeSaoPaulo = (cep: string): boolean => {
  const normalizedCep = normalizeCep(cep);
  const cepNumber = parseInt(normalizedCep);
  
  // Verificar todas as faixas específicas da região intra-regional
  return (
    // Av. Paulista
    (cepNumber >= 1310100 && cepNumber <= 1310100) ||
    // Itaim Bibi
    (cepNumber >= 4532060 && cepNumber <= 4532060) ||
    // Vila Olímpia
    (cepNumber >= 4551000 && cepNumber <= 4551000) ||
    // Pinheiros
    (cepNumber >= 5422000 && cepNumber <= 5422000) ||
    // Lapa
    (cepNumber >= 5075010 && cepNumber <= 5075010) ||
    // Butantã
    (cepNumber >= 5508900 && cepNumber <= 5508900) ||
    // Congonhas
    (cepNumber >= 4626000 && cepNumber <= 4627999) ||
    // São Paulo Capital
    (cepNumber >= 1000000 && cepNumber <= 5999999) ||
    // São Paulo Capital (Continuação)
    (cepNumber >= 8000000 && cepNumber <= 8499999) ||
    // Zona Oeste
    (cepNumber >= 5000000 && cepNumber <= 5999999) ||
    // Zona Sul
    (cepNumber >= 4000000 && cepNumber <= 4999999) ||
    // Zona Leste
    (cepNumber >= 3000000 && cepNumber <= 3999999) ||
    // Alphaville Centro Industrial e Empresarial
    (cepNumber >= 6454000 && cepNumber <= 6455040) ||
    // Alphaville Residencial Um
    (cepNumber >= 6474000 && cepNumber <= 6474330) ||
    // Osasco
    (cepNumber >= 6000000 && cepNumber <= 6299999) ||
    // Carapicuíba
    (cepNumber >= 6300000 && cepNumber <= 6399999) ||
    // Diadema
    (cepNumber >= 9900000 && cepNumber <= 9999999) ||
    // São Bernardo do Campo
    (cepNumber >= 9600000 && cepNumber <= 9899999) ||
    // Santo André
    (cepNumber >= 9000000 && cepNumber <= 9299999) ||
    // Mauá
    (cepNumber >= 9300000 && cepNumber <= 9399999) ||
    // Ribeirão Pires
    (cepNumber >= 9400000 && cepNumber <= 9449999) ||
    // Rio Grande da Serra
    (cepNumber >= 9450000 && cepNumber <= 9499999) ||
    // São Caetano do Sul
    (cepNumber >= 9500000 && cepNumber <= 9599999)
  );
};

// Função para identificar região baseada no CEP
export const identifyRegionByCep = (cep: string): string | null => {
  const normalizedCep = normalizeCep(cep);
  const cepNumber = parseInt(normalizedCep);
  
  console.log(`🔍 Identificando região para CEP: ${cep} → normalizado: ${normalizedCep}`);
  
  // Verificar faixas específicas para tarifas fixas do GRU
  // Aeroporto de Guarulhos (origem)
  if (cepNumber >= 7190000 && cepNumber <= 7200999) {
    console.log(`✅ CEP ${cep} identificado como Guarulhos/GRU`);
    return 'guarulhos';
  }
  

  
  // Zona Oeste de São Paulo (Perdizes, Pinheiros, Morumbi, Butantã, Lapa)
  if (cepNumber >= 5000000 && cepNumber <= 5999999) {
    console.log(`✅ CEP ${cep} identificado como Zona Oeste SP`);
    return 'zonaOesteSP';
  }
  
  // Aeroporto de Congonhas (verificar antes da Zona Sul)
  if (cepNumber >= 4626000 && cepNumber <= 4627999) {
    console.log(`✅ CEP ${cep} identificado como Congonhas`);
    return 'congonhas';
  }
  
  // Zona Sul de São Paulo (Interlagos, Santo Amaro, Capela, Socorro, Grajaú, Parelheiros)
  if (cepNumber >= 4000000 && cepNumber <= 4999999) {
    console.log(`✅ CEP ${cep} identificado como Zona Sul SP`);
    return 'zonaSulSP';
  }
  
  // Zona Leste de São Paulo (Tatuapé, Carrão, Aricanduva, Vila Formosa, Penha, Itaquera)
  if (cepNumber >= 3000000 && cepNumber <= 3999999) {
    console.log(`✅ CEP ${cep} identificado como Zona Leste SP`);
    return 'zonaLesteSP';
  }
  
  // ABC Paulista - Diadema
  if (cepNumber >= 9900000 && cepNumber <= 9999999) {
    console.log(`✅ CEP ${cep} identificado como Diadema`);
    return 'diadema';
  }
  
  // ABC Paulista - São Bernardo do Campo
  if (cepNumber >= 9600000 && cepNumber <= 9899999) {
    console.log(`✅ CEP ${cep} identificado como São Bernardo do Campo`);
    return 'saoBernardo';
  }
  
  // ABC Paulista - Santo André
  if (cepNumber >= 9000000 && cepNumber <= 9299999) {
    console.log(`✅ CEP ${cep} identificado como Santo André`);
    return 'santoAndre';
  }
  
  // ABC Paulista - Mauá
  if (cepNumber >= 9300000 && cepNumber <= 9399999) {
    console.log(`✅ CEP ${cep} identificado como Mauá`);
    return 'maua';
  }
  
  // Verificar regiões específicas com preços negociáveis
  // Osasco
  if (cepNumber >= 6000000 && cepNumber <= 6299999) {
    console.log(`✅ CEP ${cep} identificado como Osasco`);
    return 'osasco';
  }
  
  // Carapicuíba
  if (cepNumber >= 6300000 && cepNumber <= 6399999) {
    console.log(`✅ CEP ${cep} identificado como Carapicuíba`);
    return 'carapicuiba';
  }
  
  // Barueri (Alphaville)
  if (cepNumber >= 6400000 && cepNumber <= 6499999) {
    console.log(`✅ CEP ${cep} identificado como Barueri (Alphaville)`);
    return 'barueriAlphaville';
  }
  
  // Santana de Parnaíba
  if (cepNumber >= 6500000 && cepNumber <= 6549999) {
    console.log(`✅ CEP ${cep} identificado como Santana de Parnaíba`);
    return 'santanaParnaiba';
  }
  
  // Itapevi
  if (cepNumber >= 6650000 && cepNumber <= 6699999) {
    console.log(`✅ CEP ${cep} identificado como Itapevi`);
    return 'itapevi';
  }
  
  // Cotia
  if (cepNumber >= 6700000 && cepNumber <= 6729999) {
    console.log(`✅ CEP ${cep} identificado como Cotia`);
    return 'cotia';
  }
  
  // Vargem Grande Paulista
  if (cepNumber >= 6730000 && cepNumber <= 6749999) {
    console.log(`✅ CEP ${cep} identificado como Vargem Grande Paulista`);
    return 'vargemGrandePaulista';
  }
  
  // Taboão da Serra
  if (cepNumber >= 6750000 && cepNumber <= 6799999) {
    console.log(`✅ CEP ${cep} identificado como Taboão da Serra`);
    return 'taboaoSerra';
  }
  
  // Itapecerica da Serra
  if (cepNumber >= 6850000 && cepNumber <= 6889999) {
    console.log(`✅ CEP ${cep} identificado como Itapecerica da Serra`);
    return 'itapecerica';
  }

  // Verificar se está na faixa da Grande São Paulo (outras regiões)
  if (isInGrandeSaoPauloRange(cep)) {
    console.log(`✅ CEP ${cep} identificado como Grande São Paulo`);
    return 'grandeSaoPaulo';
  }
  
  // Buscar por CEP exato
  for (const [regionKey, regionInfo] of Object.entries(CEP_REGIONS)) {
    const normalizedRegionCep = normalizeCep(regionInfo.cep);
    
    if (normalizedCep === normalizedRegionCep) {
      console.log(`✅ CEP ${cep} identificado como ${regionKey}`);
      return regionKey;
    }
  }
  
  console.log(`❌ Região não identificada para CEP: ${cep}`);
  return null;
};

// Função para verificar se uma rota é negociável (aeroportos para regiões específicas)
export const isNegotiableRoute = (originRegion: string, destinationRegion: string): boolean => {
  const airportRegions = ['guarulhos', 'congonhas'];
  const negotiableDestinations = [
    'osasco', 'carapicuiba', 'barueriAlphaville', 'santanaParnaiba', 
    'itapevi', 'cotia', 'vargemGrandePaulista', 'taboaoSerra', 'itapecerica'
  ];
  
  // Verificar se origem é aeroporto e destino é região negociável
  const isAirportToNegotiable = airportRegions.includes(originRegion) && negotiableDestinations.includes(destinationRegion);
  
  // Verificar se origem é região negociável e destino é aeroporto (rota inversa)
  const isNegotiableToAirport = negotiableDestinations.includes(originRegion) && airportRegions.includes(destinationRegion);
  
  return isAirportToNegotiable || isNegotiableToAirport;
};

// Função para buscar preço baseado em CEPs (bidirecional)
export const findPriceByCep = (
  originCep: string,
  destinationCep: string,
  vehicleType: keyof CepPriceRoute['prices']
): number | null => {
  const originRegion = identifyRegionByCep(originCep);
  const destinationRegion = identifyRegionByCep(destinationCep);
  
  console.log(`💰 Buscando preço por CEP: ${originCep} (${originRegion}) → ${destinationCep} (${destinationRegion}) [${vehicleType}]`);
  
  if (!originRegion || !destinationRegion) {
    console.log(`❌ Uma das regiões não foi identificada`);
    return null;
  }
  
  // Verificar se ambos os CEPs estão na região intra-regional da Grande São Paulo
  if (isInIntraRegionalGrandeSaoPaulo(originCep) && isInIntraRegionalGrandeSaoPaulo(destinationCep)) {
    console.log(`🏙️ Rota intra-regional da Grande São Paulo detectada`);
    
    // Preços específicos para viagens dentro da região da Grande São Paulo
    const intraRegionalPrices = {
      executivoSedan: 240.00,
      executivoComum: 330.00,
      executivoPremiumBlindado: 650.00,
      minivanComum: 650.00,
      minivanBlindada: 1150.00,
      van15Lugares: 790.00
    };
    
    const price = intraRegionalPrices[vehicleType];
    if (price !== undefined) {
      console.log(`✅ Preço intra-regional encontrado: R$ ${price.toFixed(2)}`);
      return price;
    }
  }
  
  // Verificar se é uma rota negociável
  if (isNegotiableRoute(originRegion, destinationRegion)) {
    console.log(`🤝 Rota negociável detectada: ${originRegion} ↔ ${destinationRegion}`);
    return -1; // Valor especial para indicar rota negociável
  }
  
  // Buscar rota direta
  const directRoute = CEP_PRICE_ROUTES.find(route => 
    route.from === originRegion && route.to === destinationRegion
  );
  
  if (directRoute && directRoute.prices[vehicleType] !== undefined) {
    const price = directRoute.prices[vehicleType];
    console.log(`✅ Preço encontrado (rota direta): R$ ${price.toFixed(2)}`);
    return price;
  }
  
  // Buscar rota inversa (preço bidirecional)
  const reverseRoute = CEP_PRICE_ROUTES.find(route => 
    route.from === destinationRegion && route.to === originRegion
  );
  
  if (reverseRoute && reverseRoute.prices[vehicleType] !== undefined) {
    const price = reverseRoute.prices[vehicleType];
    console.log(`✅ Preço encontrado (rota inversa - bidirecional): R$ ${price.toFixed(2)}`);
    return price;
  }
  
  console.log(`❌ Preço não encontrado para esta rota`);
  return null;
};

// Função para obter informações da região por CEP
export const getRegionInfoByCep = (cep: string): CepRegion | null => {
  const regionKey = identifyRegionByCep(cep);
  if (!regionKey) return null;
  
  return CEP_REGIONS[regionKey];
};

// Função para listar todas as rotas disponíveis
export const getAllAvailableRoutes = (): { from: string; to: string; fromName: string; toName: string }[] => {
  const routes: { from: string; to: string; fromName: string; toName: string }[] = [];
  
  CEP_PRICE_ROUTES.forEach(route => {
    const fromRegion = CEP_REGIONS[route.from];
    const toRegion = CEP_REGIONS[route.to];
    
    if (fromRegion && toRegion) {
      routes.push({
        from: route.from,
        to: route.to,
        fromName: fromRegion.name,
        toName: toRegion.name
      });
      
      // Adicionar rota inversa (bidirecional)
      routes.push({
        from: route.to,
        to: route.from,
        fromName: toRegion.name,
        toName: fromRegion.name
      });
    }
  });
  
  return routes;
};