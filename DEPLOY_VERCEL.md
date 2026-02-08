# 🚀 Deploy no Vercel - Nivuz Pay

## 📁 Estrutura de Arquivos

Coloque estes arquivos no seu projeto Vercel:

```
nivuz-pay/
├── index.html          → Página principal
├── vercel.json         → Configuração Vercel
└── api/
    └── criar-pix.js    → Serverless Function
```

## 🔧 Como fazer deploy

### Opção 1: Via Dashboard Vercel (Mais Fácil)

1. Acesse https://vercel.com
2. Clique em "Add New" → "Project"
3. Importe seu repositório GitHub ou faça upload dos arquivos
4. Vercel detecta automaticamente e faz deploy! ✅

### Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# No diretório do projeto
vercel

# Para produção
vercel --prod
```

## ✅ Pronto!

Seu checkout estará disponível em:
**https://nivuz-pay.vercel.app**

## 🧪 Testando

1. Acesse https://nivuz-pay.vercel.app
2. Preencha nome e valor
3. Clique em "Gerar QR Code PIX"
4. O QR Code deve aparecer! 🎉

## 🔍 Troubleshooting

### Erro 404 na API
Verifique se a pasta `api/` existe com o arquivo `criar-pix.js`

### Erro CORS
Já está configurado no código! Se persistir, verifique os headers no `criar-pix.js`

### QR Code não aparece
1. Abra o Console (F12)
2. Veja os logs de erro
3. Verifique se a API retornou `qr_code_base64`

## 📝 Notas Importantes

✅ **Serverless Function** - A pasta `api/` cria automaticamente endpoints serverless
✅ **CORS Configurado** - Permite chamadas de qualquer origem
✅ **Credenciais Seguras** - Estão no backend, não no frontend
✅ **Zero Config** - Vercel detecta tudo automaticamente

## 🔐 Segurança (Recomendado)

Para produção, use variáveis de ambiente:

1. No Dashboard Vercel → Settings → Environment Variables
2. Adicione:
   - `PIXUP_CLIENT_ID`
   - `PIXUP_CLIENT_SECRET`
3. No código, use `process.env.PIXUP_CLIENT_ID`

## 🎯 URL Final

Seu checkout: **https://nivuz-pay.vercel.app**
API endpoint: **https://nivuz-pay.vercel.app/api/criar-pix**
