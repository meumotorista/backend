# Configuração de Variáveis de Ambiente na Vercel

Este documento descreve como configurar as variáveis de ambiente necessárias para o deploy do backend na Vercel.

## Variáveis Obrigatórias

As seguintes variáveis de ambiente devem ser configuradas no dashboard da Vercel antes do deploy:

### 1. SUPABASE_URL

**Descrição**: URL do projeto Supabase que contém o banco de dados PostgreSQL.

**Como obter**:
1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para **Settings** → **API**
4. Copie o valor de **Project URL**

**Exemplo**: `https://xyzcompany.supabase.co`

**Ambientes**: Production, Preview, Development

---

### 2. SUPABASE_ANON_KEY

**Descrição**: Chave anônima (pública) do Supabase para autenticação e acesso ao banco de dados.

**Como obter**:
1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para **Settings** → **API**
4. Copie o valor de **anon public**

**Exemplo**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**Ambientes**: Production, Preview, Development

---

### 3. NODE_ENV

**Descrição**: Define o ambiente de execução da aplicação.

**Valor**: `production`

**Ambientes**: Production

---

## Passo a Passo para Configurar na Vercel

### Método 1: Via Dashboard (Recomendado)

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto **meumotorista-backend**
3. Clique em **Settings** no menu superior
4. No menu lateral, clique em **Environment Variables**
5. Para cada variável:
   - Clique em **Add New**
   - Preencha o campo **Key** com o nome da variável
   - Preencha o campo **Value** com o valor correspondente
   - Selecione os ambientes onde a variável será aplicada:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Clique em **Save**

### Método 2: Via Vercel CLI

Se preferir usar a linha de comando, você pode configurar as variáveis usando a Vercel CLI:

```bash
# Instalar Vercel CLI (se ainda não instalado)
npm install -g vercel

# Fazer login
vercel login

# Navegar até o diretório do projeto
cd /caminho/para/backend

# Adicionar variáveis de ambiente
vercel env add SUPABASE_URL production
# Cole o valor quando solicitado

vercel env add SUPABASE_ANON_KEY production
# Cole o valor quando solicitado

vercel env add NODE_ENV production
# Digite: production
```

---

## Verificação das Variáveis

Após configurar as variáveis, você pode verificá-las:

### Via Dashboard
1. Acesse **Settings** → **Environment Variables**
2. Verifique se todas as variáveis estão listadas
3. Confirme que os ambientes corretos estão selecionados

### Via CLI
```bash
vercel env ls
```

---

## Secrets da Vercel

O arquivo `vercel.json` está configurado para usar **secrets** da Vercel (prefixo `@`):

```json
{
  "env": {
    "SUPABASE_URL": "@supabase_url",
    "SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

Para usar secrets, você precisa criá-los primeiro:

```bash
# Criar secrets
vercel secrets add supabase_url "https://seu-projeto.supabase.co"
vercel secrets add supabase_anon_key "sua-chave-anonima-aqui"
```

**Vantagens dos Secrets**:
- Maior segurança
- Compartilhados entre múltiplos projetos
- Não aparecem nos logs de build
- Podem ser referenciados em `vercel.json`

**Desvantagens**:
- Requerem Vercel CLI para criação
- Não podem ser visualizados após criação (apenas editados)

---

## Testando Localmente

Para testar a aplicação localmente com as mesmas variáveis de ambiente:

1. Crie um arquivo `.env.local` na raiz do projeto:

```bash
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima-aqui
NODE_ENV=development
PORT=3000
```

2. Execute o servidor de desenvolvimento:

```bash
pnpm dev
```

3. Acesse `http://localhost:3000/health` para verificar se a API está funcionando.

---

## Troubleshooting

### Erro: "SUPABASE_URL is not defined"

**Causa**: A variável de ambiente não foi configurada corretamente.

**Solução**:
1. Verifique se a variável está configurada no dashboard da Vercel
2. Confirme que o ambiente correto está selecionado (Production/Preview/Development)
3. Faça um novo deploy para aplicar as mudanças

### Erro: "Invalid Supabase credentials"

**Causa**: A chave `SUPABASE_ANON_KEY` está incorreta ou expirada.

**Solução**:
1. Acesse o dashboard do Supabase
2. Gere uma nova chave anônima se necessário
3. Atualize a variável de ambiente na Vercel
4. Faça um novo deploy

### Variáveis não aparecem no build

**Causa**: As variáveis podem estar configuradas apenas para um ambiente específico.

**Solução**:
1. Verifique se as variáveis estão configuradas para todos os ambientes necessários
2. Certifique-se de que o deploy está sendo feito no ambiente correto
3. Limpe o cache do build e faça um novo deploy

---

## Checklist de Configuração

Antes de fazer o deploy, verifique:

- [ ] `SUPABASE_URL` configurada em Production, Preview e Development
- [ ] `SUPABASE_ANON_KEY` configurada em Production, Preview e Development
- [ ] `NODE_ENV` configurada como `production` em Production
- [ ] Valores testados localmente com `.env.local`
- [ ] Secrets criados (se optar por usar secrets)
- [ ] Arquivo `vercel.json` atualizado com as configurações corretas

---

## Referências

- [Documentação de Environment Variables da Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentação de Secrets da Vercel](https://vercel.com/docs/cli/secrets)
- [Documentação da API do Supabase](https://supabase.com/docs/guides/api)
