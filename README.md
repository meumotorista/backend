# Meu Motorista Backend 🚗

Backend inspirado no Uber, construído com Node.js, TypeScript e Express, integrado ao Supabase e pronto para deploy na Vercel.

## 🚀 Tecnologias

- **Node.js 20** (LTS)
- **TypeScript** para tipagem estática
- **Express** para roteamento
- **Supabase** como Banco de Dados (PostgreSQL) e Autenticação
- **tsx** para execução rápida em desenvolvimento
- **Swagger** para documentação da API

## 🛠️ Configuração Local

1. Clone o repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure o arquivo `.env` com suas credenciais do Supabase:
   ```env
   SUPABASE_URL=sua_url_aqui
   SUPABASE_ANON_KEY=sua_chave_aqui
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
5. Acesse a documentação em: `http://localhost:3000/api-docs`

## 🌍 Deploy na Vercel

O projeto está configurado para deploy automático na Vercel. Certifique-se de adicionar as variáveis de ambiente `SUPABASE_URL` e `SUPABASE_ANON_KEY` no dashboard da Vercel.

## 📊 Modelagem de Dados

O esquema do banco de dados está disponível no arquivo `schema.sql`. Ele inclui tabelas para:
- **Profiles**: Usuários e Motoristas
- **Vehicles**: Veículos dos motoristas
- **Rides**: Gerenciamento de corridas e status
- **Driver Locations**: Localização em tempo real
