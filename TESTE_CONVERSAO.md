# 🧪 Teste de Conversão de Moeda

## Como Testar a Conversão

### 1. Abrir o Console do Navegador
- Pressione `F12` ou `Ctrl+Shift+I`
- Vá para a aba "Console"

### 2. Executar Testes

#### Teste Básico da Conversão
```javascript
// Exemplo: R$ 259,51 deve ser ~$46,51
const testAmount = 259.51;
const exchangeRate = 5.58; // Cotação atual
const convertedUSD = testAmount / exchangeRate;
console.log(`R$ ${testAmount} → $ ${convertedUSD.toFixed(2)}`);
```

#### Limpar Cache de Cotação
```javascript
// Execute no console para buscar cotação atualizada
window.currencyService?.clearCache();
```

#### Verificar Cotação Atual
```javascript
// Ver informações do cache
window.currencyService?.getCacheInfo();
```

### 3. Verificar Logs no Console

Procure por estes logs:
```
💱 Cotação obtida: 1 USD = R$ 5.58
💱 Conversão: R$ 259.51 → $ 46.51 (taxa: 5.58)
```

### 4. Testar no Site

1. Faça uma cotação normal
2. Mude para USD no seletor de moeda
3. Verifique se os valores estão corretos
4. Exemplo esperado: R$ 259,51 → $ 46,51

### 5. Valores de Referência

| BRL | USD (taxa 5.58) |
|-----|------------------|
| R$ 100,00 | $ 17,92 |
| R$ 259,51 | $ 46,51 |
| R$ 500,00 | $ 89,61 |

### 6. Solução de Problemas

Se a conversão estiver incorreta:
1. Verifique os logs no console
2. Limpe o cache: `window.currencyService?.clearCache()`
3. Recarregue a página
4. Teste novamente

### 7. Contato

Se o problema persistir, informe:
- Valor original (BRL)
- Valor convertido (USD)
- Taxa de câmbio mostrada
- Logs do console 