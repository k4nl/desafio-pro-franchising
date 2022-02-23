

# Boas vindas ao projeto!

Antes de iniciar o projeto, você deverá seguir as instruções a seguir. Fique atento a cada passo e, se tiver qualquer dúvida, nos envie via whatsapp (31) 97535-7523 ou via email: gustavoh.bh@gmail.com🚀


# Tecnologias utilizadas no projeto!

- Node.js
- MongoDB
- Express
- Multer
- Jsonwebtoken
- Jest
- Chai
- Mocha
- Multer
- Cors


# Entregáveis

## O que deverá ser desenvolvido?

Um cliente chegou na loja e comprou 5 cookies. O barista olhou o pedido e ficou desesperado, havia somente 2 cookies na loja.
Ele teve que explicar ao cliente o ocorrido e o cliente foi embora, essa situação não aconteceria se o pessoal do TI estivesse controlado o estoque.

Sobre:

Você foi designado a resolver esse problema e precisa estruturar todo sistema de estoque e produtos para evitar acontecer novamente.

Requisitos:

O estoque nada mais é que controlar quantos ingredientes tem na loja, além de cookie em uma cafeteria tem outros ingredientes como café em pó, leite, entre outros.
Para organizar melhor crie uma estrutura de ingrediente com nome, unidade de medida e preço unitario.

Antes de ter um estoque você precisa ter um produto com algumas coisas basicas que o cliente precisa saber como: nome, imagem, preço e os ingredientes que esse produto tem. 
Porém temos um problema aqui, o ingrediente é só uma referencia a o que foi usado ele não tem quantidade, então você precisa fazer um novo objeto que faça referência a esse ingrediente com a quantidade que é usado, nós chamamos de componente.

Agora você já tem as informações basicas para controlar o estoque, organize em um objeto para que o cliente consiga visualizar os ingredientes da loja e quanto tem de estoque atualmente.

Ufa, tudo pronto, mas ainda o problema não foi resolvido, você só esta controlando quanto tem, faça uma rota de verificação para saber se o produto X pode ser vendido. 

Como você não tem acesso ao PDV faça uma rota de controle manual para o dono da loja imputar os valores do estoque.

O dono é quem cadastra todas as informações da loja, inclusive o upload da imagem, então será necessario uma rota para CRUD dessas informações.
Além disso alterar as informações é restrito então essas rotas especificas precisa de um login para controlar.

Situação resolvida, agora o cliente pediu novas alterações, como sempre. Ele precisa de um relatório para saber o custo dos produtos, você tem essas informações de quanto custa o ingrediente e de quanto vai no produto.
Precisamos de uma rota que retorne todos os produtos e o custo de cada um.

---

## Data de Entrega

    - 7 dias corridos.
    - Data de entrega para avaliação final do projeto: `23/02/2022`.

---

# Instruções para utilizar:

## ANTES DE COMEÇAR A UTILIZAR:

1. Clone o repositório
  * `git clone git@github.com:k4nl/desafio-pro-franchising.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd desafio-pro-franchising`

2. Instale as dependencias com o comando `npm install` a partir da branch `master`;

3. Crie um arquivo chamado .env na raiz do projeto e sete as variveis HOST, PORT e SECRET de acordo com suas preferencias;
  * O utilizado no projeto foi HOST=localhost, PORT=3002, SECRET=mecontrata.

4. Conecte-se ao mongoDB e utilize o comando na pasta raiz do projeto `npm start`.

  
## REGRAS DE NEGOCIO DA APLICACAO


# Criacao de usuario e login.

Se atente a estrutura de dados que devem ser enviados para o login e para a criacao de novos usuarios.

1. Para criar um usuario voce deve estar na rota: 
`http://localhost:3002/` ou no endereco que voce colocar, mas sempre na rota `/`, ambos metodos `POST`.

Devera ser enviado no body os seguintes dados: 

```
{ 
	"name": "meu nome",
	"email": "email@email.com",
	"password": "senhasupersegura",
  "role": "user"
}
```
O retorno da criacao do usuario:

status: 201

