# 🚗 Executive Premium - Transporte Executivo

Sistema completo de reservas para transporte executivo de alto padrão com geração automática de PDF e notificação por email.

## 🚀 Deploy & Produção

**Plataforma:** Vercel (migrado do Netlify)  
**Status:** ✅ Produção  
**Funcionalidades:**
- 📄 Geração automática de PDF com jsPDF
- 📧 Envio automático de emails via Gmail/Nodemailer  
- 🗺️ Integração com Google Maps API
- 📱 Interface responsiva com Tailwind CSS

## 📋 Project info

**URL Desenvolvimento**: https://lovable.dev/projects/7bef9512-02b4-4248-8248-1204dd8877a2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7bef9512-02b4-4248-8248-1204dd8877a2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🛠️ What technologies are used for this project?

### Frontend
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **React** - Library de UI
- **shadcn-ui** - Componentes de UI
- **Tailwind CSS** - Estilização
- **React Router** - Roteamento
- **React Hook Form** - Gerenciamento de formulários

### Backend & APIs
- **Vercel API Routes** - Funções serverless
- **Nodemailer** - Envio de emails via Gmail
- **jsPDF** - Geração de PDF no frontend
- **Google Maps API** - Geocodificação e mapas

### Integração & Deploy
- **Vercel** - Hospedagem e deploy
- **GitHub** - Controle de versão
- **Gmail SMTP** - Envio de emails

## 🚀 How can I deploy this project?

### Opção 1: Deploy Automático via Vercel (Recomendado)
1. Conecte seu repositório GitHub ao [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente (ver `VERCEL_SETUP.md`)
3. Deploy automático a cada push

### Opção 2: Deploy via Lovable
Simply open [Lovable](https://lovable.dev/projects/7bef9512-02b4-4248-8248-1204dd8877a2) and click on Share -> Publish.

### ⚙️ Configuração Necessária
- **GMAIL_USER**: Seu email Gmail
- **GMAIL_APP_PASSWORD**: Senha de app do Gmail

📖 **Guia completo:** Veja `VERCEL_SETUP.md` para instruções detalhadas

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
