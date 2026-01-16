# 🚀 Guia Rápido de Início

Comece a usar a API Meu Motorista em 5 minutos!

## 1️⃣ Instalação (1 minuto)

```bash
cd backend
pnpm install
```

## 2️⃣ Configuração (2 minutos)

```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# Editar com suas credenciais
# Adicione suas chaves do Supabase em .env.local
```

## 3️⃣ Iniciar Servidor (1 minuto)

```bash
pnpm dev
```

O servidor estará disponível em: `http://localhost:3000`

## 4️⃣ Acessar Documentação (1 minuto)

Abra seu navegador e acesse:
```
http://localhost:3000/api-docs
```

## ✅ Pronto!

Você agora pode:
- ✅ Explorar todos os endpoints no Swagger
- ✅ Testar requisições interativamente
- ✅ Ver exemplos de código
- ✅ Visualizar schemas de dados

## 📚 Próximos Passos

### Aprender mais
- Leia [README.md](README.md) para documentação completa
- Veja [SWAGGER_DOCS.md](SWAGGER_DOCS.md) para guia detalhado de testes

### Deploy na Vercel
- Siga [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

### Estrutura do Projeto
```
src/
├── controllers/    # Lógica de requisições
├── services/       # Lógica de negócio
├── routes/         # Definição de rotas
├── middleware/     # Autenticação, CORS, etc
├── config/         # Configurações (Supabase, Swagger)
└── types/          # Tipos TypeScript
```

## 🆘 Problemas Comuns

### Erro: `SUPABASE_URL is required`
**Solução**: Preencha o arquivo `.env.local` com suas credenciais do Supabase

### Porta 3000 já está em uso
**Solução**: Edite `.env.local` e altere `PORT=3001`

### TypeScript errors
**Solução**: Execute `pnpm build` para ver erros específicos

## 🔗 Links Rápidos

- 📖 [README Completo](README.md)
- 🐳 [Deploy Vercel](VERCEL_DEPLOYMENT.md)
- 📡 [Documentação Swagger](SWAGGER_DOCS.md)
- 📊 [Schema do Banco](schema.sql)

## 💡 Dicas Úteis

### Testes
```bash
pnpm test              # Executar testes
pnpm test:watch        # Testes em tempo real
```

### Build
```bash
pnpm build             # Compilar TypeScript
npm run start          # Executar compilado
```

### Verificar Saúde
```bash
curl http://localhost:3000/health
# Resposta: { "status": "ok", "message": "..." }
```

---

**Bem-vindo ao Meu Motorista! 🚗**

Dúvidas? Abra uma issue ou entre em contato: support@meumotorista.com
