# Backend Meu Motorista com TypeScript, Express e Supabase

Um backend robusto para uma plataforma de compartilhamento de caronas, inspirada no Uber, utilizando **TypeScript**, **Express** e **Supabase** como banco de dados e serviço de autenticação.

O projeto está totalmente configurado para execução local e deployment na **Vercel** com Swagger/OpenAPI integrado.

## 📋 Índice

- [Recursos](#recursos)
- [Tecnologias](#tecnologias)
- [Modelagem de Dados](#modelagem-de-dados)
- [Instalação Local](#instalação-local)
- [Execução](#execução)
- [Documentação da API](#documentação-da-api)
- [Deploy na Vercel](#deploy-na-vercel)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação](#autenticação)

## 🌟 Recursos

- ✅ **TypeScript** - Código tipado e seguro
- ✅ **Express** - Framework web moderno e flexível
- ✅ **Supabase** - Backend PostgreSQL com autenticação integrada
- ✅ **Swagger/OpenAPI** - Documentação interativa da API
- ✅ **Vercel Ready** - Pronto para deployment serverless
- ✅ **Testes** - Jest e Supertest configurados
- ✅ **Nodemon** - Hot reload em desenvolvimento
- ✅ **CORS** - Configuração de CORS
- ✅ **dotenv** - Gerenciamento de variáveis de ambiente

## 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
| :--- | :--- | :--- |
| Node.js | 20+ | Runtime JavaScript |
| TypeScript | 5.9+ | Linguagem com tipos |
| Express | 5.2+ | Framework web |
| Supabase | 2.90+ | Backend e autenticação |
| Swagger | 6.2+ | Documentação API |
| Jest | 30+ | Testes unitários |
| Vercel | - | Deploy serverless |

## 📊 Modelagem de Dados

A modelagem de dados foi projetada para cobrir as funcionalidades essenciais de um serviço de carona:

| Entidade | Descrição | Campos Chave |
| :--- | :--- | :--- |
| `profiles` | Usuários (Passageiros, Motoristas, Admin) | `id`, `email`, `role`, `rating` |
| `vehicles` | Veículos dos motoristas | `id`, `driver_id`, `license_plate`, `type` |
| `rides` | Informações sobre viagens | `id`, `rider_id`, `driver_id`, `status`, `fare` |
| `driver_locations` | Localização em tempo real | `driver_id`, `current_location` |
| `payments` | Histórico de transações | `id`, `ride_id`, `amount`, `status` |

O script SQL para criação do schema está em [schema.sql](schema.sql).

## 💻 Instalação Local

### Pré-requisitos

- **Node.js** 20+ instalado
- **pnpm** 10+ instalado
- **Git** para controle de versão
- **Conta Supabase** para banco de dados

### Passos de Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/seu-usuario/meumotorista.git
cd meumotorista/backend
```

2. **Instale as dependências**:
```bash
pnpm install
```

3. **Configure as variáveis de ambiente**:
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
PORT=3000
NODE_ENV=development
```

4. **Aplique o schema do banco de dados**:
   - Acesse sua conta no [Supabase](https://supabase.com)
   - Vá para **SQL Editor**
   - Copie o conteúdo de [schema.sql](schema.sql)
   - Execute na sua base de dados

## 🚀 Execução

### Modo Desenvolvimento
```bash
pnpm dev
```
O servidor estará rodando em `http://localhost:3000`

### Build
```bash
pnpm build
```

### Modo Produção
```bash
pnpm build
pnpm start
```

### Testes
```bash
pnpm test
```

## 📚 Documentação da API

### Swagger UI (Recomendado)

Após iniciar o servidor, acesse:
```
http://localhost:3000/api-docs
```

Aqui você pode:
- Visualizar todos os endpoints
- Ver schemas e modelos de dados
- Testar requisições interativamente
- Copiar exemplos de código

### Arquivo de Documentação

Veja [SWAGGER_DOCS.md](SWAGGER_DOCS.md) para instruções completas.

## 🌐 Deploy na Vercel

### Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Projeto no GitHub, GitLab ou Bitbucket
- Variáveis de ambiente configuradas

### Deploy via GitHub (Recomendado)

1. **Push do código para GitHub**:
```bash
git add .
git commit -m "Preparar para deploy"
git push origin main
```

2. **Conectar na Vercel**:
   - Acesse [vercel.com/new](https://vercel.com/new)
   - Clique em "Import Git Repository"
   - Selecione seu repositório
   - Configure as variáveis de ambiente
   - Clique em "Deploy"

3. **URL do Deploy**:
```
https://seu-projeto.vercel.app
```

### Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Gerenciar Variáveis de Ambiente

1. No Dashboard Vercel, vá para **Settings**
2. Selecione **Environment Variables**
3. Adicione:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - Outras variáveis conforme necessário

Para mais detalhes, veja [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

## 📁 Estrutura do Projeto

```
backend/
├── api/                          # Serverless Functions (Vercel)
│   ├── index.ts                 # Função principal
│   └── health.ts                # Health check
├── src/
│   ├── config/
│   │   ├── supabase.ts          # Configuração Supabase
│   │   └── swagger.ts           # Configuração Swagger
│   ├── controllers/
│   │   └── rideController.ts    # Lógica de corridas
│   ├── middleware/
│   │   └── auth.ts              # Middleware de autenticação
│   ├── routes/
│   │   └── rideRoutes.ts        # Definição de rotas
│   ├── services/
│   │   └── rideService.ts       # Lógica de negócio
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   ├── __tests__/               # Testes
│   └── index.ts                 # Entrada da aplicação
├── .env.example                  # Exemplo de variáveis
├── .vercelignore                 # Arquivos ignorados Vercel
├── vercel.json                   # Configuração Vercel
├── tsconfig.json                 # Configuração TypeScript
├── package.json                  # Dependências e scripts
├── jest.config.js                # Configuração Jest
├── schema.sql                    # Schema do banco de dados
├── SWAGGER_DOCS.md              # Documentação Swagger
├── VERCEL_DEPLOYMENT.md         # Guia de Deploy Vercel
└── README.md                     # Este arquivo
```

## 📡 Endpoints da API

| Método | Endpoint | Descrição | Autenticação |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Verificar saúde da API | Não |
| `POST` | `/api/rides/request` | Solicitar nova corrida | Sim |
| `POST` | `/api/rides/:rideId/accept` | Aceitar corrida | Sim |
| `GET` | `/api/rides/:rideId` | Obter status da corrida | Não |
| `GET` | `/api-docs` | Documentação Swagger | Não |
| `GET` | `/swagger.json` | Especificação OpenAPI | Não |

### Exemplos de Requisições

#### 1. Solicitar Corrida
```bash
curl -X POST http://localhost:3000/api/rides/request \
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

#### 2. Aceitar Corrida
```bash
curl -X POST http://localhost:3000/api/rides/123e4567-e89b-12d3-a456-426614174000/accept \
  -H "Content-Type: application/json" \
  -d '{
    "driverId": "660e8400-e29b-41d4-a716-446655440111"
  }'
```

#### 3. Obter Status
```bash
curl http://localhost:3000/api/rides/123e4567-e89b-12d3-a456-426614174000
```

## 🔐 Autenticação

A autenticação é implementada através de um **Middleware** (`src/middleware/auth.ts`) que valida tokens JWT do Supabase.

### Token JWT

Obtenha um token através da API de autenticação do Supabase:

```bash
curl -X POST https://seu-projeto.supabase.co/auth/v1/token?grant_type=password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "senha-segura"
  }'
```

### Usar Token em Requisições

Adicione o token no header `Authorization`:

```bash
curl http://localhost:3000/api/rides/request \
  -H "Authorization: Bearer seu-token-jwt"
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                # Inicia com nodemon e hot reload
pnpm build             # Compila TypeScript para JavaScript
pnpm start             # Executa aplicação compilada
pnpm test              # Executa testes com Jest
pnpm test:watch        # Testes em modo watch
```

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 📧 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato: support@meumotorista.com

## 🔗 Links Úteis

- [Documentação Express](https://expressjs.com)
- [Documentação Supabase](https://supabase.com/docs)
- [Documentação TypeScript](https://www.typescriptlang.org/docs)
- [Documentação Vercel](https://vercel.com/docs)
- [OpenAPI Specification](https://swagger.io/specification)

---

**Desenvolvido com ❤️ para a plataforma Meu Motorista**
