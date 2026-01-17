# Deploy no Vercel

## Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Projeto Git conectado (GitHub, GitLab ou Bitbucket)
- Variáveis de ambiente configuradas

## Passos para Deploy

### 1. Conectar o repositório no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione o repositório `meumotorista/backend`
4. Clique em "Import"

### 2. Configurar Variáveis de Ambiente

Na página de configuração do projeto, adicione as seguintes variáveis:

```
SUPABASE_URL=https://yxpoedpyqmhyqzifgdyq.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Build Settings

O Vercel detectará automaticamente que é um projeto Node.js/TypeScript.

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Deploy

Clique em "Deploy" e aguarde o processo finalizar.

## URLs de Acesso

- **API Base**: `https://seu-projeto.vercel.app`
- **API Docs (Swagger)**: `https://seu-projeto.vercel.app/api-docs`
- **Health Check**: `https://seu-projeto.vercel.app/health`

## Endpoints Principais

```
POST   https://seu-projeto.vercel.app/api/users/profile
GET    https://seu-projeto.vercel.app/api/users/profile
PUT    https://seu-projeto.vercel.app/api/users/profile

GET    https://seu-projeto.vercel.app/api/drivers/vehicles
POST   https://seu-projeto.vercel.app/api/drivers/vehicles
PUT    https://seu-projeto.vercel.app/api/drivers/vehicles/:id

POST   https://seu-projeto.vercel.app/api/rides/request
GET    https://seu-projeto.vercel.app/api/rides/available
POST   https://seu-projeto.vercel.app/api/rides/:id/accept
PATCH  https://seu-projeto.vercel.app/api/rides/:id/status
GET    https://seu-projeto.vercel.app/api/rides/my-rides
```

## Deploy Automático

A cada push para a branch principal (main/master), o Vercel irá:

1. Executar o build command
2. Compilar o TypeScript
3. Fazer deploy automático

## Monitoramento

No dashboard do Vercel você pode:

- Ver logs de build e deployment
- Monitorar performance
- Gerenciar variáveis de ambiente
- Ver analytics de uso

## Troubleshooting

### Build falha

Se o build falhar, verifique:

1. Se todas as dependências estão no `package.json`
2. Se o `tsconfig.json` está correto
3. Se não há erros de TypeScript: `npm run build`

### Erro de variáveis de ambiente

Certifique-se de que `SUPABASE_URL` e `SUPABASE_SERVICE_KEY` estão configuradas nas variáveis de ambiente do Vercel.

### Erro 404 em `/api/*`

Verifique se o arquivo `vercel.json` está correto e se as rewrites estão configuradas.

## Mais Informações

- [Documentação do Vercel](https://vercel.com/docs)
- [Deployment de Node.js](https://vercel.com/docs/functions/serverless-functions)
- [Variáveis de Ambiente](https://vercel.com/docs/projects/environment-variables)