```
{
	"_id": "621500201d9def2f8521f38d",
	"user": {
		"name": "meu nome",
		"email": "email@email.com",
		"role": "user"
	}
}
```


2. Para fazer login na aplicacao é necessario enviar no body os seguintes dados:

- Metodo `POST` na rota `/sign`

```
{ 
	"email": "email@email.com",
	"password": "senhasupersegura"
}
```

O retorno do login:

status: 200, 

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjIxNTdkNDlhZjYzZGE5Mjg2NDg4NWVjIiwiZW1haWwiOiJzZXV6ZUBsb2ppbmhhZG9zZXV6ZS5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjQ1NTc2MjcxLCJleHAiOjE2NDU1Nzk4NzF9._3gckdwU6yKgQP_J4_1BApnSVM9DQra7JaB0iAjh5wI",
	"user": {
		"name": "Seu ze",
		"email": "seuze@lojinhadoseuze.com"
	}
}
```

# Cadastro e manutencao de ingredientes.

## Para todas as atividades de ingredientes (criar, editar, visualizar, deletar) é necessario estar logado com uma conta de role: admin, o token devera ser informado no headers na chave authorization.

### ATENCAO: todas as vezes que atualizamos o custo de um ingrediente, atualizamos tambem o custo de todos os produtos que contem aquele ingrediente!


Se atente a estrutura de dados que devem ser enviados para o cadastro e manutencao de ingredientes.
As unidades de medida dos ingredientes devem ser obrigatoriamente:

```
"kg", - Kilograma
"g", - grama
"l", - litro
"ml", - mililitro
"u", - unidade
```


1. Para criar um ingrediente - Metodo `POST` na rota `/ingredient`.

Devera ser feito um 

O nome do ingrediente deve ser unico, caso ja exista um nome identico no banco de dados retornara um erro.

```
{ 
	"name": "cafe",
	"unitOfMeasurement": "kg",
  "quantity": 10
  "unitPrice": 20,
}
```

O retorno devera ser:

```
{
  _id: '621024f346b909f4afca5b28',
  ingredient: {
    name: 'cafe',
    unitOfMeasurement: 'kg',
    unitPrice: 20,
    quantity: 10,
    stockPrice: 200,
  }
}
```

2. Para visualizar um ingrediente Metodo `GET` na rota `/ingredient/:id`, onde em :id = id do ingrediente.

Devera ser enviado no params o id do ingrediente.

O retorno devera ser: 

```
{
  _id: '621024f346b909f4afca5b28',
  ingredient: {
    name: 'cafe',
    unitOfMeasurement: 'kg',
    unitPrice: 25,
    quantity: 10,
    stockPrice: 250,
  }
}
```

3. Para visualizar todos os ingredientes Metodo `GET` na rota `/ingredient`.

O retorno devera ser: 

```
[
	{
		"_id": "62157d4aaf63da92864885ed",
		"ingredient": {
			"name": "cafe",
			"unitOfMeasurement": "kg",
			"unitPrice": 25,
			"quantity": 9.940000000000001,
			"stockPrice": 248
		}
	},
	{
		"_id": "62157d4aaf63da92864885ee",
		"ingredient": {
			"name": "leite",
			"unitOfMeasurement": "l",
			"unitPrice": 10,
			"quantity": 9.220000000000004,
			"stockPrice": 94
		}
	},
]
```


4. Para editar determinado ingrediente Metodo `PUT` na rota `/ingredient/:id` onde :id = id do ingrediente.

Devera ser enviado no params o id do ingrediente;

O body deve conter a seguinte estrutura:

```
{
	"quantity": 1000,
	"unitPrice": 10
}
```

As regras de negocio sao: 

- O produto devera existir no banco de dados.

-  A quantidade eh livre, caso o cliente tenha comprado mais estoque, ele devera enviar a quantidade que estava no estoque mais a nova quantidade que ele comprou. Por exemplo ele tinha 10kg de cafe no estoque e comprou mais 10kg, ele devera enviar 20kg na quantidade. Foi pensado assim pois caso o cliente tenha errado no primeiro envio da quantidade de produto ou tenha perdido o produto (validade, roubo etc...), ele pode altera-lo sem ter que deletar o produto.

- O preco da quantidade tambem eh livre, caso o cliente tenha errado no envio da quantidade ele tambem pode mudar.

O retorno devera ser:

status: 200, 

```
{
	"_id": "62157d4aaf63da92864885f1",
	"ingredient": {
		"name": "ovo",
		"unitOfMeasurement": "u",
		"unitPrice": 10,
		"quantity": 1000,
		"stockPrice": 10000
	}
}
```

5. Para deletar determinado ingrediente Metodo `DELETE` na rota `/ingredient/:id` onde :id = id do ingrediente.

Devera ser enviado no params o id do ingrediente;

Regras de negocio:

- O produto devera existir no banco de dados.

O retorno devera ser:

Status: 200,

```
{
	"_id": "62157d4aaf63da92864885f1",
	"ingredient": {
		"name": "ovo",
		"unitOfMeasurement": "u",
		"unitPrice": 10,
		"quantity": 1000,
		"stockPrice": 10000
	}
}
```

# Cadastro e manutencao de produtos.

## Para todas as atividades de produtos (criar, editar, visualizar, deletar) é necessario estar logado com uma conta de role: admin, o token devera ser informado no headers na chave authorization.



Se atente a estrutura de dados que devem ser enviados para o cadastro e manutencao de produtos.



1. Para criar um produto - Metodo `POST` na rota `/product`.

O body devera conter a seguinte estrutura de dados:

```
{
  "name": "banana com maca",
  "price": 10,
  "productIngredients": [
		{ "ingredientId": "621024f346b909f4afca5b28", "quantity": 10, "unitOfMeasurement": "g" }
	]
}
```

- Onde name eh o nome do produto,
- Price eh o preco do produto,
- ProductIngredients eh um array contendo todos os ingredientes e quantidades utilizadas no produto.
- IngredientId faz referencia a um ingrediente cadastrado no banco de dados.

Regras de negocio:

- O preco devera ser maior que 0,
- Todos os ingredientes deverao estar cadastrados no banco de dados, caso algum ingrediente nao esteja cadastrado retornara um erro.


2. Para visualizar um produto Metodo `GET` na rota `/product/:id`, onde em :id = id do produto.

Devera ser enviado no params o id do produto.

O retorno devera ser: 

```
{
	"_id": "62157f727ee18843c3e2850c",
	"product": {
		"name": "cafe com ovo com biscoito",
		"price": 5,
		"productIngredients": [
			{
				"ingredientId": "62157d4aaf63da92864885ed",
				"quantity": 20,
				"unitOfMeasurement": "g"
			},
			{
				"ingredientId": "62157d4aaf63da92864885f1",
				"quantity": 20,
				"unitOfMeasurement": "u"
			},
			{
				"ingredientId": "62157d4aaf63da92864885f0",
				"quantity": 3,
				"unitOfMeasurement": "u"
			}
		]
	}
}
```


3. Para visualizar todos os produtos -  Metodo `GET` na rota `/product`.

O retorno devera ser: 

```
[
	{
		"_id": "62157f727ee18843c3e2850b",
		"product": {
			"name": "Cafe com leite",
			"price": 5,
			"productIngredients": [
				{
					"ingredientId": "62157d4aaf63da92864885ed",
					"quantity": 20,
					"unitOfMeasurement": "g"
				},
				{
					"ingredientId": "62157d4aaf63da92864885ee",
					"quantity": 200,
					"unitOfMeasurement": "ml"
				}
			]
		}
	},
	{
		"_id": "62157f727ee18843c3e2850c",
		"product": {
			"name": "cafe com ovo com biscoito",
			"price": 5,
			"productIngredients": [
				{
					"ingredientId": "62157d4aaf63da92864885ed",
					"quantity": 20,
					"unitOfMeasurement": "g"
				},
				{
					"ingredientId": "62157d4aaf63da92864885f1",
					"quantity": 20,
					"unitOfMeasurement": "u"
				},
				{
					"ingredientId": "62157d4aaf63da92864885f0",
					"quantity": 3,
					"unitOfMeasurement": "u"
				}
			]
		}
	},
]
```

- Caso nao exista produtos cadastrados o retorno sera um array vazio - []


4. Para fazer upload de imagem de determinado produto Metodo `PUT` na rota `/product/:id/image` onde :id = id do produto.

Devera ser enviado no params o id do produto;
A requisicao devera ser feita com multipart form, a chave devera ser image e deve conter um arquivo.

O retorno devera ser:

```
{
	"_id": "621537b01133145d1d7e15c0",
	"product": {
		"name": "cafe com leite",
		"price": 1,
		"productIngredients": [
			{
				"ingredientId": "id do cafe",
				"quantity": 10,
				"unitOfMeasurement": "g"
			},
      {
				"ingredientId": "id do leite",
				"quantity": 100,
				"unitOfMeasurement": "ml"
			}
		]
	},
	"image": "localhost:3002/src/uploads/621537b01133145d1d7e15c0.png"
}
```

- A imagem ficara salva na pasta uploads, o nome sera exatamente o mesmo id do produto + '.png'.
- Para visualizar a foto devera entrar na rota:

http://localhost:3002/images/:id.png

exemplo:  http://localhost:3002/images/621537b01133145d1d7e15c0.png

As regras de negocio sao: 

- O produto devera existir no banco de dados.



5. Para deletar determinado produto Metodo `DELETE` na rota `/product/:id` onde :id = id do produto.

Devera ser enviado no params o id do produto;

Regras de negocio:

- O produto devera existir no banco de dados.

O retorno devera ser:

Status: 200,

```
const productExample = {
  name: 'cafe com leite',
  price: 3,
  productIngredients: [
    {
      ingredientId: '621024f346b909f4afca5b28',
      quantity: 10,
      unitOfMeasurement: 'g'
    },
    {
      ingredientId: '621024f346b909f4afca5r28',
      quantity: 10,
      unitOfMeasurement: 'ml'
    },
  ],
};
```

# Vendas de produtos.

## Para todas as atividades de vendas (criar) nao é necessario estar logado com uma conta de role: admin.


1. Para criar um venda - Metodo `POST` na rota `/sale`.

O body devera conter a seguinte estrutura de dados:

```
[
	{
		"productId": "62157f727ee18843c3e2850e",
		"quantity": 1
	},
	{
		"productId": "62157f727ee18843c3e2850b",
		"quantity": 2
	}	
]
```

- Cada objeto eh uma produto,
- Cada venda possui a quantidade do produto vendido,

Regras de negocio:

- Os produtos precisam estar cadastrados no banco de dados.
- Todos os ingredientes deverao estar cadastrados no banco de dados, caso algum ingrediente nao esteja cadastrado retornara um erro.

- A venda so acontecera caso exista ingredientes suficientes para atender todas os produtos,

Exemplo: Caso produto "62157f727ee18843c3e2850e" utilize os mesmos ingredientes que o produto "62157f727ee18843c3e2850b" utiliza,
e caso so tenha quantidade de ingrediente no estoque suficiente para 1 desses produtos, a venda nao sera concretizada. Somente se 
houver quantidade suficiente para atender todos os produtos incluidos na venda.


O retorno da venda devera ser:

```
{
	"sale": {
		"productsSold": [
			{
				"productId": "62157f727ee18843c3e2850b",
				"quantity": 1
			}
		],
		"ingredients": [
			{
				"_id": "62157d4aaf63da92864885ed",
				"name": "cafe",
				"stockPrice": 1,
				"quantity": 0.02
			},
			{
				"_id": "62157d4aaf63da92864885ee",
				"name": "leite",
				"stockPrice": 2,
				"quantity": 0.2
			}
		],
		"cost": 3
	}
}
```

- A chave cost indica o custo do produto.


# Agradecimentos

Gostaria de agradecer pela leitura do projeto, pelo tempo gasto avaliando, pela oportunidade de participar do desafio e principalmente ao Alexandre, onde tirou todas as minhas duvidas de forma eficiente.

Espero que gostem.

Abracos, Gustavo Braga.