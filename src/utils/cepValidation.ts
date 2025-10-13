// Funções de validação de CEP para regras específicas de Viracopos

/**
 * Extrai apenas os números de um CEP, removendo formatação
 */
export const extractCepNumbers = (cep: string): string => {
  return cep.replace(/\D/g, '');
};

/**
 * Valida se o CEP de origem é válido para Viracopos
 * CEPs válidos: 13052-900 e 13052-970
 */
export const isValidViracoposOriginCep = (cep: string): boolean => {
  const cleanCep = extractCepNumbers(cep);
  const validCeps = ['13052900', '13052970'];
  return validCeps.includes(cleanCep);
};

/**
 * Valida se o CEP de destino está na Grande São Paulo
 * Intervalo válido: 06000-000 até 09999-999
 */
export const isValidGrandeSaoPauloDestinationCep = (cep: string): boolean => {
  const cleanCep = extractCepNumbers(cep);
  
  // Verificar se tem 8 dígitos
  if (cleanCep.length !== 8) {
    return false;
  }
  
  // Converter para número para comparação
  const cepNumber = parseInt(cleanCep, 10);
  
  // Verificar se está no intervalo 06000000 a 09999999
  return cepNumber >= 6000000 && cepNumber <= 9999999;
};

/**
 * Extrai CEP de um endereço usando regex
 * Suporta formatos: 12345-678, 12345678
 */
export const extractCepFromAddress = (address: string): string | null => {
  // Regex para CEP no formato 12345-678 ou 12345678
  const cepRegex = /\b(\d{5})-?(\d{3})\b/;
  const match = address.match(cepRegex);
  
  if (match) {
    return match[1] + match[2]; // Retorna sem hífen
  }
  
  return null;
};

/**
 * Valida se uma rota específica (origem + destino) atende às regras de Viracopos
 */
export const isValidViracoposRoute = (origin: string, destination: string): boolean => {
  const originCep = extractCepFromAddress(origin);
  const destinationCep = extractCepFromAddress(destination);
  
  // Se não conseguir extrair CEPs, verificar se contém palavras-chave
  if (!originCep || !destinationCep) {
    const originLower = origin.toLowerCase();
    const destinationLower = destination.toLowerCase();
    
    // Verificar se origem contém Viracopos/Campinas
    const isViracoposOrigin = originLower.includes('viracopos') || 
                             originLower.includes('campinas') ||
                             originLower.includes('santos dumont');
    
    // Verificar se destino contém São Paulo
    const isSaoPauloDestination = destinationLower.includes('são paulo') ||
                                 destinationLower.includes('sp') ||
                                 destinationLower.includes('grande são paulo');
    
    return isViracoposOrigin && isSaoPauloDestination;
  }
  
  // Validar CEPs extraídos
  return isValidViracoposOriginCep(originCep) && isValidGrandeSaoPauloDestinationCep(destinationCep);
};

/**
 * Mapeia tipos de veículo para as categorias específicas de Viracopos
 */
export const getViracoposPriceByVehicleType = (vehicleType: string): number | null => {
  const priceMapping: { [key: string]: number } = {
    // MiniVan Comum
    'suv': 1100.00,
    'minivanComum': 1100.00,
    
    // MiniVan Blindada
    'minivanBlindada': 1800.00,
    
    // Executivo Comum
    'economico': 890.00,
    'executivoComum': 890.00,
    
    // Executivo Sedan
    'executivo': 690.00,
    
    // Executivo Premium Blindado
    'luxo': 1450.00,
    'executivoPremiumBlindado': 1450.00,
    
    // Van 15 lugares (mantendo valor existente)
    'van15Lugares': 1390.00
  };
  
  return priceMapping[vehicleType] || null;
};