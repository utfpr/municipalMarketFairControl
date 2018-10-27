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
```
ok
```
- Resposta *#1B* - **Code 200** - ID não existente (categoria)
```
categoria_nao_existente
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
```
id_nao_existente
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
```
ok
```
- Resposta *#1B* - **Code 200** - ID não existente
```
id_nao_existente
```
- Resposta *#2* - **Code 400** - Atributo incorreto
- Resposta *#3* - **Code 401** - Token inválido

## ```DELETE /subcategoria/1``` - Remove subcategoria
 - Headers: 
```
    token: <jwt supervisor>
```

- Resposta *#1A* - **Code 200** - Sucesso
```
ok
```
- Resposta *#1B* - **Code 200** - ID não existente
```
id_nao_existente
```
- Resposta *#2* - **Code 401** - Token inválido