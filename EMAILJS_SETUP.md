# 📧 ~~Configuração do EmailJS~~ - DESATUALIZADO

⚠️ **ESTE MÉTODO FOI SUBSTITUÍDO**

**Nova solução recomendada:** Netlify Functions (100% gratuito com suporte a anexos PDF)
📖 **Consulte:** `NETLIFY_SETUP.md` para a configuração atualizada

---

## Por que mudamos?

Este guia explica como configurar o EmailJS para receber automaticamente os PDFs de reservas no email da equipe.

**❌ Limitações do EmailJS:**
- Plano gratuito não suporta anexos PDF
- Necessita upgrade pago ($15/mês) para anexos
- Limitações de envio no plano gratuito

**✅ Nova solução (Netlify Functions):**
- 100% gratuito com anexos PDF
- 125,000 invocações/mês grátis
- Email HTML profissional
- Deploy automático

## 🚀 Passos para Configuração

### 1. Criar Conta no EmailJS
- Acesse: https://www.emailjs.com/
- Crie uma conta gratuita
- Faça login no dashboard

### 2. Configurar um Service (Provedor de Email)
- No dashboard, clique em "Add New Service"
- Escolha seu provedor de email (Gmail, Outlook, etc.)
- Para Gmail:
  - Service ID: `service_executivepremium`
  - Configure com sua conta Gmail
  - Autorize o acesso

### 3. Criar Template de Email
- Clique em "Create New Template"
- Template ID: `template_reservation`
- Use o template abaixo:

```
Subject: Nova Reserva - {{subject}}

From: {{from_name}}
To: {{to_email}}

{{message}}

---
Reserva gerada automaticamente pelo sistema Executive Premium
```

### 4. Obter Public Key
- Vá em "Integration" → "General Settings"
- Copie sua "Public Key"

### 5. Atualizar Configurações
Edite o arquivo `src/config/emailjs.ts`:

```typescript
export const emailjsConfig = {
  SERVICE_ID: 'service_executivepremium', // Sua Service ID
  TEMPLATE_ID: 'template_reservation', // Sua Template ID  
  PUBLIC_KEY: 'SUA_PUBLIC_KEY_AQUI', // Sua Public Key
  TO_EMAIL: 'gabriel.gbllima10@gmail.com',
  FROM_NAME: 'Executive Premium - Sistema de Reservas',
};
```

## 📝 Template Detalhado (Opcional)

Para um email mais rico, você pode usar este template:

```html
<h2>Nova Reserva - Executive Premium</h2>

<h3>Dados da Viagem:</h3>
<p>{{message}}</p>

<hr>
<p><small>Reserva gerada automaticamente pelo sistema</small></p>
```

## 🔧 Testando a Configuração

1. Preencha uma reserva de teste no site
2. Verifique se o email chegou em `gabriel.gbllima10@gmail.com`
3. Confirme que todos os dados estão corretos

## 📎 Limitações de Anexos

**Importante**: O EmailJS gratuito não suporta anexos PDF. Para enviar PDFs:

### Opção 1: Upgrade para Plano Pago
- EmailJS Pro: $15/mês
- Suporte completo a anexos

### Opção 2: Alternativa sem Anexo
- Email contém todos os dados da reserva
- Cliente anexa PDF manualmente no WhatsApp
- Equipe recebe notificação imediata por email

### Opção 3: Webhook Personalizado
- Criar endpoint próprio para receber dados
- Enviar email com anexo via servidor próprio
- Mais complexo, mas sem limitações

## 🚨 Resolução de Problemas

### Email não está chegando:
1. Verifique se as credenciais estão corretas
2. Confirme que o service está ativo
3. Verifique a pasta de spam
4. Teste com um template simples primeiro

### Erro de CORS:
- Certifique-se de que o domínio está autorizado no EmailJS
- Adicione localhost para testes locais

### Erro de autenticação:
- Reautorize o service no dashboard
- Verifique se a Public Key está correta

## 📈 Monitoramento

O EmailJS oferece:
- Dashboard com estatísticas de envio
- Logs de emails enviados
- Métricas de sucesso/falha

## 🔒 Segurança

- Public Key é segura para usar no frontend
- Não exponha Service ID ou Template ID públicamente
- Configure rate limiting no EmailJS se necessário

## 📞 Suporte

- Documentação: https://www.emailjs.com/docs/
- Suporte: support@emailjs.com
- Community: https://github.com/emailjs/emailjs-sdk 