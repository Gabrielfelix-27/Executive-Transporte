// Função para detectar rotas bloqueadas de/para São Paulo sentido Viracopos, Sorocaba, Campinas

/**
 * Verifica se uma rota deve ser bloqueada baseada nas regras:
 * - Rotas saindo de SP para Viracopos, Sorocaba, Campinas
 * - Rotas voltando de Viracopos, Sorocaba, Campinas para SP
 */
export const isBlockedRoute = (origin: string, destination: string): boolean => {
  const originLower = origin.toLowerCase().trim();
  const destinationLower = destination.toLowerCase().trim();

  // Função para detectar se é São Paulo (capital ou região metropolitana)
  const isSaoPauloRegion = (address: string): boolean => {
    const spKeywords = [
      'são paulo', 'sao paulo', 'sp',
      'centro', 'república', 'sé', 'liberdade', 'bela vista',
      'consolação', 'higienópolis', 'santa cecília', 'campos elíseos',
      'bom retiro', 'luz', 'brás', 'pari', 'canindé',
      'vila guilherme', 'santana', 'tucuruvi', 'jaçanã',
      'zona norte', 'zona sul', 'zona leste', 'zona oeste',
      'paulista', 'avenida paulista', 'itaim', 'itaim bibi',
      'vila olímpia', 'vila olimpia', 'pinheiros', 'lapa',
      'perdizes', 'pompeia', 'barra funda', 'agua branca',
      'vila leopoldina', 'jaguare', 'rio pequeno', 'raposo tavares',
      'butanta', 'butantã', 'morumbi', 'vila sonia', 'jardim paulista',
      'vila mariana', 'saude', 'saúde', 'cursino', 'ipiranga',
      'sacoma', 'jabaquara', 'cidade ademar', 'pedreira',
      'cidade dutra', 'socorro', 'cidade tiradentes', 'grajaú',
      'parelheiros', 'mooca', 'tatuape', 'tatuapé', 'penha',
      'vila formosa', 'vila matilde', 'vila prudente', 'sapopemba',
      'vila carrão', 'aricanduva', 'itaquera', 'guaianases',
      'lajeado', 'itaim paulista', 'jardins', 'cerqueira cesar',
      'cerqueira césar', 'paraíso', 'paraiso', 'aclimação',
      'cambuci', 'vila madalena', 'sumaré', 'sumare'
    ];

    // Verificar CEPs de São Paulo
    const spCepPatterns = [
      /\b0[1-5]\d{3}-?\d{3}\b/, // 01000-000 a 05999-999
      /\b08[0-4]\d{2}-?\d{3}\b/  // 08000-000 a 08499-999
    ];

    // Verificar se contém palavras-chave de SP
    const hasSpKeyword = spKeywords.some(keyword => address.includes(keyword));
    
    // Verificar se contém CEP de SP
    const hasSpCep = spCepPatterns.some(pattern => pattern.test(address));

    return hasSpKeyword || hasSpCep;
  };

  // Função para detectar Viracopos/Campinas
  const isViracoposCampinas = (address: string): boolean => {
    const viracoposKeywords = [
      'viracopos', 'vcp', 'aeroporto viracopos',
      'campinas', 'santos dumont', 'rod. santos dumont'
    ];

    // CEP do aeroporto de Viracopos
    const viracoposCepPattern = /\b13052-?\d{3}\b/;

    const hasViracoposKeyword = viracoposKeywords.some(keyword => address.includes(keyword));
    const hasViracoposCep = viracoposCepPattern.test(address);

    return hasViracoposKeyword || hasViracoposCep;
  };

  // Função para detectar Sorocaba
  const isSorocaba = (address: string): boolean => {
    const sorocabaKeywords = [
      'sorocaba', 'sorocaba sp'
    ];

    // CEPs de Sorocaba (18000-000 a 18999-999)
    const sorocabaCepPattern = /\b18\d{3}-?\d{3}\b/;

    const hasSorocabaKeyword = sorocabaKeywords.some(keyword => address.includes(keyword));
    const hasSorocabaCep = sorocabaCepPattern.test(address);

    return hasSorocabaKeyword || hasSorocabaCep;
  };

  // Verificar rotas bloqueadas:
  // 1. SP → Viracopos/Campinas
  if (isSaoPauloRegion(originLower) && isViracoposCampinas(destinationLower)) {
    return true;
  }

  // 2. SP → Sorocaba
  if (isSaoPauloRegion(originLower) && isSorocaba(destinationLower)) {
    return true;
  }

  // 3. Viracopos/Campinas → SP
  if (isViracoposCampinas(originLower) && isSaoPauloRegion(destinationLower)) {
    return true;
  }

  // 4. Sorocaba → SP
  if (isSorocaba(originLower) && isSaoPauloRegion(destinationLower)) {
    return true;
  }

  return false;
};

/**
 * Retorna a mensagem de consultor para rotas bloqueadas
 */
export const getBlockedRouteMessage = (): string => {
  return 'Esta rota requer negociação especial. Entre em contato com nosso consultor para obter um orçamento personalizado.';
};

/**
 * Função para debug - mostra quais critérios foram atendidos
 */
export const debugBlockedRoute = (origin: string, destination: string): void => {
  console.log('🚫 Verificando rota bloqueada:', { origin, destination });
  console.log('🚫 Resultado:', isBlockedRoute(origin, destination));
};