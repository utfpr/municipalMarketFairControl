# Célula

## `GET /celula` - Lista células

- Headers:

```
    token: <jwt supervisor>
```

- Resposta _#1_ - **Code 200** - Sucesso

```json
[
  {
    "cpf_feirante": "58295846035",
    "periodo": 1
  },
  {
    "cpf_feirante": "40515695009",
    "periodo": 2
  }
]
```

- Resposta _#2_ - **Code 401** - Token inválido

## `GET /celula/1` - Retorna informações da célula pelo ID

- Headers:

```
    token: <jwt supervisor>
```

- Resposta _#1A_ - **Code 200** - Sucesso

```json
{
  "cpf_feirante": "58295846035",
  "periodo": 1
}
```

- Resposta _#1B_ - **Code 200** - ID não existente

```json
{
  "msg": "id_nao_existente"
}
```

- Resposta _#2_ - **Code 401** - Token inválido

## `PUT /celula/1` - Atualiza célula

- Headers

```
   Token: <jwt supervisor>
```

- Body

```json
{
  "cpf_feirante": "58295846035",
  "periodo": 1
}
```

- Resposta _#1A_ - **Code 200** - Célula atualizada

```json
{
  "msg": "ok"
}
```

- Resposta _#1B_ - **Code 200** - Erro no banco de dados

```json
{
  "msg": "erro"
}
```

- Resposta _#1C_ - **Code 200** - ID não existente

```json
{
  "msg": "id_nao_existente"
}
```

- Resposta _#1D_ - **Code 200** - CPF não existente

```json
{
  "msg": "cpf_nao_existente"
}
```

- Resposta _#2_ - **Code 400** - Atributos incorretos/CPF inválido
- Resposta _#3_ - **Code 401** - Token inválido
