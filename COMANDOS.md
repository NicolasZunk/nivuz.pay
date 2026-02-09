# ⚡ COMANDOS ÚTEIS - NIVUZ PAY

## 🚀 Comandos de Deploy

### Primeira vez (com GitHub)
```bash
# 1. Inicializar Git
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Commit inicial
git commit -m "🎉 Initial commit - Nivuz Pay"

# 4. Adicionar repositório remoto
git remote add origin https://github.com/SEU_USUARIO/nivuz-pay.git

# 5. Push para GitHub
git branch -M main
git push -u origin main

# 6. Ir para vercel.com e importar o projeto
# 7. Adicionar variáveis de ambiente
# 8. Deploy! 🚀
```

### Via Vercel CLI
```bash
# Instalar CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy em produção
vercel --prod
```

---

## 💻 Desenvolvimento Local

### Instalação
```bash
# Clonar/baixar o projeto
cd nivuz-pay

# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env.example .env.local

# Editar .env.local com suas credenciais
nano .env.local  # ou use seu editor favorito
```

### Executar
```bash
# Modo desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:3000

# Build de produção (teste local)
npm run build
npm start
```

---

## 🔍 Debug e Logs

### Ver logs no console do navegador
```javascript
// Abra DevTools (F12)
// Vá em "Console"
// Procure por erros ou mensagens de log
```

### Ver logs da API na Vercel
```bash
# Via CLI
vercel logs

# Ou acesse:
# https://vercel.com/seu-usuario/nivuz-pay
# > Deployments > [clique no deploy] > View Function Logs
```

### Testar API diretamente
```bash
# Usando curl
curl -X POST http://localhost:3000/api/pix/generate \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@email.com",
    "valor": 10.50
  }'

# Usando HTTPie (mais legível)
http POST localhost:3000/api/pix/generate \
  nome="Teste" \
  email="teste@email.com" \
  valor:=10.50
```

---

## 🔐 Variáveis de Ambiente

### Listar variáveis (Vercel CLI)
```bash
vercel env ls
```

### Adicionar variável
```bash
vercel env add NOME_DA_VARIAVEL
# Cole o valor
# Selecione o ambiente (Production, Preview, Development)
```

### Remover variável
```bash
vercel env rm NOME_DA_VARIAVEL
```

### Puxar variáveis para local
```bash
vercel env pull .env.local
```

---

## 📦 Gerenciamento de Dependências

### Instalar nova dependência
```bash
# Produção
npm install nome-do-pacote

# Desenvolvimento
npm install -D nome-do-pacote
```

### Atualizar dependências
```bash
# Verificar atualizações disponíveis
npm outdated

# Atualizar todas (cuidado!)
npm update

# Atualizar uma específica
npm update nome-do-pacote
```

### Limpar cache
```bash
# Limpar cache do npm
npm cache clean --force

# Deletar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 🗂️ Git - Comandos Úteis

### Status e mudanças
```bash
# Ver status
git status

# Ver diferenças
git diff

# Ver histórico
git log --oneline --graph
```

### Commits e push
```bash
# Adicionar arquivos específicos
git add arquivo1.ts arquivo2.ts

# Adicionar todos os arquivos
git add .

# Commit com mensagem
git commit -m "✨ Adiciona nova feature"

# Push para GitHub
git push

# Push forçado (cuidado!)
git push --force
```

### Branches
```bash
# Criar nova branch
git checkout -b feature/nova-funcionalidade

# Trocar de branch
git checkout main

# Listar branches
git branch -a

# Deletar branch
git branch -d nome-da-branch
```

### Desfazer mudanças
```bash
# Desfazer mudanças não commitadas
git checkout -- arquivo.ts

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer último commit (descarta mudanças)
git reset --hard HEAD~1
```

---

## 🧹 Limpeza

### Limpar builds
```bash
# Deletar pasta .next
rm -rf .next

# Deletar pasta out
rm -rf out
```

### Limpar completamente
```bash
# Deletar tudo e reinstalar
rm -rf node_modules .next out package-lock.json
npm install
npm run dev
```

---

## 🔄 Atualizações

### Atualizar Next.js
```bash
npm install next@latest react@latest react-dom@latest
```

### Atualizar todas dependências
```bash
npm install -g npm-check-updates
ncu -u
npm install
```

---

## 📊 Análise de Código

### Verificar erros TypeScript
```bash
npx tsc --noEmit
```

### Lint (se configurado)
```bash
npm run lint
```

### Formatar código
```bash
# Se usar Prettier
npx prettier --write .
```

---

## 🧪 Testes (para implementar)

### Instalar Jest
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

### Rodar testes
```bash
npm test

# Com coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 🌐 Vercel - Comandos Avançados

### Ver informação do projeto
```bash
vercel inspect
```

### Listar deployments
```bash
vercel ls
```

### Promover deployment para produção
```bash
vercel promote [url-do-deployment]
```

### Cancelar deployment
```bash
vercel remove [deployment-id]
```

### Configurar domínio
```bash
vercel domains add seu-dominio.com
```

---

## 🚨 Troubleshooting Rápido

### Erro: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Encontrar processo
lsof -ti:3000

# Matar processo
kill -9 $(lsof -ti:3000)

# Ou usar outra porta
npm run dev -- -p 3001
```

### Erro: Build falha na Vercel
```bash
# Testar build localmente
npm run build

# Ver logs detalhados
vercel logs --follow
```

### Erro: Variáveis de ambiente não funcionam
```bash
# Verificar se estão configuradas
vercel env ls

# Re-deploy depois de adicionar variáveis
vercel --prod
```

---

## 📝 Emojis para Commits (Conventional Commits)

```
✨ :sparkles: - Nova feature
🐛 :bug: - Bug fix
📝 :memo: - Documentação
🎨 :art: - Melhorias de UI/estilo
♻️  :recycle: - Refatoração
⚡ :zap: - Performance
🔒 :lock: - Segurança
🚀 :rocket: - Deploy
🔧 :wrench: - Configuração
```

Exemplo:
```bash
git commit -m "✨ Adiciona validação de CPF no formulário"
git commit -m "🐛 Corrige erro ao gerar QR Code"
git commit -m "📝 Atualiza README com instruções de deploy"
```

---

## 🎯 Comandos Essenciais - TL;DR

```bash
# Desenvolvimento
npm install
npm run dev

# Build
npm run build
npm start

# Deploy
git add .
git commit -m "mensagem"
git push
# (auto-deploy via Vercel)

# Ou via CLI
vercel --prod
```

---

Mantenha este arquivo salvo para consultas rápidas! 🚀
