# Login

## ```POST /login``` - Realiza login feirante/supervisor
 - Headers: 
```
```
- Query:
```
```
- Body:
```javascript
{
	"cpf": "111.111.111-11",
	"senha": "123456"
}
```
- Resposta *#1* - **Code 200** - Credenciais corretas:
```javascript
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```
- Resposta *#2* - **Code 401** - Credenciais incorretas:
```javascript
```