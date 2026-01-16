# Guia Completo de Deploy na Vercel

Este documento fornece instruções detalhadas para realizar o deploy do backend **meumotorista** na plataforma Vercel.

## Pré-requisitos

Antes de iniciar o processo de deploy, certifique-se de que você possui:

- **Conta na Vercel**: Crie uma conta gratuita em [vercel.com](https://vercel.com)
- **Repositório no GitHub**: O código deve estar em um repositório Git (GitHub, GitLab ou Bitbucket)
- **Credenciais do Supabase**: URL do projeto e chave anônima (anon key)
- **Acesso ao repositório**: Permissões de leitura/escrita no repositório GitHub

## Arquivos Atualizados

Os seguintes arquivos foram otimizados para o deploy na Vercel:

### 1. vercel.json

Este arquivo contém as configurações principais do projeto:

```json
{
  "version": 2,
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": null,
  "regions": ["gru1"],
  "env": {
    "NODE_ENV": "production",
    "SUPABASE_URL": "@supabase_url",
    "SUPABASE_ANON_KEY": "@supabase_anon_key"
  },
  "functions": {
    "api/*.ts": {
      "memory": 1024,
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index"
    }
  ]
}
```

**Principais configurações**:
- **buildCommand**: Usa `pnpm` (consistente com o package.json)
- **regions**: Deploy na região `gru1` (São Paulo) para melhor performance no Brasil
- **functions**: Configuração de memória (1GB) e timeout (30s) para funções serverless
- **rewrites**: Redireciona todas as requisições para a função principal

### 2. .vercelignore

Define quais arquivos devem ser ignorados no deploy:

```
# Vercel
.vercel
.vercel_build_output

# Development
.env.local
.env.*.local
node_modules

# Tests
**/__tests__
*.test.ts
*.spec.ts
coverage

# Documentation
QUICKSTART.md
SETUP_COMPLETE.md
SWAGGER_DOCS.md
```

Isso garante que apenas os arquivos necessários sejam enviados, reduzindo o tamanho do deploy e o tempo de build.

## Passo a Passo do Deploy

### Etapa 1: Atualizar Arquivos no Repositório

1. **Substitua o arquivo `vercel.json`** na raiz do repositório pelo novo arquivo otimizado
2. **Substitua o arquivo `.vercelignore`** pelo novo arquivo otimizado
3. **Commit e push** das alterações:

```bash
git add vercel.json .vercelignore
git commit -m "chore: otimizar configurações para deploy na Vercel"
git push origin main
```

### Etapa 2: Conectar Repositório à Vercel

#### Opção A: Via Dashboard (Recomendado para Iniciantes)

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **Import Git Repository**
3. Selecione o provedor (GitHub, GitLab ou Bitbucket)
4. Autorize a Vercel a acessar seus repositórios (se for a primeira vez)
5. Localize e selecione o repositório **meumotorista/backend**
6. Clique em **Import**

#### Opção B: Via Vercel CLI (Recomendado para Desenvolvedores)

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Fazer login na Vercel
vercel login

# Navegar até o diretório do projeto
cd /caminho/para/backend

# Iniciar o processo de deploy
vercel

# Para deploy em produção
vercel --prod
```

### Etapa 3: Configurar o Projeto

Durante a configuração inicial, a Vercel fará algumas perguntas:

```
? Set up and deploy "~/backend"? [Y/n] Y
? Which scope do you want to deploy to? [Seu usuário/organização]
? Link to existing project? [y/N] N
? What's your project's name? meumotorista-backend
? In which directory is your code located? ./
```

**Respostas recomendadas**:
- **Set up and deploy**: `Y` (Sim)
- **Which scope**: Selecione seu usuário ou organização
- **Link to existing project**: `N` (Não, a menos que já tenha criado o projeto)
- **Project name**: `meumotorista-backend` (ou o nome que preferir)
- **Code directory**: `./` (raiz do repositório)

### Etapa 4: Configurar Variáveis de Ambiente

**IMPORTANTE**: Este passo é crucial para o funcionamento da aplicação.

1. No dashboard da Vercel, acesse seu projeto
2. Clique em **Settings** → **Environment Variables**
3. Adicione as seguintes variáveis:

| Nome | Valor | Ambientes |
|------|-------|-----------|
| `SUPABASE_URL` | `https://seu-projeto.supabase.co` | Production, Preview, Development |
| `SUPABASE_ANON_KEY` | `sua-chave-anonima` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

**Como obter as credenciais do Supabase**:
1. Acesse [app.supabase.com](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para **Settings** → **API**
4. Copie **Project URL** e **anon public**

Consulte o arquivo `VERCEL_ENV_SETUP.md` para instruções detalhadas.

### Etapa 5: Executar o Deploy

#### Via Dashboard

Após configurar as variáveis de ambiente:
1. Vá para a aba **Deployments**
2. Clique em **Redeploy** no último deployment
3. Confirme clicando em **Redeploy**

#### Via CLI

```bash
vercel --prod
```

### Etapa 6: Monitorar o Build

1. Acompanhe o progresso do build na aba **Deployments**
2. Clique no deployment em andamento para ver os logs em tempo real
3. Verifique se não há erros durante:
   - Instalação de dependências (`pnpm install`)
   - Compilação TypeScript (`pnpm run build`)
   - Deploy das funções serverless

**Tempo estimado**: 2-5 minutos

### Etapa 7: Verificar o Deploy

Após o build ser concluído com sucesso:

1. **Obtenha a URL do deploy**: A Vercel fornecerá uma URL como `https://meumotorista-backend.vercel.app`

2. **Teste o health check**:
```bash
curl https://meumotorista-backend.vercel.app/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "message": "Meu Motorista API is running"
}
```

3. **Teste a documentação Swagger**:
   - Acesse `https://meumotorista-backend.vercel.app/api-docs`
   - Verifique se a interface do Swagger é carregada corretamente

4. **Teste um endpoint da API**:
```bash
curl -X POST https://meumotorista-backend.vercel.app/api/rides/request \
  -H "Content-Type: application/json" \
  -d '{
    "riderId": "550e8400-e29b-41d4-a716-446655440000",
    "pickup": {
      "latitude": -23.5505,
      "longitude": -46.6333
    },
    "destination": {
      "latitude": -23.6155,
      "longitude": -46.7283
    },
    "pickupAddress": "Av. Paulista, 1000",
    "destinationAddress": "Rua da Consolação, 500"
  }'
```

## Configurações Avançadas

### Domínio Customizado

Para usar um domínio próprio (ex: `api.meumotorista.com`):

1. Acesse **Settings** → **Domains**
2. Clique em **Add**
3. Digite seu domínio
4. Siga as instruções para configurar os registros DNS

### Configuração de CORS

Se precisar ajustar as configurações de CORS, edite o arquivo `api/index.ts`:

```typescript
app.use(cors({
  origin: ['https://meumotorista.com', 'https://www.meumotorista.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Logs e Monitoramento

Para visualizar logs em tempo real:

1. Acesse a aba **Deployments**
2. Clique no deployment ativo
3. Vá para **Functions**
4. Selecione a função que deseja monitorar
5. Visualize os logs em tempo real

### Rollback de Deploy

Se algo der errado, você pode fazer rollback:

1. Acesse a aba **Deployments**
2. Localize um deployment anterior que estava funcionando
3. Clique nos três pontos (⋯) ao lado do deployment
4. Selecione **Promote to Production**

## Troubleshooting

### Erro: "Build failed"

**Possíveis causas**:
- Erro de compilação TypeScript
- Dependências faltando
- Comando de build incorreto

**Solução**:
1. Verifique os logs de build na Vercel
2. Teste o build localmente: `pnpm run build`
3. Corrija os erros e faça novo commit

### Erro: "Function execution timed out"

**Causa**: A função serverless excedeu o tempo limite de 30 segundos.

**Solução**:
1. Otimize consultas ao banco de dados
2. Aumente o `maxDuration` em `vercel.json` (máximo 60s no plano gratuito)
3. Considere usar background jobs para operações longas

### Erro: "Cannot find module"

**Causa**: Dependência não instalada ou caminho de import incorreto.

**Solução**:
1. Verifique se todas as dependências estão em `package.json`
2. Use caminhos relativos corretos nos imports
3. Certifique-se de que `tsconfig.json` está configurado corretamente

### API retorna 404

**Causa**: Configuração de rewrites incorreta ou função não encontrada.

**Solução**:
1. Verifique se `vercel.json` contém a configuração de rewrites
2. Confirme que o arquivo `api/index.ts` exporta a função `api`
3. Verifique os logs da função na Vercel

## Manutenção e Atualizações

### Deploy Automático

A Vercel está configurada para fazer deploy automático sempre que você fizer push para a branch `main`:

```bash
git add .
git commit -m "feat: adicionar nova funcionalidade"
git push origin main
```

A Vercel detectará o push e iniciará um novo deploy automaticamente.

### Preview Deployments

Ao criar um Pull Request, a Vercel criará automaticamente um **preview deployment** com uma URL única. Isso permite testar mudanças antes de fazer merge para produção.

### Variáveis de Ambiente por Branch

Você pode configurar variáveis de ambiente diferentes para cada ambiente:
- **Production**: Branch `main`
- **Preview**: Pull Requests e outras branches
- **Development**: Ambiente local

## Checklist Final

Antes de considerar o deploy concluído, verifique:

- [ ] Build concluído com sucesso
- [ ] Variáveis de ambiente configuradas
- [ ] Health check respondendo corretamente
- [ ] Swagger UI acessível em `/api-docs`
- [ ] Endpoints da API funcionando
- [ ] Autenticação com Supabase funcionando
- [ ] Logs sem erros críticos
- [ ] Performance adequada (tempo de resposta < 1s)
- [ ] CORS configurado corretamente
- [ ] Domínio customizado configurado (se aplicável)

## Recursos Adicionais

- [Documentação da Vercel](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

## Suporte

Se encontrar problemas durante o deploy:

1. Consulte a [documentação da Vercel](https://vercel.com/docs)
2. Verifique os logs de build e runtime
3. Acesse o [fórum da comunidade Vercel](https://github.com/vercel/vercel/discussions)
4. Entre em contato com o suporte da Vercel (planos pagos)

---

**Desenvolvido para o projeto Meu Motorista**  
Última atualização: Janeiro 2026
