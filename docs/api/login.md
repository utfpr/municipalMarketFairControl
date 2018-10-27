# Login

## `POST /login` - Realiza login feirante/supervisor

- Body

```javascript
{
	"cpf": "111.111.111-11",
	"senha": "123456"
}
```

- Resposta _#1_ - **Code 200** - Credenciais corretas

```javascript
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}	
```

- Resposta _#2_ - **Code 400** - Atributos incorretos
- Resposta _#3_ - **Code 401** - Credenciais incorretas
