# 🏗️ ARQUITETURA DO NIVUZ PAY

## 📊 Fluxo de Funcionamento

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (Navegador)                       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Interface do Usuário (app/page.tsx)          │   │
│  │                                                        │   │
│  │  1. Formulário de Pagamento                           │   │
│  │     • Nome Completo                                   │   │
│  │     • E-mail (opcional)                               │   │
│  │     • Valor (R$)                                      │   │
│  │                                                        │   │
│  │  2. Botão "Gerar QR Code PIX"                         │   │
│  │                                                        │   │
│  │  3. Exibição do QR Code                               │   │
│  │     • Imagem do QR Code                               │   │
│  │     • Código PIX para copiar                          │   │
│  │     • ID da transação                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ↓                                  │
│                     FETCH API POST                            │
│                            ↓                                  │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                   SERVIDOR (Vercel)                          │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      API Route (app/api/pix/generate/route.ts)       │   │
│  │                                                        │   │
│  │  1. Recebe dados do formulário                        │   │
│  │  2. Valida os dados                                   │   │
│  │  3. Gera ID único da transação                        │   │
│  │  4. Prepara payload para Pixup                        │   │
│  │  5. Envia requisição para API Pixup                   │   │
│  │  6. Recebe código PIX                                 │   │
│  │  7. Gera QR Code (base64)                             │   │
│  │  8. Retorna dados para cliente                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ↓                                  │
│                     HTTPS POST                                │
│                            ↓                                  │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                      API PIXUP                               │
│                                                               │
│  Endpoint: POST /v1/pix/charge                               │
│                                                               │
│  Payload:                                                     │
│  {                                                            │
│    "user": "nicolaszunk01_1068194194372499",                │
│    "clientId": "fd5a9db13e1841e...",                        │
│    "transaction_id": "TXN-1234567890",                      │
│    "amount": 10.50,                                          │
│    "payer": {                                                │
│      "name": "Nome do Cliente",                             │
│      "email": "cliente@email.com"                           │
│    },                                                         │
│    "description": "Pagamento Nome do Cliente"               │
│  }                                                            │
│                                                               │
│  Resposta:                                                    │
│  {                                                            │
│    "id": "charge_123",                                       │
│    "pix_code": "00020126580014BR.GOV.BCB.PIX...",          │
│    "expires_at": "2024-12-31T23:59:59Z"                     │
│  }                                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Estrutura de Pastas

```
nivuz-pay/
│
├── 📱 app/                          # Next.js App Router
│   ├── 🎨 page.tsx                  # Página principal (Interface)
│   ├── 📐 layout.tsx                # Layout global
│   ├── 🎨 globals.css               # Estilos globais Tailwind
│   │
│   └── 🔌 api/                      # API Routes
│       └── pix/
│           └── generate/
│               └── route.ts         # Endpoint de geração PIX
│
├── ⚙️ Arquivos de Configuração
│   ├── package.json                 # Dependências do projeto
│   ├── tsconfig.json                # Config TypeScript
│   ├── tailwind.config.js           # Config Tailwind CSS
│   ├── postcss.config.js            # Config PostCSS
│   ├── next.config.js               # Config Next.js
│   └── vercel.json                  # Config Vercel
│
├── 🔐 Variáveis de Ambiente
│   ├── .env.local                   # Credenciais (NÃO commitar!)
│   └── .env.example                 # Exemplo de credenciais
│
├── 📚 Documentação
│   ├── README.md                    # Documentação principal
│   └── DEPLOY.md                    # Guia de deploy
│
└── .gitignore                       # Arquivos ignorados pelo Git
```

---

## 🔄 Ciclo de Vida de uma Transação

### 1️⃣ **Cliente preenche formulário**
```typescript
{
  nome: "João Silva",
  email: "joao@email.com",
  valor: "150,00" // Formatado automaticamente
}
```

### 2️⃣ **Frontend envia para API**
```typescript
POST /api/pix/generate
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "valor": 150.00 // Convertido para número
}
```

### 3️⃣ **API valida e processa**
```typescript
// Validações
✅ Nome não vazio
✅ Valor > 0
✅ Credenciais configuradas

// Gera ID único
transactionId = "TXN-1707434567890-abc123"
```

