# 📧 Instruções para Configuração do Email

## Problema Identificado

O sistema de envio de emails está configurado corretamente, mas as **variáveis de ambiente do Gmail não estão definidas**. Isso impede o envio automático de emails de confirmação com PDF.

## ✅ Status Atual

- ✅ **Estrutura do projeto**: Configurado para Vercel
- ✅ **Endpoint de email**: `/api/send-reservation-email.js` existe e está funcional
- ✅ **Integração no frontend**: `PaymentSuccess.tsx` chama o endpoint corretamente
- ❌ **Variáveis de ambiente**: `GMAIL_USER` e `GMAIL_APP_PASSWORD` não configuradas

## 🔧 Solução Necessária

### 1. Configurar Gmail App Password

**⚠️ IMPORTANTE:** Não use sua senha normal do Gmail!

1. Acesse: https://myaccount.google.com/security
2. Ative "Verificação em duas etapas" (se não ativado)
3. Vá em "Senhas de aplicativo"
4. Crie uma nova senha para "Aplicativo personalizado"
5. Nome: "Executive Premium - Email Service"
6. **Copie a senha gerada** (16 caracteres)

### 2. Atualizar Arquivo .env

Substitua `your_gmail_app_password_here` no arquivo `.env` pela senha gerada:

```env
GMAIL_USER=executivetransportepremium@gmail.com
GMAIL_APP_PASSWORD=sua_senha_app_de_16_caracteres
```

### 3. Para Deploy em Produção (Vercel)

1. Acesse o dashboard do Vercel
2. Vá em Settings → Environment Variables
3. Adicione as variáveis:
   - `GMAIL_USER`: `executivetransportepremium@gmail.com`
   - `GMAIL_APP_PASSWORD`: `sua_senha_app_de_16_caracteres`

## 🧪 Como Testar

Após configurar as variáveis:

1. Reinicie o servidor de desenvolvimento
2. Faça uma reserva de teste
3. Complete o pagamento
4. Verifique se o email chegou em `executivetransportepremium@gmail.com`

## 📋 Fluxo Atual do Email

1. Cliente completa pagamento → `PaymentSuccess.tsx`
2. PDF é gerado automaticamente
3. Dados são enviados para `/api/send-reservation-email`
4. Email é enviado com PDF anexado para:
   - `executivetransportepremium@gmail.com` (principal)
   - `gabriel.gbllima10@gmail.com` (cópia)

## 🔒 Segurança

- ✅ Variáveis de ambiente são seguras
- ✅ Senha de app é específica para esta aplicação
- ✅ Pode ser revogada a qualquer momento
- ✅ Não expõe a senha principal do Gmail

## 📞 Próximos Passos

1. **Configurar Gmail App Password** (5 minutos)
2. **Atualizar .env local** (1 minuto)
3. **Configurar variáveis no Vercel** (2 minutos)
4. **Testar funcionamento** (5 minutos)

**Total estimado: 15 minutos para resolver completamente**