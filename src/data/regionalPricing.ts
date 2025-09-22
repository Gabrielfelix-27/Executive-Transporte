// Sistema de Preços Regionais - São Paulo e Grande São Paulo
// Preços fixos para viagens dentro da mesma região metropolitana

export interface RegionalArea {
  name: string;
  cep?: string;
  cepRanges?: { start: string; end: string }[];
  aliases?: string[]; // Nomes alternativos para reconhecimento
}

export interface RegionalPrices {
  executivoSedan: number;
  executivoComum: number;
  executivoPremiumBlindado: number;
  minivanComum: number;
  minivanBlindada: number;
  van15Lugares: number;
}

// Definição das áreas regionais conforme especificação
export const REGIONAL_AREAS: { [key: string]: RegionalArea } = {
  // Bairros específicos com CEPs únicos
  avPaulista: {
    name: 'Av. Paulista',
    cep: '01310-100',
    aliases: ['paulista', 'avenida paulista', 'av paulista']
  },
  itaimBibi: {
    name: 'Itaim Bibi',
    cep: '04532-060',
    aliases: ['itaim', 'itaim bibi']
  },
  vilaOlimpia: {
    name: 'Vila Olímpia',
    cep: '04551-000',
    aliases: ['vila olimpia', 'olimpia']
  },
  pinheiros: {
    name: 'Pinheiros',
    cep: '05422-000',
    aliases: ['pinheiros']
  },
  lapa: {
    name: 'Lapa',
    cep: '05075-010',
    aliases: ['lapa']
  },
  butanta: {
    name: 'Butantã',
    cep: '05508-900',
    aliases: ['butanta', 'butantã']
  },
  
  // Aeroportos
  congonhas: {
    name: 'Congonhas',
    cepRanges: [{ start: '04626-000', end: '04627-999' }],
    aliases: ['congonhas', 'aeroporto congonhas', 'cgh']
  },
  
  // Zonas de São Paulo Capital
  saoPauloCapital: {
    name: 'São Paulo Capital',
    cepRanges: [
      { start: '01000-000', end: '05999-999' },
      { start: '08000-000', end: '08499-999' }
    ],
    aliases: ['sao paulo', 'são paulo', 'capital', 'sp capital']
  },
  
  zonaOeste: {
    name: 'Zona Oeste',
    cepRanges: [{ start: '05000-000', end: '05999-999' }],
    aliases: ['zona oeste', 'oeste sp']
  },
  
  zonaSul: {
    name: 'Zona Sul',
    cepRanges: [{ start: '04000-000', end: '04999-999' }],
    aliases: ['zona sul', 'sul sp']
  },
  
  zonaLeste: {
    name: 'Zona Leste',
    cepRanges: [{ start: '03000-000', end: '03999-999' }],
    aliases: ['zona leste', 'leste sp']
  },
  
  // Cidades do ABC e Grande São Paulo
  diadema: {
    name: 'Diadema',
    cepRanges: [{ start: '09900-000', end: '09999-999' }],
    aliases: ['diadema']
  },
  
  saoBernardoCampo: {
    name: 'São Bernardo do Campo',
    cepRanges: [{ start: '09600-000', end: '09899-999' }],
    aliases: ['sao bernardo', 'são bernardo', 'sbc', 'são bernardo do campo']
  },
  
  santoAndre: {
    name: 'Santo André',
    cepRanges: [{ start: '09000-000', end: '09299-999' }],
    aliases: ['santo andre', 'santo andré']
  },
  
  maua: {
    name: 'Mauá',
    cepRanges: [{ start: '09300-000', end: '09399-999' }],
    aliases: ['maua', 'mauá']
  },
  
  ribeiraPires: {
    name: 'Ribeirão Pires',
    cepRanges: [{ start: '09400-000', end: '09449-999' }],
    aliases: ['ribeirao pires', 'ribeirão pires']
  },
  
  rioGrandeSerra: {
    name: 'Rio Grande da Serra',
    cepRanges: [{ start: '09450-000', end: '09499-999' }],
    aliases: ['rio grande da serra', 'rio grande serra']
  },
  
  saoCaetanoSul: {
    name: 'São Caetano do Sul',
    cepRanges: [{ start: '09500-000', end: '09599-999' }],
    aliases: ['sao caetano', 'são caetano', 'scs', 'são caetano do sul']
  }
};

