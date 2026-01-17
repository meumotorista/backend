# Meu Motorista - Backend

Backend para aplicação de transporte estilo Uber, desenvolvido com Node.js, Express, TypeScript e Supabase.

## 🚀 Tecnologias

- **Node.js** & **Express**: Servidor e API REST.
- **TypeScript**: Tipagem estática e segurança no código.
- **Supabase**: Banco de dados (PostgreSQL) e Autenticação.
- **Vercel**: Configuração pronta para deploy serverless.

## 🛠️ Configuração

### Pré-requisitos
- Node.js (v18+)
- Conta no Supabase

### Instalação

1.  Clone o repositório e acesse a pasta `backend`:
    ```bash
    cd backend
    npm install
    ```

2.  Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz da pasta `backend` com as chaves do seu projeto Supabase:
    ```env
    PORT=3000
    SUPABASE_URL=sua_url_supabase
    SUPABASE_SERVICE_KEY=sua_service_role_key
    ```

3.  Configure o Banco de Dados:
    Execute o script SQL localizado em `sql/schema.sql` no Editor SQL do seu painel Supabase. Isso criará as tabelas `profiles`, `vehicles` e `rides`.

## ▶️ Execução

### Desenvolvimento Local
```bash
npm run dev
```
O servidor rodará em `http://localhost:3000`.

### Build
```bash
npm run build
```

## 📡 API Endpoints

### Autenticação
A autenticação é gerenciada pelo Supabase. O backend espera um Header `Authorization: Bearer <TOKEN>` em rotas protegidas.

### Usuários (`/api/users`)
- `GET /profile`: Retorna dados do usuário logado.
- `PUT /profile`: Atualiza dados do usuário.

### Motoristas (`/api/drivers`)
- `GET /vehicles`: Lista veículos do motorista.
- `POST /vehicles`: Adiciona um novo veículo.
- `PUT /vehicles/:id`: Atualiza um veículo.

### Corridas (`/api/rides`)
- `POST /request`: Solicita uma nova corrida.
- `GET /available`: Lista corridas disponíveis (para motoristas).
- `POST /:id/accept`: Motorista aceita uma corrida.
- `PATCH /:id/status`: Atualiza status (em progresso, completa, cancelada).
- `GET /my-rides`: Histórico de corridas do usuário.

## ☁️ Deploy (Vercel)

O projeto possui configuração para deploy na Vercel (`vercel.json`).
1.  Instale o Vercel CLI: `npm i -g vercel`
2.  Login: `vercel login`
3.  Deploy: rode `vercel` na raiz da pasta.
