# 🔧 Correções de Publicação na Vercel

**Data:** 16 de janeiro de 2026  
**Status:** ✅ Corrigido

## Problemas Identificados e Corrigidos

### 1. ❌ Handler incorreto em `api/index.ts`
**Problema:** A função exportada era `api` em vez de `handler`  
**Impacto:** Vercel não conseguia reconhecer a função serverless  
**Solução aplicada:**
- Alterado export de `export const api` para `export const handler`
- Adicionado tratamento de erro correto
- Padronizado conforme especificação Vercel

### 2. ❌ Variáveis de Ambiente expostas em `vercel.json`
**Problema:** Chaves de API Supabase estavam hardcoded no arquivo  
**Impacto:** Risco de segurança, exposição de credenciais  
**Solução aplicada:**
```json
"env": {
  "NODE_ENV": "production",
  "SUPABASE_URL": "@supabase_url",
  "SUPABASE_ANON_KEY": "@supabase_anon_key"
}
```
- Convertido para referência de secrets (`@variable_name`)
- Instruções para configurar no dashboard Vercel

### 3. ❌ Caminho de rotas incorreto em `api/index.ts`
**Problema:** Rotas montadas como `/api/rides` em vez de apenas `/rides`  
**Impacto:** URLs duplicadas, confusão de roteamento  
**Solução aplicada:**
```typescript
// Antes
app.use('/api/rides', rideRoutes);

// Depois
app.use('/rides', rideRoutes);
```
- O rewrite no `vercel.json` trata o roteamento para `/api/*`

### 4. ✅ Variáveis de ambiente faltando
**Status:** ✅ Já configurado corretamente

## Arquivos Modificados

| Arquivo | Mudanças |
|---------|----------|
| `api/index.ts` | ✏️ Handler corrigido, rota ajustada |
| `vercel.json` | ✏️ Variáveis de env convertidas para secrets |

## ✅ Testes Realizados

```bash
# Build local
pnpm run build ✅

# Verificação de arquivos compilados
dist/api/index.js ✅
dist/api/health.js ✅
```

## 🚀 Próximos Passos

### 1. Configurar Secrets no Dashboard Vercel

Acesse: **Project Settings → Environment Variables**

Adicione:
- `SUPABASE_URL`: Cole a URL do seu projeto Supabase
- `SUPABASE_ANON_KEY`: Cole a chave anon do Supabase

### 2. Fazer Commit e Push

```bash
git add api/index.ts vercel.json CORRECOES_VERCEL.md
git commit -m "fix: corrigir configuração Vercel - handler e variáveis de ambiente"
git push origin main
```

### 3. Deploy

A Vercel irá fazer o redeploy automaticamente após receber o push.

Para monitorar:
- Dashboard Vercel: https://vercel.com/dashboard
- Clique no projeto "meumotorista"
- Veja os logs de build em "Deployments"

## 📋 Checklist Final

- [x] Handler corrigido para exportação padrão Vercel
- [x] Variáveis de ambiente convertidas para secrets
- [x] Rotas ajustadas para nomenclatura correta
- [x] Build local passa sem erros
- [x] Arquivos compilados para dist/
- [ ] Secrets configurados no dashboard Vercel (fazer manualmente)
- [ ] Deploy realizado com sucesso
- [ ] Endpoints testados

## 🔗 URLs Esperadas Após Deploy

```
API Health:  https://<seu-dominio-vercel>.vercel.app/health
API Rides:   https://<seu-dominio-vercel>.vercel.app/rides
Swagger:     https://<seu-dominio-vercel>.vercel.app/api-docs
```

## 📚 Referências

- [Vercel Node.js Runtime](https://vercel.com/docs/functions/serverless-functions/nodejs)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Configuring Projects](https://vercel.com/docs/projects/project-configuration)

---

**Dúvidas ou problemas?** Verifique:
1. Logs no dashboard Vercel
2. Arquivo `vercel.json` está na raiz do projeto
3. Secrets foram configurados corretamente
4. `pnpm-lock.yaml` foi incluído no commit
