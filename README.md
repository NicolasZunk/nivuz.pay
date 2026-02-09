# 💳 Nivuz Pay - Sistema de Pagamento PIX

Sistema completo de pagamentos via PIX integrado com a API Pixup, pronto para deploy na Vercel.

## 🚀 Deploy na Vercel

### 1. Preparar o Projeto

```bash
# Instalar dependências
npm install

# Testar localmente (opcional)
npm run dev
```

### 2. Deploy na Vercel

#### Opção A: Via CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

#### Opção B: Via GitHub

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório
5. Configure as variáveis de ambiente (veja abaixo)
6. Clique em "Deploy"

### 3. Configurar Variáveis de Ambiente na Vercel

No painel da Vercel, vá em **Settings > Environment Variables** e adicione:

```
PIXUP_USER=nicolaszunk01_1068194194372499
PIXUP_CLIENT_ID=fd5a9db13e1841e08e8f11b18c8b4cdd87d9081076caba695a5bed9121b4bde6
PIXUP_API_URL=https://api.pixup.com.br
```

⚠️ **IMPORTANTE**: Nunca faça commit do arquivo `.env.local` no GitHub!

## 📋 Funcionalidades

✅ Interface moderna e responsiva  
✅ Geração de QR Code PIX em tempo real  
✅ Cópia do código PIX com um clique  
✅ Formatação automática de valores  
✅ Validação de formulários  
✅ Tratamento de erros  
✅ Design baseado no mockup original  

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Pixup API** - Processamento de pagamentos PIX
- **QRCode** - Geração de QR Codes

## 📁 Estrutura do Projeto

```
nivuz-pay/
├── app/
│   ├── api/
│   │   └── pix/
│   │       └── generate/
│   │           └── route.ts      # API de geração de PIX
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página inicial
│   └── globals.css               # Estilos globais
├── .env.local                    # Variáveis de ambiente (não commitar!)
├── .env.example                  # Exemplo de variáveis
├── next.config.js                # Configuração do Next.js
├── tailwind.config.js            # Configuração do Tailwind
└── package.json                  # Dependências
```

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Editar .env.local com suas credenciais

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 📝 Como Usar

1. Preencha o nome completo
2. Adicione o e-mail (opcional)
3. Digite o valor do pagamento
4. Clique em "Gerar QR Code PIX"
5. Escaneie o QR Code ou copie o código PIX

## 🔐 Segurança

- As credenciais são armazenadas como variáveis de ambiente
- Nunca exponha suas chaves no código
- Use HTTPS em produção (Vercel já fornece)
- Valide todos os inputs no backend

## 📊 API da Pixup

Este projeto usa a API da Pixup para gerar cobranças PIX. Para mais informações sobre a API, consulte a [documentação oficial da Pixup](https://docs.pixup.com.br).

### Endpoint Utilizado

```
POST https://api.pixup.com.br/v1/pix/charge
```

### Payload de Exemplo

```json
{
  "user": "seu_usuario",
  "clientId": "seu_client_id",
  "transaction_id": "TXN-123456",
  "amount": 10.50,
  "payer": {
    "name": "Nome do Cliente",
    "email": "cliente@email.com"
  },
  "description": "Descrição do pagamento"
}
```

## 🐛 Solução de Problemas

### Erro: "Credenciais Pixup não configuradas"
- Verifique se as variáveis de ambiente estão corretas na Vercel
- Redeploye o projeto após adicionar as variáveis

### Erro: "Resposta inválida da API Pixup"
- Verifique se suas credenciais estão corretas
- Confirme se a API da Pixup está funcionando
- Verifique os logs no console da Vercel

### QR Code não aparece
- Abra o console do navegador (F12)
- Verifique se há erros de rede
- Teste a API diretamente em `/api/pix/generate`

## 📞 Suporte

Para problemas com a API Pixup, entre em contato com o suporte da Pixup.

## 📄 Licença

Este projeto é de código aberto para fins educacionais.

---

Desenvolvido com ❤️ usando Next.js e Pixup API
