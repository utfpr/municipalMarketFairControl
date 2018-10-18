# Feirante

## `POST /feirante` - Adiciona feirante

- Headers

```
    token: <jwt supervisor>
```

- Body

```javascript
{
    "cpf": "111.111.111-11",
    "cnpj": "19.014.667/0001-71",
    "usa_ee": true,
    "nome_fantasia": "Barraca do Jão",
    "razao_social": "João LTDA",
    "comprimento_barraca": 4,
    "largura_barraca": 4,
    "endereco": "Rua São Paulo, 123",
    "voltagem_ee": 220,
    "sub_categoria_id": 2,
    "senha": "123456"
}
```

- Resposta _#1A_ - **Code 200** - Feirante cadastrado

```
ok
```

- Resposta _#1B_ - **Code 200** - CPF existente

```
cpf_existente
```

- Resposta _#1C_ - **Code 200** - Subcategoria não existe

```
subcategoria_nao_existe
```

- Resposta _#2_ - **Code 400** - Atributos incorretos/faltando
- Resposta _#3_ - **Code 401** - Token inválido

## `GET /feirante` - Lista feirantes

- Headers:

```
    token: <jwt supervisor>
```

- Resposta _#1_ - **Code 200** - Sucesso

```javascript
[
  {
    "cpf": "111.111.111-11",
    "cnpj": "19.014.667/0001-71",
    "usa_ee": true,
    "nome_fantasia": "Barraca do Jão",
    "razao_social": "João LTDA",
    "comprimento_barraca": 4,
    "largura_barraca": 4,
    "endereco": "Rua São Paulo, 123",
    "voltagem_ee": 220,
    "sub_categoria_id": 2
  },
  {
    "cpf": "111.111.111-22",
    "cnpj": "19.014.667/0001-72",
    "usa_ee": true,
    "nome_fantasia": "Barraca do Jão 2",
    "razao_social": "João LTDA 2",
    "comprimento_barraca": 4,
    "largura_barraca": 4,
    "endereco": "Rua São Paulo, 123",
    "voltagem_ee": 220,
    "sub_categoria_id": 2
  }
];
```

- Resposta _#2_ - **Code 401** - Token inválido

## `GET /feirante/11111111111` - Retorna informações feirante pelo CPF

- Headers:

```
    token: <jwt supervisor>
```

- Resposta _#1A_ - **Code 200** - Sucesso

```javascript
{
    "cpf": "111.111.111-11",
    "cnpj": "19.014.667/0001-71",
    "usa_ee": true,
    "nome_fantasia": "Barraca do Jão",
    "razao_social": "João LTDA",
    "comprimento_barraca": 4,
    "largura_barraca": 4,
    "endereco": "Rua São Paulo, 123",
    "voltagem_ee": 220,
    "sub_categoria_id": 2
}
```

- Resposta _#1B_ - **Code 200** - CPF não existe

```
cpf_nao_existe
```

- Resposta _#2_ - **Code 400** - CPF inválido
- Resposta _#3_ - **Code 401** - Token inválido

## `PUT /feirante/11111111111` - Atualiza feirante

- Headers

```
    token: <jwt supervisor>
```

- Body

```javascript
{
    "voltagem_ee": 110
}
```

- Resposta _#1A_ - **Code 200** - Feirante atualizado

```
ok
```

- Resposta _#1B_ - **Code 200** - CPF não existente

```
cpf_nao_existente
```

- Resposta _#2_ - **Code 400** - Atributos incorretos/CPF inválido
- Resposta _#3_ - **Code 401** - Token inválido

## `DELETE /feirante/11111111111` - Remove feirante (marca como inativo)

- Headers:

```
    token: <jwt supervisor>
```

- Resposta _#1A_ - **Code 200** - Sucesso

```
ok
```

- Resposta _#1B_ - **Code 200** - CPF não existente

```
cpf_nao_existente
```

- Resposta _#2_ - **Code 400** - CPF inválido
- Resposta _#3_ - **Code 401** - Token inválido

## `GET /feirante/11111111111/participacoes` - Retorna participações do feirante pelo CPF

- Headers:

```
    token: <jwt supervisor>
```

- Resposta _#1A_ - **Code 200** - Sucesso

```javascript
[
  {
    "data_feira": "01/01/2018",
    "faturamento": 10000,
    "periodo": 1,
    "hora_confirmacao": "15:45 21/12/2017",
    "celula_id": 4
  },
  {
    "data_feira": "08/01/2018",
    "faturamento": 15000,
    "periodo": 1,
    "hora_confirmacao": "15:45 02/01/2017",
    "celula_id": 4
  }
];
```

- Resposta _#1B_ - **Code 200** - CPF não existe

```
cpf_nao_existe
```

- Resposta _#2_ - **Code 400** - CPF inválido
- Resposta _#3_ - **Code 401** - Token inválido

## `POST /feirante/confirma` - Confirma presença na feira atual

- Headers

```
    token: <jwt feirante>
```

- Body

```javascript
{
    "periodo": 1
}
```

- Resposta _#1A_ - **Code 200** - Feirante confirmado

```
ok
```

- Resposta _#1B_ - **Code 200** - Periodo inválido (diferente de 1,2,3)

```
periodo_invalido
```

- Resposta _#1C_ - **Code 200** - Feirante não confirmado (feira não existe/cancelada)

```
feirante_nao_confirmado
```

- Resposta _#2_ - **Code 400** - Atributos incorretos/faltando
- Resposta _#3_ - **Code 401** - Token inválido