// Preços regionais fixos para viagens dentro da região metropolitana
export const REGIONAL_PRICES: RegionalPrices = {
  executivoSedan: 240.00,
  executivoComum: 330.00,
  executivoPremiumBlindado: 650.00,
  minivanComum: 650.00,
  minivanBlindada: 1150.00,
  van15Lugares: 790.00
};

/**
 * Verifica se um CEP está dentro de uma área regional
 */
export function isInRegionalArea(cep: string, area: RegionalArea): boolean {
  const cleanCep = cep.replace(/\D/g, '');
  
  // Verifica CEP específico
  if (area.cep) {
    const areaCep = area.cep.replace(/\D/g, '');
    return cleanCep === areaCep;
  }
  
  // Verifica faixas de CEP
  if (area.cepRanges) {
    return area.cepRanges.some(range => {
      const startCep = parseInt(range.start.replace(/\D/g, ''));
      const endCep = parseInt(range.end.replace(/\D/g, ''));
      const targetCep = parseInt(cleanCep);
      
      return targetCep >= startCep && targetCep <= endCep;
    });
  }
  
  return false;
}

/**
 * Verifica se um nome/endereço corresponde a uma área regional
 */
export function findRegionalAreaByName(locationName: string): RegionalArea | null {
  const normalizedName = locationName.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .trim();
  
  for (const area of Object.values(REGIONAL_AREAS)) {
    // Verifica nome principal
    const normalizedAreaName = area.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    
    if (normalizedName.includes(normalizedAreaName) || normalizedAreaName.includes(normalizedName)) {
      return area;
    }
    
    // Verifica aliases
    if (area.aliases) {
      for (const alias of area.aliases) {
        const normalizedAlias = alias.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        
        if (normalizedName.includes(normalizedAlias) || normalizedAlias.includes(normalizedName)) {
          return area;
        }
      }
    }
  }
  
  return null;
}

/**
 * Verifica se dois CEPs estão na mesma região metropolitana
 */
export function areInSameRegion(cep1: string, cep2: string): boolean {
  let area1: RegionalArea | null = null;
  let area2: RegionalArea | null = null;
  
  // Encontra as áreas para cada CEP
  for (const area of Object.values(REGIONAL_AREAS)) {
    if (isInRegionalArea(cep1, area)) {
      area1 = area;
    }
    if (isInRegionalArea(cep2, area)) {
      area2 = area;
    }
  }
  
  // Se ambos estão em áreas definidas, verifica se são a mesma ou se ambos estão na região metropolitana
  if (area1 && area2) {
    return area1 === area2 || (isMetropolitanArea(area1) && isMetropolitanArea(area2));
  }
  
  return false;
}

/**
 * Verifica se dois nomes de localização estão na mesma região
 */
export function areLocationNamesInSameRegion(location1: string, location2: string): boolean {
  const area1 = findRegionalAreaByName(location1);
  const area2 = findRegionalAreaByName(location2);
  
  if (area1 && area2) {
    return area1 === area2 || (isMetropolitanArea(area1) && isMetropolitanArea(area2));
  }
  
  return false;
}

/**
 * Verifica se uma área faz parte da região metropolitana
 */
function isMetropolitanArea(area: RegionalArea): boolean {
  const metropolitanAreas = [
    'São Paulo Capital', 'Zona Oeste', 'Zona Sul', 'Zona Leste',
    'Av. Paulista', 'Itaim Bibi', 'Vila Olímpia', 'Pinheiros', 'Lapa', 'Butantã',
    'Congonhas', 'Diadema', 'São Bernardo do Campo', 'Santo André', 'Mauá',
    'Ribeirão Pires', 'Rio Grande da Serra', 'São Caetano do Sul'
  ];
  
  return metropolitanAreas.includes(area.name);
}

/**
 * Obtém preços regionais se aplicável
 */
export function getRegionalPrice(
  fromCep: string, 
  toCep: string, 
  fromLocation?: string, 
  toLocation?: string
): RegionalPrices | null {
  // Verifica primeiro por CEP
  if (fromCep && toCep && areInSameRegion(fromCep, toCep)) {
    return REGIONAL_PRICES;
  }
  
  // Verifica por nome de localização
  if (fromLocation && toLocation && areLocationNamesInSameRegion(fromLocation, toLocation)) {
    return REGIONAL_PRICES;
  }
  
  return null;
}