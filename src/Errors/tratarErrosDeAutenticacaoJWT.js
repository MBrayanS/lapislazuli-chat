const ErroCustomizado = require("./ErroCustomizado")

function tratarErrosDeAutenticacaoJWT( erro ) {
    const tokenInvalido = ['jwt malformed', 'invalid token'].includes(erro.message)

    if( tokenInvalido ) throw new ErroCustomizado(401, 'O token é invalido')
    if( erro?.mensagemDeErro ) throw new ErroCustomizado(401, erro.mensagemDeErro)
    if( erro.name == 'TokenExpiredError' ) throw new ErroCustomizado(401, 'O token expirou')
    if( erro.message == 'jwt must be provided' ) throw new ErroCustomizado(401, 'O token não foi fornecido')

    throw erro
}

module.exports = tratarErrosDeAutenticacaoJWT