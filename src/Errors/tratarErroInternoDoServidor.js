const middlewareDeErros = require('./middlewareDeErros')
const ErroCustomizado = require("./ErroCustomizado")

function tratarErroInternoDoServidor( erro, res ) {
    if( process.env.LOG_DE_ERROS === 'true' ) console.error(erro)

    const erroDeResposta = new ErroCustomizado(500, 'Erro interno do servidor')

    middlewareDeErros(erroDeResposta, res)
}

module.exports = tratarErroInternoDoServidor