### 4️⃣ **API chama Pixup**
```typescript
POST https://api.pixup.com.br/v1/pix/charge

Headers:
  Content-Type: application/json
  Accept: application/json

Body:
  {
    user: "nicolaszunk01_1068194194372499",
    clientId: "fd5a9db13e1841e...",
    transaction_id: "TXN-1707434567890-abc123",
    amount: 150.00,
    payer: {
      name: "João Silva",
      email: "joao@email.com"
    },
    description: "Pagamento João Silva"
  }
```

### 5️⃣ **Pixup retorna código PIX**
```typescript
{
  id: "charge_xyz789",
  pix_code: "00020126580014BR.GOV.BCB.PIX...",
  expires_at: "2024-12-31T23:59:59Z"
}
```

### 6️⃣ **API gera QR Code**
```typescript
// Usando biblioteca 'qrcode'
const qrCodeDataUrl = await QRCode.toDataURL(pixCode, {
  width: 300,
  margin: 2
})

// Resultado: "data:image/png;base64,iVBORw0KG..."
```

### 7️⃣ **API retorna ao frontend**
```typescript
{
  success: true,
  qrCode: "data:image/png;base64,iVBORw0KG...",
  pixCode: "00020126580014BR.GOV.BCB.PIX...",
  transactionId: "TXN-1707434567890-abc123",
  chargeId: "charge_xyz789",
  expiresAt: "2024-12-31T23:59:59Z"
}
```

### 8️⃣ **Frontend exibe QR Code**
```typescript
<img src={qrCode} alt="QR Code PIX" />
<input value={pixCode} readOnly />
```

---

## 🛡️ Segurança

### ✅ Implementações de Segurança

1. **Variáveis de Ambiente**
   ```bash
   PIXUP_USER=...        # Não exposto no código
   PIXUP_CLIENT_ID=...   # Armazenado na Vercel
   ```

2. **Validação de Dados**
   ```typescript
   // Backend valida todos os inputs
   if (!nome || !valor) return error(400)
   if (valor <= 0) return error(400)
   ```

3. **HTTPS Automático**
   - Vercel fornece certificado SSL/TLS
   - Todas as comunicações criptografadas

4. **Logs Seguros**
   ```typescript
   console.log({...payload, clientId: '***'})
   // Credenciais nunca aparecem nos logs
   ```

---

## 📦 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| `next` | 14.0.4 | Framework React |
| `react` | 18.2.0 | Biblioteca UI |
| `typescript` | 5.3.3 | Tipagem estática |
| `tailwindcss` | 3.3.6 | Estilização |
| `qrcode` | 1.5.3 | Geração de QR Code |
| `axios` | 1.6.2 | Cliente HTTP (opcional) |

---

## 🎨 Design System

### Cores
```css
Primary: #E31E52   /* Vermelho Nivuz Pay */
Secondary: #C91845 /* Vermelho escuro hover */
```

### Componentes
- **Cards**: `rounded-2xl shadow-xl`
- **Inputs**: `rounded-lg focus:ring-2 focus:ring-primary`
- **Buttons**: `rounded-lg shadow-lg transition duration-200`

---

## 🚀 Performance

### Otimizações do Next.js
- ✅ Server-side rendering (SSR)
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Route prefetching

### Otimizações da Vercel
- ✅ Edge Network CDN
- ✅ Automatic HTTPS
- ✅ Gzip compression
- ✅ Brotli compression

---

## 📈 Monitoramento

### Logs na Vercel
```
1. Acesse vercel.com
2. Selecione o projeto
3. Vá em "Deployments"
4. Clique em um deployment
5. "View Function Logs"
```

### Métricas Importantes
- Tempo de resposta da API
- Taxa de sucesso das transações
- Erros da API Pixup

---

## 🔧 Troubleshooting

### Problema: QR Code não aparece
**Solução:**
```typescript
// Verificar logs do console
console.log('Resposta da API:', response)

// Verificar variáveis de ambiente
console.log('PIXUP_USER configurado?', !!process.env.PIXUP_USER)
```

### Problema: Erro 500 na API
**Solução:**
1. Verificar variáveis de ambiente na Vercel
2. Verificar formato do payload
3. Testar credenciais diretamente na API Pixup

---

## 🎯 Próximos Passos (Melhorias Futuras)

- [ ] Webhook para confirmação de pagamento
- [ ] Dashboard administrativo
- [ ] Histórico de transações
- [ ] Modo escuro
- [ ] Múltiplas formas de pagamento
- [ ] Sistema de notificações
- [ ] Analytics integrado

---

Desenvolvido com ❤️ para receber pagamentos via PIX de forma simples e segura!
