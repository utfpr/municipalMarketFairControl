# Subcategoria

## ```POST /subcategoria``` - Adicionar subcategoria
 - Headers
```
    token: <jwt supervisor>
```

- Body
```javascript
{
    "nome": "Bolos",
    "categoria_id": "1"
}
```

- Resposta *#1A* - **Code 200** - Subcategoria cadastrada
```javascript
{
    "msg": "ok"
}
```
- Resposta *#1B* - **Code 200** - Erro no banco de dados
```javascript
{
    "msg": "erro"
}
```
- Resposta *#1C* - **Code 200** - ID não existente (categoria)
```javascript
{
    "msg": "categoria_nao_existente"
}
```
- Resposta *#2* - **Code 400** - Atributos faltando
- Resposta *#3* - **Code 401** - Token inválido

## ```GET /subcategoria/1``` - Retorna informações de uma subcategoria pelo ID
- Headers: 
```
    token: <jwt supervisor>
```

- Resposta *#1A* - **Code 200** - Sucesso
```javascript
{
    "id": "1",
    "nome": "Doces",
    "categoria_id": "1"
}
```
- Resposta *#1B* - **Code 200** - ID não existente
```javascript
{
    "msg": "id_nao_existente"
}
```
- Resposta *#2* - **Code 401** - Token inválido

## ```PUT /subcategoria/1``` - Atualiza subcategoria
 - Headers: 
```
    token: <jwt supervisor>
```

- Body
```javascript
{
    "nome": "Doces"
}
```

- Resposta *#1A* - **Code 200** - Subcategoria atualizada
```javascript
{
    "msg": "ok"
}
```
- Resposta *#1B* - **Code 200** - Erro no banco de dados
```javascript
{
    "msg": "erro"
}
```
- Resposta *#1C* - **Code 200** - ID não existente
```javascript
{
    "msg": "id_nao_existente"
}
```
- Resposta *#2* - **Code 400** - Atributo incorreto
- Resposta *#3* - **Code 401** - Token inválido

## ```DELETE /subcategoria/1``` - Remove subcategoria
 - Headers: 
```
    token: <jwt supervisor>
```

- Resposta *#1A* - **Code 200** - Sucesso
```javascript
{
    "msg": "ok"
}
```
- Resposta *#1B* - **Code 200** - Erro no banco de dados
```javascript
{
    "msg": "erro"
}
```
- Resposta *#1C* - **Code 200** - ID não existente
```javascript
{
    "msg": "id_nao_existente"
}
```
- Resposta *#2* - **Code 401** - Token inválido
