define({ "api": [
  {
    "type": "post",
    "url": "/feirante",
    "title": "Adiciona feirante",
    "name": "AddFeirante",
    "group": "Feirante",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT admin/supervisor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers",
          "content": "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.\nSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Sucesso - 200": [
          {
            "group": "Sucesso - 200",
            "type": "Object",
            "optional": false,
            "field": "resposta",
            "description": "<p>Informações feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.nome_fantasia",
            "description": "<p>Nome fantasia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.razao_social",
            "description": "<p>Razão social</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.endereco",
            "description": "<p>Endereço</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.bairro",
            "description": "<p>Bairro</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cidade",
            "description": "<p>Cidade</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.uf",
            "description": "<p>UF</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cnpj",
            "description": "<p>CNPJ (não obrigatório)</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.inscricao_estadual",
            "description": "<p>Inscrição Estadual</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.telefone_fixo",
            "description": "<p>Telefone fixo</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.celular",
            "description": "<p>Celular</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.barraca",
            "description": "<p>Já tem barraca?</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.id_categoria",
            "description": "<p>Id categoria</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.energia",
            "description": "<p>Energia elétrica</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.estimativa_energia",
            "description": "<p>Estimativa de carga de energia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.uso_energia",
            "description": "<p>Uso da energia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Boolean",
            "optional": false,
            "field": "resposta.pode_sol",
            "description": "<p>Pode ficar no sol?</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.sem_sombra",
            "description": "<p>Como resolver o sol</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.data_inicio",
            "description": "<p>Data início</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.nome",
            "description": "<p>Nome feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.rg",
            "description": "<p>RG feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cpf",
            "description": "<p>CPF feirante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo body",
          "content": "{\n  \"nome_fantasia\": \"Barraca do Seu Jão\",\n  \"razao_social\": \"Seu João LTDA\",\n  \"endereco\": \"Rua Brasil, 111\",\n  \"bairro\": \"Centro\",\n  \"cidade\": \"Campo Mourão\",\n  \"uf\": \"Paraná\",\n  \"cnpj\": \"1111111111111\" ou \"\",\n  \"inscricao_estadual\": \"123457\" ou \"\",\n  \"telefone_fixo\": \"4435230000\",\n  \"celular\": \"44999998888\",\n  \"email\": \"jao@gmail.com\",\n  \"barraca\": \"\" ou \"3x3\" ou \"5x5\" ou \"XxX\",\n  \"id_categoria\": 4,\n  \"energia\": 0 ou 110 ou 220,\n  \"estimativa_energia\": 500,\n  \"uso_energia\": \"Fogão\",\n  \"pode_sol\": true ou false,\n  \"sem_sombra\": \"\" ou \"Usar uma lona\"\n  \"data_inicio\": \"31-12-2018\",\n  \"nome\": \"João Amoedo\",\n  \"rg\": \"111111111\",\n  \"cpf\": \"11111111111\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Sucesso - 200": [
          {
            "group": "Sucesso - 200",
            "optional": false,
            "field": "FeiranteAdicionado",
            "description": "<p>Feirante adicionado</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Erro - 400": [
          {
            "group": "Erro - 400",
            "optional": false,
            "field": "DadosInvalidos",
            "description": "<p>Dados inválidos</p>"
          }
        ],
        "Erro - 401": [
          {
            "group": "Erro - 401",
            "optional": false,
            "field": "NaoAutorizado",
            "description": "<p>Não autorizado</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feirante.js",
    "groupTitle": "Feirante"
  },
  {
    "type": "delete",
    "url": "/feirante",
    "title": "Apaga (desativa) feirante",
    "name": "DeleteFeirante",
    "group": "Feirante",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT admin/supervisor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers",
          "content": "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.\nSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cpf",
            "description": "<p>CPF feirante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo parâmetro query",
          "content": "/feirante/11111111111",
          "type": "Number"
        }
      ]
    },
    "success": {
      "fields": {
        "Sucesso - 200": [
          {
            "group": "Sucesso - 200",
            "optional": false,
            "field": "FeiranteDesativado",
            "description": "<p>Feirante desativado</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Erro - 400": [
          {
            "group": "Erro - 400",
            "optional": false,
            "field": "CpfInvalido",
            "description": "<p>CPF inválido</p>"
          }
        ],
        "Erro - 401": [
          {
            "group": "Erro - 401",
            "optional": false,
            "field": "NaoAutorizado",
            "description": "<p>Não autorizado</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feirante.js",
    "groupTitle": "Feirante"
  },
  {
    "type": "get",
    "url": "/feirante/:cpf",
    "title": "Informações feirante",
    "name": "GetFeirante",
    "group": "Feirante",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT admin/supervisor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers",
          "content": "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.\nSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cpf",
            "description": "<p>CPF feirante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo parâmetro query",
          "content": "/feirante/11111111111",
          "type": "Number"
        }
      ]
    },
    "success": {
      "fields": {
        "Sucesso - 200": [
          {
            "group": "Sucesso - 200",
            "type": "Object",
            "optional": false,
            "field": "resposta",
            "description": "<p>Informações feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.nome_fantasia",
            "description": "<p>Nome fantasia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.razao_social",
            "description": "<p>Razão social</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.endereco",
            "description": "<p>Endereço</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.bairro",
            "description": "<p>Bairro</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cidade",
            "description": "<p>Cidade</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.uf",
            "description": "<p>UF</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cnpj",
            "description": "<p>CNPJ (não obrigatório)</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.inscricao_estadual",
            "description": "<p>Inscrição Estadual</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.telefone_fixo",
            "description": "<p>Telefone fixo</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.celular",
            "description": "<p>Celular</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.barraca",
            "description": "<p>Já tem barraca?</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.id_categoria",
            "description": "<p>Id categoria</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.energia",
            "description": "<p>Energia elétrica</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.estimativa_energia",
            "description": "<p>Estimativa de carga de energia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.uso_energia",
            "description": "<p>Uso da energia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Boolean",
            "optional": false,
            "field": "resposta.pode_sol",
            "description": "<p>Pode ficar no sol?</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.sem_sombra",
            "description": "<p>Como resolver o sol</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.data_inicio",
            "description": "<p>Data início</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.nome",
            "description": "<p>Nome feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.rg",
            "description": "<p>RG feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cpf",
            "description": "<p>CPF feirante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo resposta",
          "content": "{\n  \"nome_fantasia\": \"Barraca do Seu Jão\",\n  \"razao_social\": \"Seu João LTDA\",\n  \"endereco\": \"Rua Brasil, 111\",\n  \"bairro\": \"Centro\",\n  \"cidade\": \"Campo Mourão\",\n  \"uf\": \"Paraná\",\n  \"cnpj\": \"1111111111111\" ou \"\",\n  \"inscricao_estadual\": \"123457\" ou \"\",\n  \"telefone_fixo\": \"4435230000\",\n  \"celular\": \"44999998888\",\n  \"email\": \"jao@gmail.com\",\n  \"barraca\": \"\" ou \"3x3\" ou \"5x5\" ou \"XxX\",\n  \"id_categoria\": 4,\n  \"energia\": 0 ou 110 ou 220,\n  \"estimativa_energia\": 500,\n  \"uso_energia\": \"Fogão\",\n  \"pode_sol\": true ou false,\n  \"sem_sombra\": \"\" ou \"Usar uma lona\"\n  \"data_inicio\": \"31-12-2018\",\n  \"nome\": \"João Amoedo\",\n  \"rg\": \"111111111\",\n  \"cpf\": \"11111111111\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro - 400": [
          {
            "group": "Erro - 400",
            "optional": false,
            "field": "NaoEncontrado",
            "description": "<p>Feirante não encontrado</p>"
          }
        ],
        "Erro - 401": [
          {
            "group": "Erro - 401",
            "optional": false,
            "field": "NaoAutorizado",
            "description": "<p>Não autorizado</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feirante.js",
    "groupTitle": "Feirante"
  },
  {
    "type": "get",
    "url": "/feirante",
    "title": "Lista todos os feirantes",
    "name": "ListFeirante",
    "group": "Feirante",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT admin/supervisor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers",
          "content": "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.\nSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Sucesso - 200": [
          {
            "group": "Sucesso - 200",
            "type": "Object[]",
            "optional": false,
            "field": "resposta",
            "description": "<p>Informações feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.nome_fantasia",
            "description": "<p>Nome fantasia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.razao_social",
            "description": "<p>Razão social</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.endereco",
            "description": "<p>Endereço</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.bairro",
            "description": "<p>Bairro</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cidade",
            "description": "<p>Cidade</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.uf",
            "description": "<p>UF</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cnpj",
            "description": "<p>CNPJ (não obrigatório)</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.inscricao_estadual",
            "description": "<p>Inscrição Estadual</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.telefone_fixo",
            "description": "<p>Telefone fixo</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.celular",
            "description": "<p>Celular</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.barraca",
            "description": "<p>Já tem barraca?</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.id_categoria",
            "description": "<p>Id categoria</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.energia",
            "description": "<p>Energia elétrica</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.estimativa_energia",
            "description": "<p>Estimativa de carga de energia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.uso_energia",
            "description": "<p>Uso da energia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Boolean",
            "optional": false,
            "field": "resposta.pode_sol",
            "description": "<p>Pode ficar no sol?</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.sem_sombra",
            "description": "<p>Como resolver o sol</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.data_inicio",
            "description": "<p>Data início</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.nome",
            "description": "<p>Nome feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.rg",
            "description": "<p>RG feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cpf",
            "description": "<p>CPF feirante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo resposta",
          "content": "{\n  [\n    {\n      \"nome_fantasia\": \"Barraca do Seu Jão\",\n      \"razao_social\": \"Seu João LTDA\",\n      \"endereco\": \"Rua Brasil, 111\",\n      \"bairro\": \"Centro\",\n      \"cidade\": \"Campo Mourão\",\n      \"uf\": \"Paraná\",\n      \"cnpj\": \"1111111111111\" ou \"\",\n      \"inscricao_estadual\": \"123457\" ou \"\",\n      \"telefone_fixo\": \"4435230000\",\n      \"celular\": \"44999998888\",\n      \"email\": \"jao@gmail.com\",\n      \"barraca\": \"\" ou \"3x3\" ou \"5x5\" ou \"XxX\",\n      \"id_categoria\": 4,\n      \"energia\": 0 ou 110 ou 220,\n      \"estimativa_energia\": 500,\n      \"uso_energia\": \"Fogão\",\n      \"pode_sol\": true ou false,\n      \"sem_sombra\": \"\" ou \"Usar uma lona\"\n      \"data_inicio\": \"31-12-2018\",\n      \"nome\": \"João Amoedo\",\n      \"rg\": \"111111111\",\n      \"cpf\": \"11111111111\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Erro - 401": [
          {
            "group": "Erro - 401",
            "optional": false,
            "field": "NaoAutorizado",
            "description": "<p>Não autorizado</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feirante.js",
    "groupTitle": "Feirante"
  },
  {
    "type": "put",
    "url": "/feirante",
    "title": "Atualiza dados feirante",
    "name": "UpdateFeirante",
    "group": "Feirante",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT admin/supervisor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Headers",
          "content": "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.\nSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          "type": "String"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cpf",
            "description": "<p>CPF feirante</p>"
          }
        ],
        "Sucesso - 200": [
          {
            "group": "Sucesso - 200",
            "type": "Object",
            "optional": false,
            "field": "resposta",
            "description": "<p>Informações feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.nome_fantasia",
            "description": "<p>Nome fantasia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.razao_social",
            "description": "<p>Razão social</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.endereco",
            "description": "<p>Endereço</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.bairro",
            "description": "<p>Bairro</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cidade",
            "description": "<p>Cidade</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.uf",
            "description": "<p>UF</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.cnpj",
            "description": "<p>CNPJ (não obrigatório)</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.inscricao_estadual",
            "description": "<p>Inscrição Estadual</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.telefone_fixo",
            "description": "<p>Telefone fixo</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.celular",
            "description": "<p>Celular</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.barraca",
            "description": "<p>Já tem barraca?</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.id_categoria",
            "description": "<p>Id categoria</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.energia",
            "description": "<p>Energia elétrica</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Number",
            "optional": false,
            "field": "resposta.estimativa_energia",
            "description": "<p>Estimativa de carga de energia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.uso_energia",
            "description": "<p>Uso da energia</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "Boolean",
            "optional": false,
            "field": "resposta.pode_sol",
            "description": "<p>Pode ficar no sol?</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.sem_sombra",
            "description": "<p>Como resolver o sol</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.data_inicio",
            "description": "<p>Data início</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.nome",
            "description": "<p>Nome feirante</p>"
          },
          {
            "group": "Sucesso - 200",
            "type": "String",
            "optional": false,
            "field": "resposta.rg",
            "description": "<p>RG feirante</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Exemplo parâmetro query",
          "content": "/feirante/11111111111",
          "type": "Number"
        },
        {
          "title": "Exemplo body",
          "content": "{\n  \"nome_fantasia\": \"Barraca do Seu Jão\",\n  \"razao_social\": \"Seu João LTDA\",\n  \"endereco\": \"Rua Brasil, 111\",\n  \"bairro\": \"Centro\",\n  \"cidade\": \"Campo Mourão\",\n  \"uf\": \"Paraná\",\n  \"cnpj\": \"1111111111111\" ou \"\",\n  \"inscricao_estadual\": \"123457\" ou \"\",\n  \"telefone_fixo\": \"4435230000\",\n  \"celular\": \"44999998888\",\n  \"email\": \"jao@gmail.com\",\n  \"barraca\": \"\" ou \"3x3\" ou \"5x5\" ou \"XxX\",\n  \"id_categoria\": 4,\n  \"energia\": 0 ou 110 ou 220,\n  \"estimativa_energia\": 500,\n  \"uso_energia\": \"Fogão\",\n  \"pode_sol\": true ou false,\n  \"sem_sombra\": \"\" ou \"Usar uma lona\"\n  \"data_inicio\": \"31-12-2018\",\n  \"nome\": \"João Amoedo\",\n  \"rg\": \"111111111\",\n  \"cpf\": \"11111111111\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Sucesso - 200": [
          {
            "group": "Sucesso - 200",
            "optional": false,
            "field": "FeiranteAdicionado",
            "description": "<p>Feirante adicionado</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Erro - 400": [
          {
            "group": "Erro - 400",
            "optional": false,
            "field": "DadosInvalidos",
            "description": "<p>Dados inválidos</p>"
          }
        ],
        "Erro - 401": [
          {
            "group": "Erro - 401",
            "optional": false,
            "field": "NaoAutorizado",
            "description": "<p>Não autorizado</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feirante.js",
    "groupTitle": "Feirante"
  }
] });
