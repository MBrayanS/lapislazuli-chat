# Rota para busca de usuários por nome

Utilizada para buscar usuários no banco de dados que tenham o nome igual ao texto passado por parâmetro, ou parte dele. 

O `texto` de busca não releva letras maiúsculas ou minúsculas.

<br>

## Corpo da Solicitação

``` js
POST /api/buscarUsuariosPorNome

body: {
    "texto": "j"
}
```

<br>

Deve conter os seguintes campos:

- **texto :** <**string**> `* Obrigatório`
    > Não pode ser vazio

<br>

# Respostas

Possiveis respostas da requisição. 

## Sucesso

### 200 OK

``` js
[
    { nome: "John Doe", email: "john@example.com", cor: "#ff4645" },
    { nome: "Jane Doe", email: "jane@example.com", cor: "#ffffdd" },
    { nome: "Jonathan", email: "jonathan@example.com", cor: "#faadda" }
]
```

> Em caso de não ter encontrado nenhum usuário irá retornar um `ARRAY` vazio

## Erro

### 400 Bad Request

``` js
{ mensagemDeErro: 'O campo /texto/ é obrigatório' }
```

``` js
{ mensagemDeErro: 'O campo /texto/ não pode estar vazio' }
```

``` js
{ mensagemDeErro: 'O campo /texto/ deve ser uma string' }
```

### 401 Unauthorized

``` js
{ mensagemDeErro: 'O token expirou' }
```

``` js
{ mensagemDeErro: 'O token é invalido ' }
```

``` js
{ mensagemDeErro: 'O token não foi fornecido ' }
```

### 500 Internal Server Error

``` js
{ mensagemDeErro: 'Erro interno do servidor' }
```

---

<br>

[Voltar ao arquivo principal](/docs/documentacao.md)