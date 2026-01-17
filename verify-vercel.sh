#!/bin/bash
# Script para validar as correções da Vercel

echo "🔍 Validando Configuração Vercel..."
echo ""

# Verificar arquivo vercel.json
echo "1️⃣  Verificando vercel.json..."
if [ -f "vercel.json" ]; then
  if grep -q '"version": 2' vercel.json; then
    echo "   ✅ versão: 2"
  else
    echo "   ❌ versão não encontrada"
  fi
  
  if grep -q '"buildCommand": "npm run build"' vercel.json; then
    echo "   ✅ buildCommand: npm run build"
  else
    echo "   ❌ buildCommand incorreto"
  fi
  
  if grep -q '@supabase_url' vercel.json; then
    echo "   ✅ SUPABASE_URL como secret"
  else
    echo "   ⚠️  SUPABASE_URL pode estar hardcoded"
  fi
fi

# Verificar api/index.ts
echo ""
echo "2️⃣  Verificando api/index.ts..."
if grep -q "export const handler" api/index.ts; then
  echo "   ✅ Handler exportado corretamente"
else
  echo "   ❌ Handler não encontrado"
fi

if grep -q "app.use('/rides'" api/index.ts; then
  echo "   ✅ Rotas em /rides (correto para Vercel)"
else
  echo "   ⚠️  Rotas podem estar em caminho incorreto"
fi

# Verificar build
echo ""
echo "3️⃣  Verificando build..."
if [ -d "dist/api" ]; then
  if [ -f "dist/api/index.js" ]; then
    echo "   ✅ dist/api/index.js existe"
  else
    echo "   ❌ dist/api/index.js não encontrado"
  fi
else
  echo "   ❌ dist/api/ não existe - execute: npm run build"
fi

# Verificar .vercelignore
echo ""
echo "4️⃣  Verificando .vercelignore..."
if [ -f ".vercelignore" ]; then
  echo "   ✅ .vercelignore existe"
  if grep -q "node_modules" .vercelignore; then
    echo "   ✅ node_modules ignorado"
  fi
else
  echo "   ⚠️  .vercelignore não encontrado"
fi

echo ""
echo "📋 RESUMO DE VERIFICAÇÃO COMPLETO"
echo "=================================="
echo ""
echo "✅ Próximos passos:"
echo "   1. git add -A"
echo "   2. git commit -m 'fix: correções Vercel'"
echo "   3. Configurar secrets no Vercel Dashboard"
echo "   4. git push origin main"
echo "   5. Verificar logs no Vercel Dashboard"
echo ""
