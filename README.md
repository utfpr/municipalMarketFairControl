# municipalMarketFairControl
A control software developed for the Campo Mourão municipal administration's market fairs

# Instalação

## Primeiros passos
Vamos começar instalando os softwares necessários

- Instale [Node.js](https://nodejs.org/en/)
- Instale o [Yarn](https://yarnpkg.com/pt-BR/) utilizando o comando `npm install yarn -g`
- Instale o [MariaDB](https://mariadb.org/)

## Backend
Após fazer a instalação dos softwares necessários para começar a desenvolver, precisamos instalar as dependências do projeto.
Para isso, acesse a pasta `/backend` e execute o comando de instalação:

#### `yarn`

Após executar a instalação das dependências do projeto, é necessário é necessário executar o `script.sql` dentro da pasta `database`
Para isso utilize o [MySQL Workbench](https://www.mysql.com/products/workbench/) ou utilize o CLI do MariaDB.

Após a criação do banco de dados e de suas tabelas, é necessário adicionar o primeiro administrador do sistema.

Para isso, ainda na pasta `database` abra o terminal e execute o arquivo `insert_first_admin.js` utilizando o comando:
#### `node insert_first_admin.js`

Ao executar o script, também podemos executar o script para popular o banco de dados. Para isso, utilize o comando:
#### `node insert_fake_data.js`

Desta forma, o nosso banco de dados esta pronto e para executar o backend navegue até a pasta `/backend` e execute o comando:
#### `yarn run serve`

Agora, após executar o comando, o servidor esta disponível através da porta `:3000` do seu localhost.


## Frontend

Para iniciar o front-end devemos primeiramente instalar as dependências do projeto. Para isso acesse a pasta `/frontend` e execute o comando:
#### `yarn`

Feito a instalação das dependências do projeto, basta executar o servidor frontend, para isso, execute o seguinte comando:
#### `yarn start`

Após terminar a execução do comando anterior, o servidor front-end ficará disponível através da porta `:8000` do seu localhost.

# Importante
A instalação das dependências utilizando o comando `yarn` só é necessário durante a primeira execução, ou se for adicionado uma nova dependência.
Então se não for alterado nada dentro do arquivo `package.json`, não é necessário executá-lo novamente.

## Dados do primeiro admin:
- CPF: `56662192007`
- Senha: `123456`

## .env
Dentro da pasta ´frontend´ faça uma cópia do arquivo `.env-default` e de o nome de `.env`. Ele serve para definir as configurações do front-end, como a porta de execução e o endereço backend.
Caso for necessário fazer a alteração do mesmo, pare o servidor frontend, altere a configuração dentro do `.env` e rode novamente o servidor frontend.

# Cuidado
Caso use um banco um usuário diferente de `root` sem senha para o banco de dados, é necessário alterar as informações contidas no arquivo `backend/config/config.json`. Porém, lembre-se de **NÃO FAZER O COMMIT DESTAS ALTERAÇÕES**, pois essas alterações se tornarão publicas e sua senha será exposta, caso for uma senha sensível. Para fazer a alterações, basta substituir o trecho de código contendo as suas informações.

```json
 "development": {
    "username": "SEU USUARIO AQUI",
    "password": "SUA SENHA AQUI",
    "database": "feira_municipal",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
    "operatorsAliases": false
  },
```
