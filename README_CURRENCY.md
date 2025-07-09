# Sistema de Conversão de Moeda - Executive Premium

## Visão Geral

O sistema agora suporta conversão de moeda em tempo real entre Real Brasileiro (BRL) e Dólar Americano (USD) usando cotações atuais do mercado.

## Funcionalidades Implementadas

### 1. Serviço de Cotação (`src/services/currencyService.ts`)

- **API Externa**: Usa `https://api.exchangerate-api.com/v4/latest/USD` para obter cotações atuais
- **Cache**: Mantém cotação em cache por 5 minutos para otimizar performance
- **Fallback**: Em caso de erro na API, usa valor aproximado de R$ 5,50
- **Conversão Bidirecional**: Suporte para BRL → USD e USD → BRL

### 2. Hook de Moeda (`src/hooks/useCurrency.ts`)

- **Estado Global**: Gerencia moeda selecionada e taxa de câmbio
- **Conversão Automática**: Aplica conversão baseada na moeda selecionada
- **Formatação**: Formata valores conforme moeda (R$ para BRL, $ para USD)
- **Estados de Loading**: Indica quando está buscando cotação

### 3. Componentes Atualizados

#### Navbar (`src/components/Navbar.tsx`)
- Seletor de moeda com indicador de loading (⏳)
- Exibe cotação atual quando USD está selecionado
- Feedback visual durante busca de cotação

#### VehicleSelection (`src/pages/VehicleSelection.tsx`)
- Todos os preços são convertidos automaticamente
- Usa `formatPrice()` em vez de `formatCurrency()`

#### PassengerData (`src/pages/PassengerData.tsx`)
- Preços nos PDFs e emails são convertidos
- Formatação consistente entre diferentes partes

#### VehicleCategories (`src/components/VehicleCategories.tsx`)
- Preços das categorias são convertidos automaticamente
- Não requer mais prop `formatCurrency`

## Como Funciona

### Fluxo de Conversão

1. **Seleção de Moeda**: Usuário seleciona USD no seletor
2. **Busca de Cotação**: Sistema busca cotação atual da API
3. **Conversão**: Todos os preços (originalmente em BRL) são convertidos
4. **Formatação**: Valores são formatados conforme moeda selecionada
5. **Exibição**: Preços convertidos são exibidos em todo o sistema

### Exemplo de Uso

```typescript
import { useCurrency } from '@/hooks/useCurrency';

function MyComponent() {
  const { formatPrice, currency, loading } = useCurrency();
  
  const priceInBRL = 150; // Preço base em Real
  
  return (
    <div>
      <p>Preço: {formatPrice(priceInBRL)}</p>
      <p>Moeda: {currency}</p>
      {loading && <p>Buscando cotação...</p>}
    </div>
  );
}
```

## Tecnologias Utilizadas

- **API de Cotação**: ExchangeRate-API (gratuita)
- **Cache Local**: JavaScript nativo com timestamp
- **Context API**: Para gerenciamento de estado global
- **React Hooks**: Para lógica de conversão e formatação

## Comportamento por Moeda

### BRL (Real Brasileiro)
- Preços exibidos como originalmente calculados
- Formato: `R$ 150,00`
- Sem necessidade de conversão

### USD (Dólar Americano)
- Preços convertidos usando cotação atual
- Formato: `$ 27.27` (exemplo com cotação 5.50)
- Indicador de loading durante busca de cotação
- Exibe taxa de câmbio no seletor

## Melhorias Futuras

1. **Mais Moedas**: Adicionar Euro, Libra, etc.
2. **Histórico**: Manter histórico de cotações
3. **Notificações**: Alertas sobre mudanças significativas na cotação
4. **Configuração**: Permitir usuário definir moeda padrão
5. **Offline**: Melhor tratamento para cenários offline

## Arquivos Principais

- `src/services/currencyService.ts` - Serviço de cotação
- `src/hooks/useCurrency.ts` - Hook principal de moeda
- `src/contexts/LanguageContext.tsx` - Contexto de idioma/moeda
- `src/components/Navbar.tsx` - Seletor de moeda
- Vários componentes usando `formatPrice()`

## Observações Importantes

- Todos os preços base permanecem em BRL no sistema
- A conversão acontece apenas na exibição
- O sistema mantém compatibilidade com implementação anterior
- Cache de 5 minutos evita chamadas excessivas à API
- Fallback garante funcionamento mesmo com API offline

## Testando a Conversão

### Exemplo de Conversão Correta
```
R$ 259,51 → $ 46,51 (cotação ~5.58)
```

### Lógica de Conversão
1. **API**: Busca `1 USD = X BRL` (ex: 1 USD = 5.58 BRL)
2. **Conversão**: `valorBRL / taxaUSD = valorUSD`
3. **Exemplo**: `259.51 / 5.58 = 46.51`

### Debug no Console
```typescript
// Logs disponíveis:
💱 Cotação obtida: 1 USD = R$ 5.58
💱 Conversão: R$ 259.51 → $ 46.51 (taxa: 5.58)
```

### Verificação Manual
No console do navegador:
```javascript
// Teste rápido
const testAmount = 259.51;
const exchangeRate = 5.58; // Cotação atual
const convertedUSD = testAmount / exchangeRate;
console.log(`R$ ${testAmount} → $ ${convertedUSD.toFixed(2)}`);
``` 