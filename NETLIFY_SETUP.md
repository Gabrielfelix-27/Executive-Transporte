# 🚀 Configuração Netlify Functions - Executive Premium

Sistema **100% gratuito** para envio automático de emails com anexos PDF das reservas.

## ✅ Vantagens da Solução

- 🆓 **Totalmente gratuito** - 125,000 invocações/mês no Netlify
- 📎 **Suporte completo a anexos PDF** - Sem limitações
- ⚡ **Rápido e confiável** - Infraestrutura serverless
- 🔧 **Fácil manutenção** - Deploy automático
- 📧 **Email HTML profissional** - Design responsivo

## 🎯 Como Funciona

```
Cliente finaliza reserva
    ↓
PDF gerado (frontend)
    ↓
Dados enviados → Netlify Function
    ↓
Function envia email com PDF anexado
    ↓
gabriel.gbllima10@gmail.com recebe email
    ↓
Cliente vai para WhatsApp
```

## 🔧 Configuração Passo-a-Passo

### 1. Configurar Gmail App Password

**⚠️ IMPORTANTE:** Não use sua senha normal do Gmail!

1. Acesse: https://myaccount.google.com/security
2. Ative "Verificação em duas etapas" (se não ativado)
3. Vá em "Senhas de aplicativo"
4. Crie uma nova senha para "Aplicativo personalizado"
5. Nome: "Executive Premium - Netlify"
6. **Copie a senha gerada** (16 caracteres)

### 2. Deploy no Netlify

#### Opção A: Deploy via GitHub (Recomendado)

1. Faça commit do código para GitHub:
```bash
git add .
git commit -m "Add Netlify Functions for email"
git push origin main
```

2. Acesse: https://netlify.com/
3. Clique "New site from Git"
4. Conecte seu repositório GitHub
5. Configurações:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Clique "Deploy site"

#### Opção B: Deploy Manual

1. Execute: `npm run build`
2. Arraste pasta `dist` para https://app.netlify.com/drop
3. Suba manualmente a pasta `netlify/functions`

### 3. Configurar Variáveis de Ambiente

No painel do Netlify:

1. Vá em **Site settings** → **Environment variables**
2. Adicione as variáveis:

```
GMAIL_USER = gabriel.gbllima10@gmail.com
GMAIL_APP_PASSWORD = sua-senha-de-app-de-16-caracteres
```

**🔒 Estas variáveis são seguras e privadas no Netlify**

### 4. Testar a Configuração

1. Acesse seu site publicado no Netlify
2. Faça uma reserva de teste
3. Verifique se o email chegou em `gabriel.gbllima10@gmail.com`
4. Confirme que o PDF está anexado

## 📧 Exemplo do Email Recebido

O email terá:
- **Assunto:** 🚗 Nova Reserva - [Nome do Cliente]
- **Design profissional** com logo Executive Premium
- **Todas as informações** organizadas em seções
- **PDF anexado** com detalhes completos

## 🚨 Troubleshooting

### Email não está chegando:

1. **Verifique as variáveis de ambiente:**
   - Netlify dashboard → Site settings → Environment variables
   - GMAIL_USER deve ser seu email
   - GMAIL_APP_PASSWORD deve ser a senha de app (16 chars)

2. **Verifique os logs:**
   - Netlify dashboard → Functions → View logs
   - Procure por erros de autenticação

3. **Teste a senha de app:**
   ```bash
   # No terminal local (para testar)
   curl -u "seu-email@gmail.com:sua-senha-app" https://mail.google.com/
   ```

### Função não está executando:

1. **Verifique o arquivo `netlify.toml`:**
   ```toml
   [functions]
     directory = "netlify/functions"
   ```

2. **Verifique se a função está no lugar certo:**
   ```
   netlify/
     functions/
       send-reservation-email.js
   ```

3. **Redeploye o site** após mudanças

### Erro de CORS:

- As configurações de CORS já estão no `netlify.toml`
- Se persistir, adicione domínio customizado no Netlify

## 📊 Monitoramento

### Logs da Função:
- Netlify dashboard → Functions tab
- Clique na função `send-reservation-email`
- Veja logs em tempo real

### Estatísticas:
- Dashboard mostra número de invocações
- Alertas automáticos se algo falhar

## 💰 Limites Gratuitos

- **125,000 invocações/mês** - Mais que suficiente
- **100GB-seconds** de runtime
- Se exceder, upgrade para $19/mês

## 🔄 Atualizações Futuras

Para modificar o template de email:
1. Edite `netlify/functions/send-reservation-email.js`
2. Faça commit no GitHub
3. Netlify redeploya automaticamente

## 🆘 Suporte

### Documentação Oficial:
- Netlify Functions: https://docs.netlify.com/functions/overview/
- Nodemailer: https://nodemailer.com/

### Problemas Comuns:
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- Netlify Build Issues: https://docs.netlify.com/configure-builds/troubleshooting-tips/

## 🔒 Segurança

- ✅ **Senhas seguras** - Variáveis de ambiente criptografadas
- ✅ **HTTPS apenas** - Comunicação segura
- ✅ **Rate limiting** - Netlify protege contra spam
- ✅ **Logs privados** - Apenas você tem acesso

## 🎉 Pronto para Produção!

Após configuração, o sistema funciona 24/7:
- Cliente faz reserva → Email automático
- Equipe recebe notificação → Processa reserva
- Backup completo → Nunca perde uma reserva 