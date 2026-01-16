# Documentação Swagger - Meu Motorista API

## Visão Geral

A API Meu Motorista agora possui documentação interativa via Swagger/OpenAPI 3.0. Isso permite que você explore, teste e compreenda os endpoints disponíveis de forma visual e interativa.

## Instalação das Dependências

Primeiro, instale as dependências necessárias:

```bash
pnpm install
```

As seguintes bibliotecas foram adicionadas ao projeto:
- `swagger-jsdoc`: Para gerar especificação OpenAPI a partir dos comentários JSDoc
- `swagger-ui-express`: Para servir a interface interativa do Swagger

## Iniciando o Servidor

Para iniciar o servidor em modo de desenvolvimento:

```bash
pnpm dev
```

Ou para iniciar em modo de produção (após build):

```bash
pnpm build
pnpm start
```

## Acessando a Documentação

Após iniciar o servidor, acesse a documentação Swagger em:

```
http://localhost:3000/api-docs
```

## Endpoints Disponíveis

### 1. Health Check
- **GET** `/health`
- Verifica se o servidor está rodando corretamente

### 2. Solicitar Corrida
- **POST** `/api/rides/request`
- Cria uma nova solicitação de corrida
- **Parâmetros obrigatórios:**
  - `riderId`: ID do passageiro
  - `pickup`: Coordenadas de pickup (latitude, longitude)
  - `destination`: Coordenadas de destino (latitude, longitude)
  - `pickupAddress`: Endereço de pickup
  - `destinationAddress`: Endereço de destino

**Exemplo de requisição:**
```json
{
  "riderId": "550e8400-e29b-41d4-a716-446655440000",
  "pickup": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "destination": {
    "latitude": -23.6155,
    "longitude": -46.7283
  },
  "pickupAddress": "Av. Paulista, 1000 - São Paulo, SP",
  "destinationAddress": "Rua da Consolação, 500 - São Paulo, SP"
}
```

### 3. Aceitar Corrida
- **POST** `/api/rides/{rideId}/accept`
- Permite que um motorista aceite uma corrida
- **Parâmetros:**
  - `rideId` (path): ID da corrida
  - `driverId` (body): ID do motorista

**Exemplo de requisição:**
```json
{
  "driverId": "660e8400-e29b-41d4-a716-446655440111"
}
```

### 4. Obter Status da Corrida
- **GET** `/api/rides/{rideId}`
- Recupera informações e status de uma corrida específica
- **Parâmetros:**
  - `rideId` (path): ID da corrida

## Status da Corrida

Os possíveis status de uma corrida são:
- `requested` - Corrida solicitada, aguardando aceitar
- `accepted` - Motorista aceitou a corrida
- `in_progress` - Corrida em andamento
- `completed` - Corrida completada
- `cancelled` - Corrida cancelada

## Testando a API

### Via Swagger UI
1. Acesse http://localhost:3000/api-docs
2. Clique no endpoint que deseja testar
3. Clique em "Try it out"
4. Preencha os parâmetros necessários
5. Clique em "Execute"
6. Veja a resposta e o código de status

### Via cURL

**Solicitar corrida:**
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
    "pickupAddress": "Av. Paulista, 1000 - São Paulo, SP",
    "destinationAddress": "Rua da Consolação, 500 - São Paulo, SP"
  }'
```

**Aceitar corrida:**
```bash
curl -X POST http://localhost:3000/api/rides/123e4567-e89b-12d3-a456-426614174000/accept \
  -H "Content-Type: application/json" \
  -d '{
    "driverId": "660e8400-e29b-41d4-a716-446655440111"
  }'
```

**Obter status:**
```bash
curl http://localhost:3000/api/rides/123e4567-e89b-12d3-a456-426614174000
```

## Códigos de Resposta

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `400 Bad Request` - Erro na solicitação (parâmetros inválidos)
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro interno do servidor

## Estrutura da Resposta

### Sucesso (Status 201/200)
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "rider_id": "550e8400-e29b-41d4-a716-446655440000",
  "driver_id": null,
  "pickup_location": {
    "latitude": -23.5505,
    "longitude": -46.6333
  },
  "destination_location": {
    "latitude": -23.6155,
    "longitude": -46.7283
  },
  "pickup_address": "Av. Paulista, 1000 - São Paulo, SP",
  "destination_address": "Rua da Consolação, 500 - São Paulo, SP",
  "status": "requested",
  "fare": 45.50,
  "requested_at": "2026-01-16T10:30:00Z"
}
```

### Erro (Status 400/404)
```json
{
  "error": "Mensagem descritiva do erro"
}
```

## Visualizando a Especificação JSON

A especificação completa em formato JSON pode ser acessada em:
```
http://localhost:3000/swagger.json
```

## Integração com Ferramentas Externas

### Postman
1. Acesse http://localhost:3000/swagger.json
2. No Postman, clique em "Import"
3. Cole a URL do Swagger JSON
4. Importe a coleção de endpoints

### IntelliJ IDEA / WebStorm
1. Instale o plugin Swagger/OpenAPI
2. Abra Preferences → Languages & Frameworks → OpenAPI Swagger
3. Adicione a URL: http://localhost:3000/swagger.json

## Próximos Passos

Para expandir a documentação Swagger:

1. **Adicionar autenticação**: Implementar JWT ou OAuth2
2. **Mais endpoints**: Adicionar endpoints para motoristas, passageiros e pagamentos
3. **Validação de schema**: Implementar validação com JSON Schema
4. **Rate limiting**: Documentar limites de taxa de requisição
5. **Versionamento**: Adicionar controle de versão da API

## Contato e Suporte

Para dúvidas sobre a API, entre em contato com: support@meumotorista.com
