# Deployment na Vercel

## Configuração para Vercel

O projeto foi ajustado para funcionar na plataforma Vercel. Esta documentação explica como fazer o deploy e gerenciar a aplicação.

## Arquivos de Configuração

### `vercel.json`
Configuração principal para a Vercel:
- `buildCommand`: Comando para build do projeto
- `outputDirectory`: Diretório de saída do build
- `devCommand`: Comando para desenvolvimento local
- `functions`: Configuração de Serverless Functions (memória e timeout)

### `.vercelignore`
Define arquivos e pastas que devem ser ignorados durante o deploy.

### `api/` (Diretório)
Contém as Serverless Functions da Vercel:
- `api/index.ts` - Função principal que roteia todas as requisições
- `api/health.ts` - Endpoint de health check separado

## Pré-requisitos

1. **Conta na Vercel**: Crie uma conta em [vercel.com](https://vercel.com)
2. **Git**: Projeto deve estar em um repositório Git (GitHub, GitLab ou Bitbucket)
3. **Variáveis de Ambiente**: Configure as variáveis necessárias na Vercel

## Variáveis de Ambiente

Crie um arquivo `.env.local` para desenvolvimento local:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=3000
NODE_ENV=development
```

Na Vercel, adicione essas variáveis em:
**Settings → Environment Variables**

## Opções de Deploy

### Opção 1: Via Git (Recomendado)

1. **Push do projeto para GitHub**:
```bash
git add .
git commit -m "Configuração para Vercel"
git push origin main
```

2. **Connect no Vercel Dashboard**:
   - Acesse [vercel.com/new](https://vercel.com/new)
   - Clique em "Import Git Repository"
   - Selecione seu repositório GitHub
   - Configure conforme necessário
   - Clique em "Deploy"

3. **Auto-deploy**:
   - Cada push para `main` será deployado automaticamente
   - Pull Requests terão Preview URLs

### Opção 2: Deploy Manual via CLI

1. **Instale Vercel CLI**:
```bash
npm install -g vercel
```

2. **Faça login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel --prod
```

### Opção 3: Deploy via GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v5
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Configuração na Vercel Dashboard

1. **Settings → General**:
   - Framework Preset: `Other` (ou deixar em branco)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install` (ou `pnpm install`)

2. **Settings → Environment Variables**:
   - Adicione `SUPABASE_URL`
   - Adicione `SUPABASE_ANON_KEY`
   - Adicione outras variáveis conforme necessário

3. **Settings → Domains**:
   - Configure um domínio personalizado (opcional)

## Endpoints após Deploy

Após o deploy, a aplicação estará disponível em:

- **Production URL**: `https://seu-projeto.vercel.app`
- **Health Check**: `https://seu-projeto.vercel.app/health`
- **Swagger Docs**: `https://seu-projeto.vercel.app/api-docs`
- **Swagger JSON**: `https://seu-projeto.vercel.app/swagger.json`

## API Routes

Todas as rotas funcionam normalmente:

```
POST   /api/rides/request          - Solicitar corrida
POST   /api/rides/{rideId}/accept  - Aceitar corrida
GET    /api/rides/{rideId}         - Obter status da corrida
GET    /health                      - Health check
GET    /api-docs                    - Documentação Swagger
```

## Troubleshooting

### Build falha com erro de TypeScript

**Solução**: Verifique se `tsconfig.json` está correto:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node"
  }
}
```

### Timeout nas requisições

**Solução**: O timeout padrão na Vercel é 30 segundos. Se precisar de mais:
- Edit `vercel.json` e aumente `maxDuration`
- Máximo permitido no plano gratuito: 30s
- Planos pagos permitem até 900s

### Variáveis de ambiente não carregadas

**Solução**:
1. Verifique se as variáveis foram adicionadas em Settings
2. Faça um novo deploy ou clique em "Redeploy"
3. Verifique os logs em "Deployments → Logs"

### Módulo não encontrado

**Solução**:
1. Execute `npm install` localmente
2. Commit `pnpm-lock.yaml` (ou `package-lock.json`)
3. Verifique se os imports usam extensão `.js` ou configure `tsconfig.json`

## Monitoramento

### Logs em Tempo Real

```bash
vercel logs seu-projeto
```

### Função Analytics

No dashboard Vercel, acesse:
- **Analytics**: Visualize requisições, performance e erros
- **Deployments**: Histórico de deployments

## Rollback

Se houver problema após deploy:

1. **Via Vercel Dashboard**:
   - Vá para "Deployments"
   - Selecione a versão anterior
   - Clique em "Promote to Production"

2. **Via CLI**:
```bash
vercel switch-env <version-id>
```

## Próximos Passos

1. **Implementar Autenticação**: Adicionar JWT ou OAuth2
2. **Database**: Configurar Supabase no dashboard
3. **CI/CD**: Adicionar testes automáticos no pipeline
4. **Monitoring**: Usar Sentry ou Datadog para error tracking
5. **CDN**: Configurar cache headers para melhor performance

## Recursos Úteis

- [Vercel Docs](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Node.js on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions/nodejs)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Monitoring](https://vercel.com/docs/analytics)

## Suporte

Para dúvidas sobre a Vercel, consulte:
- [Vercel Community](https://discord.gg/vercel)
- [Vercel Support](https://vercel.com/support)
