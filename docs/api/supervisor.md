# Supervisor

## `POST /supervisor` - Adiciona supervisor

- Headers

```
    token: <jwt admin>
```

- Body

```javascript
{
    "cpf": "111.111.111-11",
    "nome:" "João",
    "senha": "123456",
    "is_adm": false
}
```

- Resposta _#1A_ - **Code 200** - Supervisor cadastrado

```javascript
{
    "msg": "ok"
}
```

- Resposta _#1B_ - **Code 200** - CPF existente

```javascript
{
    "msg": "cpf_existente"
}
```

- Resposta _#2_ - **Code 400** - Atributos incorretos/faltando
- Resposta _#3_ - **Code 401** - Token inválido

## `GET /supervisor` - Lista supervisores

- Headers:

```
    token: <jwt admin>
```

- Resposta _#1_ - **Code 200** - Sucesso

```javascript
[
  {
    "cpf": "111.111.111-11",
    "nome": "João",
    "is_adm": false
  },
  {
    "cpf": "111.111.222-22",
    "nome": "José",
    "is_adm": true
  }
]
```

- Resposta _#2_ - **Code 401** - Token inválido

## `GET /supervisor/11111111111` - Retorna informações supervisor pelo CPF

- Headers:

```
    token: <jwt admin>
```

- Resposta _#1A_ - **Code 200** - Sucesso

```javascript
{
    "cpf": "111.111.111-11",
    "nome": "João",
    "is_adm": false
}
```

- Resposta _#1B_ - **Code 200** - CPF não existente

```javascript
{
    "msg": "cpf_nao_existente"
}
```

- Resposta _#2_ - **Code 400** - CPF inválido
- Resposta _#3_ - **Code 401** - Token inválido

## `PUT /supervisor/11111111111` - Atualiza supervisor

- Headers

```
    token: <jwt admin>
```

- Body

```javascript
{
    "is_adm": true
}
```

- Resposta _#1A_ - **Code 200** - Supervisor atualizado

```javascript
{
    "msg": "ok"
}
```

- Resposta _#1B_ - **Code 200** - CPF não existente

```javascript
{
    "msg": "cpf_nao_existente"
}
```

- Resposta _#2_ - **Code 400** - Atributos incorretos/CPF inválido
- Resposta _#3_ - **Code 401** - Token inválido

## `DELETE /supervisor/11111111111` - Remove supervisor (marca como inativo)

- Headers:

```
    token: <jwt admin>
```

- Resposta _#1A_ - **Code 200** - Sucesso

```javascript
{
    "msg": "ok"
}
```

- Resposta _#1B_ - **Code 200** - CPF não existente

```javascript
{
    "msg": "cpf_nao_existente"
}
```

- Resposta _#2_ - **Code 400** - CPF inválido
- Resposta _#3_ - **Code 401** - Token inválido
