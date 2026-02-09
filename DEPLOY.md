# 🚀 GUIA RÁPIDO DE DEPLOY NA VERCEL

## Método 1: Via GitHub (Mais Fácil) ⭐

### Passo 1: Subir o código para o GitHub
```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Nivuz Pay"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/SEU_USUARIO/nivuz-pay.git
git branch -M main
git push -u origin main
```

### Passo 2: Deploy na Vercel
1. Acesse https://vercel.com
2. Faça login com sua conta GitHub
3. Clique em "Add New..." > "Project"
4. Selecione o repositório `nivuz-pay`
5. Em "Environment Variables", adicione:
   - `PIXUP_USER` = `nicolaszunk01_1068194194372499`
   - `PIXUP_CLIENT_ID` = `fd5a9db13e1841e08e8f11b18c8b4cdd87d9081076caba695a5bed9121b4bde6`
   - `PIXUP_API_URL` = `https://api.pixup.com.br`
6. Clique em "Deploy"
7. Aguarde 2-3 minutos
8. Pronto! ✅

---

## Método 2: Via Vercel CLI

### Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Passo 2: Login
```bash
vercel login
```

### Passo 3: Deploy
```bash
# Primeira vez
vercel

# Siga as instruções:
# - Set up and deploy? Y
# - Which scope? (escolha sua conta)
# - Link to existing project? N
# - Project name? nivuz-pay
# - Directory? ./
# - Override settings? N

# Adicionar variáveis de ambiente
vercel env add PIXUP_USER
# Cole: nicolaszunk01_1068194194372499
# Environment: Production

vercel env add PIXUP_CLIENT_ID
# Cole: fd5a9db13e1841e08e8f11b18c8b4cdd87d9081076caba695a5bed9121b4bde6
# Environment: Production

vercel env add PIXUP_API_URL
# Cole: https://api.pixup.com.br
# Environment: Production

# Deploy final
vercel --prod
```

---

## ✅ Após o Deploy

### Testar o Sistema
1. Acesse a URL fornecida pela Vercel (ex: `nivuz-pay.vercel.app`)
2. Preencha o formulário
3. Clique em "Gerar QR Code PIX"
4. Verifique se o QR Code aparece

### Se houver erros:
1. Acesse https://vercel.com/seu-usuario/nivuz-pay
2. Vá em "Deployments" > clique no deploy mais recente
3. Clique em "View Function Logs"
4. Verifique os erros no log

---

## 🔄 Atualizações Futuras

Após o primeiro deploy, cada push no GitHub fará um novo deploy automaticamente!

```bash
# Fazer alterações no código
git add .
git commit -m "Descrição das mudanças"
git push

# A Vercel vai deployar automaticamente! 🎉
```

---

## 📱 Domínio Personalizado (Opcional)

1. Acesse o projeto na Vercel
2. Vá em "Settings" > "Domains"
3. Adicione seu domínio personalizado
4. Configure o DNS conforme instruções

---

## ⚠️ IMPORTANTE

- ✅ Variáveis de ambiente configuradas
- ✅ `.env.local` no `.gitignore` (nunca fazer commit!)
- ✅ Credenciais seguras na Vercel
- ✅ HTTPS automático pela Vercel

---

## 🎉 Pronto!

Seu sistema de pagamento PIX está no ar! 

URL de exemplo: `https://nivuz-pay.vercel.app`
