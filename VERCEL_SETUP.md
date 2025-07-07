# 🚀 Guia de Deploy no Vercel - Executive Premium

Este guia te ajudará a fazer o deploy da sua aplicação no **Vercel** de forma rápida e gratuita, mantendo todas as funcionalidades de PDF e email.

## 📋 Pré-requisitos

- [ ] Conta no [Vercel](https://vercel.com) (gratuita)
- [ ] Projeto no GitHub/GitLab/Bitbucket
- [ ] Gmail configurado com senha de app (mesmo do setup anterior)

## 🚀 Passo 1: Deploy Inicial

### 1.1 Via GitHub (Recomendado)
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Conecte sua conta do GitHub
4. Selecione o repositório **Executive Premium**
5. Clique em **"Deploy"**

### 1.2 Via CLI (Alternativo)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

## ⚙️ Passo 2: Configurar Variáveis de Ambiente

Após o deploy inicial:

1. Acesse o dashboard do seu projeto no Vercel
2. Vá em **Settings > Environment Variables**
3. Adicione as seguintes variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `GMAIL_USER` | `seu-email@gmail.com` | Production, Preview, Development |
| `GMAIL_APP_PASSWORD` | `sua-senha-de-app-gmail` | Production, Preview, Development |

### 🔑 Como obter a senha de app do Gmail:
1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá em **Segurança**
3. Ative **Verificação em duas etapas** (se não ativada)
4. Procure por **Senhas de app**
5. Gere uma nova senha para "Email"
6. Use essa senha na variável `GMAIL_APP_PASSWORD`

## 🛠️ Passo 3: Verificar Configurações

### 3.1 Build Settings
O Vercel detecta automaticamente as configurações do Vite. Verifique se está assim:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 3.2 Função Serverless
A API Route `/api/send-reservation-email.js` será automaticamente configurada pelo Vercel.

## 🧪 Passo 4: Testar a Aplicação

1. Após o deploy, acesse a URL fornecida pelo Vercel
2. Faça uma reserva de teste
3. Verifique se:
   - [ ] PDF é gerado e baixado
   - [ ] Email é enviado para `gabriel.gbllima10@gmail.com`
   - [ ] WhatsApp abre corretamente com ● (bullet points) em vez de emojis quebrados

### 🔍 Debug de Email
Se o email não chegar:

1. **Verificar logs da função:**
   - Acesse **Vercel Dashboard > Functions**
   - Clique na função `send-reservation-email`
   - Veja os logs em tempo real

2. **Logs importantes:**
   ```
   ✅ Variáveis de ambiente encontradas
   ✅ Conexão com Gmail estabelecida  
   ✅ Email enviado com sucesso! Message ID: xxxxx
   ```

3. **Erros comuns:**
   - `❌ Variáveis de ambiente não configuradas` → Configure GMAIL_USER e GMAIL_APP_PASSWORD
   - `❌ Erro de autenticação Gmail` → Verifique se a senha de app está correta
   - `EAUTH error` → Regenere a senha de app no Gmail

## 📊 Passo 5: Configurações Adicionais

### 5.1 Domain Personalizado (Opcional)
1. Vá em **Settings > Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruído

### 5.2 Configurações de Performance
O `vercel.json` já está configurado com:
- ✅ Redirects para SPA
- ✅ CORS para API
- ✅ Timeout de 30s para função de email
- ✅ Headers de segurança

## 🔄 Passo 6: Deploy Automático

### Via Git (Recomendado)
Cada push para a branch `main` fará deploy automático:
```bash
git add .
git commit -m "Deploy para Vercel"
git push origin main
```

### Via CLI
```bash
# Deploy de produção
vercel --prod

# Deploy de preview
vercel
```

## 🚨 Solução de Problemas

### Erro: "Function exceeded time limit"
- A função de email tem 30s de timeout
- Se persistir, verifique conexão com Gmail

### Erro: "CORS"
- O arquivo `vercel.json` já configura CORS
- Se persistir, limpe cache do navegador

### Erro: "Environment variables not found"
- Verifique se as variáveis estão configuradas corretamente
- Redeploy após adicionar variáveis

### PDF não baixa
- Verifique se jsPDF está funcionando
- Teste em modo de desenvolvimento local

### Email não envia
- Verifique as credenciais do Gmail
- Confirme se a senha de app está correta
- Verifique logs em **Functions > Logs** no dashboard

## 📱 Monitoramento

### Dashboard Vercel
- **Analytics:** Visualize tráfego e performance
- **Functions:** Monitore execuções da API
- **Logs:** Debug problemas em tempo real

### Limites Gratuitos
- ✅ **Bandwidth:** 100GB/mês
- ✅ **Function Executions:** 125.000/mês
- ✅ **Function Duration:** 10s por execução (30s configurado para email)
- ✅ **Build Time:** 6.000 minutos/mês

## 🎯 URLs Importantes

- **Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Documentação:** [vercel.com/docs](https://vercel.com/docs)
- **Status:** [vercel-status.com](https://vercel-status.com)

## ✅ Checklist Final

- [ ] Deploy realizado com sucesso
- [ ] Variáveis de ambiente configuradas
- [ ] Teste de reserva funcionando
- [ ] PDF sendo gerado e baixado
- [ ] Email sendo enviado automaticamente
- [ ] WhatsApp redirecionando corretamente
- [ ] Domínio personalizado (opcional)

---

🎉 **Parabéns!** Sua aplicação está rodando no Vercel com todas as funcionalidades de PDF e email funcionando perfeitamente!

**Vantagens do Vercel:**
- ⚡ Performance superior ao Netlify
- 🔧 Zero configuração necessária
- 📊 Analytics integrado
- 🚀 Deploy automático via Git
- 💰 Plano gratuito generoso
- 🛠️ Melhor DX (Developer Experience)

**Próximos passos sugeridos:**
1. Configure um domínio personalizado
2. Monitore analytics e performance
3. Configure notificações de deploy 