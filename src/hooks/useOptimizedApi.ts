import { useState, useEffect, useCallback, useRef } from 'react';

// Cache global para requisições
const apiCache = new Map<string, { data: any; timestamp: number; ttl: number }>();

// Debounce personalizado
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook para requisições otimizadas
export function useOptimizedApi<T>(
  apiFunction: (query: string) => Promise<T>,
  query: string,
  options: {
    debounceMs?: number;
    cacheKey?: string;
    cacheTtl?: number; // Time to live em ms
    enabled?: boolean;
    minQueryLength?: number;
  } = {}
) {
  const {
    debounceMs = 300,
    cacheKey,
    cacheTtl = 5 * 60 * 1000, // 5 minutos
    enabled = true,
    minQueryLength = 2
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedQuery = useDebounce(query, debounceMs);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Função para verificar cache
  const getCachedData = useCallback((key: string): T | null => {
    if (!cacheKey) return null;
    
    const cached = apiCache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    
    // Remove cache expirado
    if (cached) {
      apiCache.delete(key);
    }
    
    return null;
  }, [cacheKey]);

  // Função para salvar no cache
  const setCachedData = useCallback((key: string, data: T) => {
    if (!cacheKey) return;
    
    apiCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: cacheTtl
    });
  }, [cacheKey, cacheTtl]);

  // Função principal de busca
  const fetchData = useCallback(async (searchQuery: string) => {
    if (!enabled || searchQuery.length < minQueryLength) {
      setData(null);
      return;
    }

    const fullCacheKey = cacheKey ? `${cacheKey}:${searchQuery}` : null;
    
    // Verificar cache primeiro
    if (fullCacheKey) {
      const cachedResult = getCachedData(fullCacheKey);
      if (cachedResult) {
        setData(cachedResult);
        setLoading(false);
        setError(null);
        return;
      }
    }

    // Cancelar requisição anterior
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Nova requisição
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(searchQuery);
      
      // Verificar se não foi cancelada
      if (!abortControllerRef.current.signal.aborted) {
        setData(result);
        
        // Salvar no cache
        if (fullCacheKey) {
          setCachedData(fullCacheKey, result);
        }
      }
    } catch (err) {
      if (!abortControllerRef.current.signal.aborted) {
        setError(err instanceof Error ? err.message : 'Erro na requisição');
        setData(null);
      }
    } finally {
      if (!abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  }, [apiFunction, enabled, minQueryLength, cacheKey, getCachedData, setCachedData]);

  // Effect para executar busca quando query mudar
  useEffect(() => {
    fetchData(debouncedQuery);
    
    // Cleanup
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedQuery, fetchData]);

  // Função para limpar cache específico
  const clearCache = useCallback(() => {
    if (cacheKey) {
      const keysToDelete = Array.from(apiCache.keys()).filter(key => 
        key.startsWith(`${cacheKey}:`)
      );
      keysToDelete.forEach(key => apiCache.delete(key));
    }
  }, [cacheKey]);

  // Função para refetch manual
  const refetch = useCallback(() => {
    if (cacheKey) {
      clearCache();
    }
    fetchData(debouncedQuery);
  }, [clearCache, fetchData, debouncedQuery, cacheKey]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache
  };
}

// Hook específico para busca de endereços
export function useAddressSearch(
  query: string,
  searchFunction: (query: string) => Promise<any[]>,
  options?: {
    debounceMs?: number;
    minQueryLength?: number;
    enabled?: boolean;
  }
) {
  return useOptimizedApi(
    searchFunction,
    query,
    {
      ...options,
      cacheKey: 'address-search',
      cacheTtl: 10 * 60 * 1000 // 10 minutos para endereços
    }
  );
}

// Função para limpar todo o cache
export function clearAllApiCache() {
  apiCache.clear();
}

// Função para obter estatísticas do cache
export function getCacheStats() {
  const now = Date.now();
  const entries = Array.from(apiCache.entries());
  
  return {
    totalEntries: entries.length,
    validEntries: entries.filter(([, value]) => now - value.timestamp < value.ttl).length,
    expiredEntries: entries.filter(([, value]) => now - value.timestamp >= value.ttl).length,
    totalSize: JSON.stringify(Array.from(apiCache.values())).length
  };
}