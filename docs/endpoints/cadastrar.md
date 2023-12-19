# Rota de cadastro

Utilizada para cadastrar novos usuários.

<br>

## Corpo da Solicitação

``` js
POST /api/cadastrar

body: {
    "nome": "John Doe",
    "email": "john@example.com",
    "senha": "senha12!"
}
```

<br>

Deve conter os seguintes campos:

- **nome :** <**string**>
    > Min de 3 e max de 20 caracteres

- **email :** <**string**>
    > Email válido

- **senha :** <**string**>
    > Min de 8 caracteres.
    >
    > Deve conter ao menos um número e um caracterer especial

<br>

`* Todos obrigatórios`

<br>

# Respostas

Possiveis respostas da requisição. 

## Sucesso

### 201 CREATE

> Sem resposta

## Erro

### 400 Bad Request

``` js
{ mensagemDeErro: 'Este email já esta em uso' }
```

``` js
{ mensagemDeErro: 'O campo email não está válido' }
```

``` js
{ mensagemDeErro: 'A senha deve conter pelo menos um número e um caractere especial' }
```

``` js
{ mensagemDeErro: 'O campo {campoReferente} é obrigatório' }
```

``` js
{ mensagemDeErro: 'O campo {campoReferente} deve ser uma string' }
```

``` js
{ mensagemDeErro: 'O campo {campoReferente} deve ter pelo menos {quantidadeReferente} caracteres' }
```

``` js
{ mensagemDeErro: 'O campo {campoReferente} não pode ter mais de {quantidadeReferente} caracteres' }
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

---

<br>

[Voltar ao arquivo principal](/docs/documentacao.md)