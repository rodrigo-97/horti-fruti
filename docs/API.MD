
## Documentação da API

#### Prefixo da api
`/api`

#### Responses
#### 200 - OK
Retorna uma listagem de acordo com o endpoint usado
```json
[
	{
		"id": 1,
		"user_id": 42,
		"name": "CLIENT",
		"phone": "51272795659",
		"created_at": "2022-07-12T16:09:56.733-03:00",
		"updated_at": "2022-07-12T16:09:56.733-03:00",
		"user": {
			"id": 42,
			"email": "client@client.com",
			"remember_me_token": null,
			"type": "CLIENT",
			"created_at": "2022-07-12T16:09:56.728-03:00",
			"updated_at": "2022-07-12T16:09:56.728-03:00"
		}
	}
]
```

#### 201 - Created
Retorna entidade cadastrada de acordo com endpoint usado
```json
{
	"email": "rods@rodas.com",
	"type": "CLIENT",
	"created_at": "2022-07-14T10:34:18.416-03:00",
	"updated_at": "2022-07-14T10:34:18.417-03:00",
	"id": 124
}
```

#### 204 - No content
Retorna que alguma operação foi realizada com sucesso

#### 400 - Bad Request
Retorna que algo deu errado na realização de alguma operação
```json
{
	"error": "Something went wrong"
}
```

#### 401 - Unauthenticated
Retorna que o usuário não está autenticado
```json
{
	"errors": [
		{
			"message": "E_UNAUTHORIZED_ACCESS: Unauthorized access"
		}
	]
}
```

#### 422 - Unprocessable  Entity
Retorna erros encontrados na validação do `body`da requisição
```json
{
	"errors": [
		{
			"rule": "required",
			"field": "name",
			"message": "O campo name é obrigatório"
		},
		{
			"rule": "required",
			"field": "email",
			"message": "O campo email é obrigatório"
		},
		{
			"rule": "required",
			"field": "password",
			"message": "O campo password é obrigatório"
		},
		{
			"rule": "required",
			"field": "confirmPassword",
			"message": "O campo confirmPassword é obrigatório"
		},
		{
			"rule": "required",
			"field": "phone",
			"message": "O campo phone é obrigatório"
		}
	]
}
```


### Endpoints - Cliente
Usado para criar um Cliente \
**URL**: `/clients`\
**Method**: `POST`\
**Requer autenticação**: `sim`\
**Corpo da requisição**:
```json
{
	"name": "[Nome do usuário]",
	"email": "[E-mail válido]",
	"phone": "[Telefone válido]",
	"password": "[Senha maior do que 8 caracteres]",
	"confirmPassword": "[Confirmação da senha]"
}
```
