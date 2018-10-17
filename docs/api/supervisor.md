# Supervisor

## ```POST /supervisor``` - Adiciona supervisor
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

- Resposta *#1A* - **Code 200** - Supervisor cadastrado
```
ok
```
- Resposta *#1B* - **Code 200** - CPF existente
```
cpf_existente
```
- Resposta *#2* - **Code 400** - Atributos incorretos/faltando
- Resposta *#3* - **Code 401** - Token inválido

## ```GET /supervisor``` - Lista supervisores
 - Headers: 
```
    token: <jwt admin>
```

- Resposta *#1* - **Code 200** - Sucesso
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

- Resposta *#2* - **Code 401** - Token inválido

## ```GET /supervisor/11111111111``` - Retorna informações supervisor pelo CPF
 - Headers: 
```
    token: <jwt admin>
```

- Resposta *#1A* - **Code 200** - Sucesso
```javascript
{
    "cpf": "111.111.111-11",
    "nome": "João",
    "is_adm": false
}
```

- Resposta *#1B* - **Code 200** - CPF não existe
```
cpf_nao_existe
```

- Resposta *#2* - **Code 400** - CPF inválido
- Resposta *#3* - **Code 401** - Token inválido

## ```PUT /supervisor/11111111111``` - Atualiza supervisor
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

- Resposta *#1A* - **Code 200** - Supervisor atualizado
```
ok
```
- Resposta *#1B* - **Code 200** - CPF não existente
```
cpf_nao_existente
```
- Resposta *#2* - **Code 400** - Atributos incorretos/CPF inválido
- Resposta *#3* - **Code 401** - Token inválido

## ```DELETE /supervisor/11111111111``` - Remove supervisor (marca como inativo)
 - Headers: 
```
    token: <jwt admin>
```

- Resposta *#1A* - **Code 200** - Sucesso
```
ok
```

- Resposta *#1B* - **Code 200** - CPF não existente
```
cpf_nao_existente
```

- Resposta *#2* - **Code 400** - CPF inválido
- Resposta *#3* - **Code 401** - Token inválido