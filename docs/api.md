# Horti-fruit API

Descreve os endpoints existentes e os modelos usados para as requisições

### Prefixo da API
`/api`

### Endpoints

#### Auth

|Caminho   |  Método | Retorno
|-         |-        |-        
| `/auth/me` | `GET` | Dados do usuário logado de acordo com o tipo de usuário
| `/login` | `POST` | Token de autenticação

#### Clientes

|Caminho       |  Método | Retorno
|-             |-        |-        
| `/clients` | `POST` | Dados cadastrais do cliente
| `/clients` | `GET` | Lista de clientes
| `/clients/:id` | `GET` | Cliente com `id` passado como parâmetro
| `/clients/:id` | `PUT` | Apenas `status code 204`

| `/clients/:id` | `DELETE` | Apenas `status code 204`

#### Cidades

|Caminho       |  Método | Retorno
|-             |-        |-        
| `/cities` | `POST` | Dados cadastrais da cidade
| `/cities` | `GET` | Lista de cidades

#### Endereços

|Caminho         |  Método | Retorno
|-               |-        |-        
| `/addresses` | `POST` | Dados cadastrais do endereço
| `/addresses` | `GET` | Lista de endereços
| `/addresses/:id` | `PUT` | Apenas `status code 204`

| `/addresses/:id` | `DELETE` | Apenas `status code 204`

#### Lojas

|Caminho         |  Método | Retorno
|-               |-        |-        
| `/stores` | `GET` | Lista de lojas
| `/stores/:id` | `GET` | Loja e as cidades as quais ela pertencece

#### Pedidos

|Caminho         |  Método | Retorno
|-               |-        |-        
| `/requests` | `GET` | Lista de pedidos do usuário logado
| `/requests/:id` | `GET` | Pedido com `id` passado como parâmetro
| `/requests` | `POST` | Dados cadastrais do pedido

### Modelos

#### Login

```json
{
	"email": "client@client.com",
	"password": "123123123"
}
```

#### Cidade

```json
{
	"name": "Anápolis",
	"active": true, //opcional
	"state_id": 1
}
```

#### Endereço

```json
{
	"street": "Rua lala",
	"neighborhood": "Tetete",
	"city_id": 1,
	"number": 1, //opcional
	"reference_point": "Perto do colégio", //opcional
	"complement": "qd 23, lt 23" //opcional
}
```

#### Pedido

```json
{
	"store_id": 1,
	"payment_method_id": 2,
	"change_money": 1000, //troco
	"comments": "", //opcional
	"address_id": 1,
	"products": [
		{
			"product_id": 1,
			"qtd": 2,
			"comments": "" //opcional
		},
	]
}
```
