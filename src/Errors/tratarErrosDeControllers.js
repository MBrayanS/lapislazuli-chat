const tratarErroInternoDoServidor = require("./tratarErroInternoDoServidor")
const middlewareDeErros = require("./middlewareDeErros")
const ErroCustomizado = require("./ErroCustomizado")

function tratarErrosDeControllers( erro, res ) {
    const erroInesperado = !erro.statusCode

    if( erroInesperado ) return tratarErroInternoDoServidor(erro, res)

    const erroCustomizado = new ErroCustomizado(erro.statusCode, erro.message)

    middlewareDeErros(erroCustomizado, res)
}

module.exports = tratarErrosDeControllers