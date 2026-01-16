# Backend Uber-like com TypeScript e Supabase

Este projeto é um backend de exemplo, inspirado na arquitetura de serviços de transporte como o Uber, utilizando **TypeScript**, **Express** e **Supabase** como banco de dados e serviço de autenticação.

## Modelagem de Dados

A modelagem de dados foi projetada para cobrir as funcionalidades essenciais de um serviço de carona:

| Entidade | Descrição | Campos Chave |
| :--- | :--- | :--- |
| `profiles` | Usuários (Passageiros, Motoristas, Admin) | `id`, `email`, `role` |
| `vehicles` | Veículos dos motoristas | `id`, `driver_id`, `license_plate` |
| `rides` | Informações sobre a viagem (localização, status) | `id`, `rider_id`, `driver_id`, `status` |
| `driver_locations` | Localização em tempo real dos motoristas | `driver_id`, `current_location` |
| `payments` | Histórico de transações | `id`, `ride_id`, `amount` |

O script SQL para criação do schema no Supabase está disponível em `schema.sql`.

## Configuração do Projeto

### Pré-requisitos

*   Node.js e pnpm instalados.
*   Uma conta no Supabase e um projeto criado.

### Instalação

1.  Clone o repositório (simulado):
    \`\`\`bash
    # cd uber-backend
    pnpm install
    \`\`\`

2.  Crie um arquivo `.env` na raiz do projeto e preencha com suas credenciais do Supabase, baseando-se no arquivo `.env.example`:

    \`\`\`
    PORT=3000
    SUPABASE_URL=https://your-project-id.supabase.co
    SUPABASE_ANON_KEY=your-anon-key
    \`\`\`

3.  Aplique o schema do banco de dados:
    *   No painel do Supabase, vá em **SQL Editor**.
    *   Copie e cole o conteúdo do arquivo `schema.sql` e execute-o.

### Execução

Para iniciar o servidor em modo de desenvolvimento:

\`\`\`bash
pnpm dev
\`\`\`

O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API (Exemplos)

A API utiliza o prefixo `/api`.

| Método | Endpoint | Descrição | Requer Autenticação |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/rides/request` | Solicita uma nova viagem. | Sim (Middleware implementado) |
| `POST` | `/api/rides/:rideId/accept` | Motorista aceita a viagem. | Sim (Middleware implementado) |
| `GET` | `/api/rides/:rideId` | Obtém o status de uma viagem. | Não (Para simplificação, mas deve ser Sim) |
| `GET` | `/health` | Verifica a saúde do servidor. | Não |

## Autenticação

A autenticação é feita através de um **Middleware** (`src/middleware/auth.ts`) que espera um token JWT do Supabase no cabeçalho `Authorization` (Bearer Token).

**Exemplo de Requisição:**

\`\`\`
Authorization: Bearer [SUPABASE_JWT_TOKEN]
\`\`\`

O middleware utiliza a função `supabase.auth.getUser(token)` para validar o token e injetar as informações do usuário no objeto `req`.
