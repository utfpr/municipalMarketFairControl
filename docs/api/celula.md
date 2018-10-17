# Célula

## ```PUT /celula/1``` - Atualiza célula
- Headers

 ```
    Token: <jwt supervisor>
 ```

- Body

```javascript
{
    "cpf_feirante": "111.111.111-11",
    "periodo": "1"
}
```

- Resposta *#1A* - **Code 200** - Célula atualizada
```
ok
```
- Resposta *#1B* - **Code 200** - ID não existente
```
id_nao_existente
```

- Resposta *#2* - **Code 400** - Atributos incorretos
- Resposta *#3* - **Code 401** - Token inválido


## ```GET /celula``` - Lista células

- Headers: 
```
    token: <jwt supervisor>
```

- Resposta *#1* - **Code 200** - Sucesso
```javascript
[
    {
        "cpf_feirante": "111.111.111-11",
        "periodo": "1"
    },
    {
        "cpf_feirante": "111.111.333-22",
        "periodo": "2"
    }
]
```

- Resposta *#2* - **Code 401** - Token inválido


## ```GET /celula/1``` - Retorna informações da célula pelo ID
 - Headers: 
```
    token: <jwt supervisor>
```

- Resposta *#1A* - **Code 200** - Sucesso
```javascript
{
    "cpf_feirante": "111.111.111-11",
    "periodo": "1"
}
```

- Resposta *#1B* - **Code 200** - ID não existente
```
id_nao_existente
```
- Resposta *#2* - **Code 401** - Token inválido
