# Rota de login

Utilizada para efetuar o login de usuários já cadastrados.

<br>

## Corpo da Solicitação

``` js
POST /api/logar

body: {
    "email": "john@example.com",
    "senha": "senha12!"
}
```

<br>

Deve conter os seguintes campos:

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

### 200 OK

> Sem resposta

## Erro

### 400 Bad Request

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
{ mensagemDeErro: 'O campo {campoReferente} não pode estar vazio' }
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

### 404 Not Found

``` js
{ mensagemDeErro: 'Usuário não encontrado' }
```

### 500 Internal Server Error

``` js
{ mensagemDeErro: 'Erro interno do servidor' }
```

---

<br>

<h4 align="right"> <a href="#rota-de-login">⬆️ Voltar ao topo ⬆️</a> </h4>
<h4 align="left"> <a href="../documentacao.md">Voltar ao arquivo principal</a> </h4>