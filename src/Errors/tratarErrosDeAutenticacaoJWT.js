function tratarErrosDeAutenticacaoJWT( erro ) {
    const tokenInvalido = ['jwt malformed', 'invalid token'].includes(erro.message)

    if( tokenInvalido ) throw { statusCode: 401, message: 'O token é invalido' }
    if( erro?.mensagemDeErro ) throw { statusCode: 401, message: erro.mensagemDeErro }
    if( erro.name == 'TokenExpiredError' ) throw { statusCode: 401, message: 'O token expirou' }
    if( erro.message == 'jwt must be provided' ) throw { statusCode: 401, message: 'O token não foi fornecido' }

    throw erro
}

module.exports = tratarErrosDeAutenticacaoJWT