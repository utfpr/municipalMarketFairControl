# Categoria

## ```POST /categoria``` - Adiciona categoria
- Headers
```
    token: <jwt supervisor>
```
- Body
```javascript
{
    "nome": "Alimentos",
    "need_cnpj": "1"
}
```
- Resposta *#1A* - **Code 200** - Categoria cadastrada
```javascript
{
    "msg": "ok"
}
```
- Resposta *#1B* - **Code 200** - Nome existente
```javascript
{
    "msg": "nome_existente"
}
```
- Resposta *#2* - **Code 400** - Atributos incorretos/faltando
- Resposta *#3* - **Code 401** - Token inválido

## ```GET /categoria``` - Lista categorias
 - Headers: 
```
    token: <jwt supervisor>
```
- Resposta *#1* - **Code 200** - Sucesso
```javascript
[
    {
        "id": "1",
        "nome": "Alimentos",
        "need_cnpj": "1"
    },
    {
        "id": "2",
        "nome": "Artesanato",
        "need_cnpj": "0"
    }
]
```
- Resposta *#2* - **Code 401** - Token inválido

## ```GET /categoria/1``` - Retorna informações de uma categoria pelo ID
- Headers: 
```
    token: <jwt supervisor>
```

- Resposta *#1A* - **Code 200** - Sucesso
```javascript
{
    "id": "1",
    "nome": "Alimentos",
    "need_cnpj": "1"
}
```
- Resposta *#1B* - **Code 200** - ID não existente
```javascript
{
    "msg": "id_nao_existente"
}
```
- Resposta *#2* - **Code 401** - Token inválido

## ```GET /categoria/1/subcategorias``` - Lista subcategorias de uma categoria pelo ID

 - Headers: 
```
    token: <jwt supervisor>
```

- Resposta *#1A* - **Code 200** - Sucesso
```javascript
[
    {
        "id": "1",
        "nome": "Bolos"
    },
    {
        "id": "2",
        "nome": "Salgados"
    },
    {
        "id": "3",
        "nome": "Sorvetes"
    }
]
```
- Resposta *#1B* - **Code 200** - ID não existente
```javascript
{
    "msg": "id_nao_existente"
}
```
- Resposta *#2* - **Code 401** - Token inválido

## ```PUT /categoria/1``` - Atualiza categoria
- Headers
```
    token: <jwt supervisor>
```
- Body
```javascript
{
    "nome": "Artesanato",
    "need_cnpj": "0" 
}
```
- Resposta *#1A* - **Code 200** - Categoria atualizada
```javascript
{
    "msg": "ok"
}
```
- Resposta *#1B* - **Code 200** - ID não existente
```javascript
{
    "msg": "id_nao_existente"
}
```
- Resposta *#2* - **Code 400** - Atributos incorretos
- Resposta *#3* - **Code 401** - Token inválido

## ```DELETE /categoria/1``` - Remove categoria
- Headers
```
    token: <jwt supervisor>
```
- Resposta *#1A* - **Code 200** - Sucesso
```javascript
{
    "msg": "ok"
}
```
- Resposta *#1B* - **Code 200** - ID não existente
```javascript
{
    "msg": "id_nao_existente"
}
```
- Resposta *#2* - **Code 401** - Token inválido