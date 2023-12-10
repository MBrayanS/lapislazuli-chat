function middlewareDeErros( erro, res ) {
    const { statusCode, message } = erro
    
    res.status(statusCode).json({ mensagemDeErro: message })
}

module.exports = middlewareDeErros