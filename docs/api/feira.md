# Feira

## `GET /feira` - Informações da feira atual (data, cancelado)

- Headers

```
    token: <jwt feirante/supervisor>
```

- Resposta _#1A_ - **Code 200** - Sucesso
```javascript
{
    "data": "01/01/2018",
    "status": 1
}
```

- Resposta _#1B_ - **Code 200** - Sem feira atual (não foi criada no sistema)
```
feira_invalida
```

- Resposta _#2_ - **Code 401** - Token inválido

## `POST /feira` - Adiciona feira

- Headers

```
    token: <jwt supervisor>
```

- Body

```javascript
{
    "data": "01/01/2018"
}
```

- Resposta _#1A_ - **Code 200** - Feira cadastrada

```
ok
```

- Resposta _#1B_ - **Code 200** - Data não permitida (data anterior)

```
data_nao_permitida
```

- Resposta _#2_ - **Code 400** - Atributos incorretos/faltando
- Resposta _#3_ - **Code 401** - Token inválido

## `POST /feira/cancelar` - Cancelar feira atual

- Headers

```
    token: <jwt supervisor>
```

- Resposta _#1A_ - **Code 200** - Feira cancelada

```
ok
```

- Resposta _#1B_ - **Code 200** - Feira não cancelada (feira ja foi cancelada/sem feira atual)

```
feira_nao_cancelada
```

- Resposta _#2_ - **Code 401** - Token inválido
