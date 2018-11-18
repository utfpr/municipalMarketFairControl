# Login

## `POST /login` - Realiza login feirante/supervisor

- Body

```json
{
  "cpf": "11111111111",
  "senha": "123456"
}
```

- Resposta _#1_ - **Code 200** - Credenciais corretas

```javascript
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
	"tag": "feirante" // feirante|supervisor|administrador
}
```

- Resposta _#2_ - **Code 400** - Atributos incorretos
- Resposta _#3_ - **Code 401** - Credenciais incorretas
