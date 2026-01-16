# 🔐 Configurar Secrets para GitHub Actions

## Passo a Passo

### 1. Obter credenciais da Vercel

#### Vercel Project ID e Organization ID:
```bash
vercel whoami
vercel link --prod
```

Ou acesse o **Vercel Dashboard**:
- Vá em **Settings → General**
- Procure por **Project ID** e **Org ID**

#### Vercel Token:
```bash
# Gerar um novo token
vercel tokens create
```

Ou no **Vercel Dashboard**:
- Vá em **Settings → Tokens**
- Clique em "Create Token"

### 2. Configurar Secrets no GitHub

1. Acesse seu repositório no GitHub
2. Vá para **Settings → Secrets and variables → Actions**
3. Clique em "New repository secret"
4. Adicione os seguintes secrets:

| Nome | Valor | Onde obter |
| :--- | :--- | :--- |
| `VERCEL_TOKEN` | Token de autenticação | `vercel tokens create` |
| `VERCEL_ORG_ID` | ID da organização | `vercel whoami` |
| `VERCEL_PROJECT_ID` | ID do projeto | Vercel Dashboard |

### 3. Configurar Variáveis de Ambiente

No **Vercel Dashboard**:
1. Acesse seu projeto
2. Vá para **Settings → Environment Variables**
3. Adicione:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - Outras variáveis necessárias

## Verificar Configuração

1. Faça push para `main`:
```bash
git add .
git commit -m "Configurar GitHub Actions"
git push origin main
```

2. Acesse **Actions** no seu repositório GitHub
3. Observe o workflow sendo executado
4. Verifique o deployment na Vercel

## Troubleshooting

### "Error: No Vercel token provided"
- Verifique se `VERCEL_TOKEN` está configurado
- Gere um novo token em `vercel tokens create`

### "Error: Project not found"
- Confirme `VERCEL_PROJECT_ID` está correto
- Execute `vercel link --prod` localmente

### Build falha no GitHub Actions
- Verifique `package.json` e `pnpm-lock.yaml`
- Rode `pnpm install && pnpm build` localmente
- Commit as mudanças se necessário

## Arquivo .github/workflows/deploy.yml

O arquivo `deploy.yml` já está configurado com:
- ✅ Checkout do código
- ✅ Setup Node.js
- ✅ Setup pnpm
- ✅ Testes automáticos
- ✅ Build
- ✅ Deploy na Vercel

## Branches

O workflow faz deploy automático quando:
- Push para `main` → Deploy em produção
- Push para `develop` → Deploy em staging (opcional)

Para alterar, edite `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches:
      - main        # Production
      - develop     # Staging
```

## Próximos Passos

1. Configure os secrets no GitHub
2. Faça um push para `main`
3. Observe o workflow em **Actions**
4. Verifique deploy em `https://seu-projeto.vercel.app`

---

**Parabéns! CI/CD está configurado! 🎉**
