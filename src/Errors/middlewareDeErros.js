const ErroCustomizado = require("./ErroCustomizado")
require("dotenv").config()

function middlewareDeErros( erro, res ) {
    const erroInesperado = !(erro instanceof ErroCustomizado)
    
    if( erroInesperado ) {
        if( process.env.LOG_DE_ERROS === 'true' ) console.error(erro)
        
        return res.status(500).json({ mensagemDeErro: 'Erro interno do servidor' })
    }

    const { statusCode, message } = erro
    res.status(statusCode).json({ mensagemDeErro: message })
}

module.exports = middlewareDeErros