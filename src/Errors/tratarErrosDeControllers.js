const tratarErroInternoDoServidor = require("./tratarErroInternoDoServidor")
const middlewareDeErros = require("./middlewareDeErros")
const ErroCustomizado = require("./ErroCustomizado")

function tratarErrosDeControllers( erro, res ) {
    const erroInesperado = !(erro instanceof ErroCustomizado)

    if( erroInesperado ) tratarErroInternoDoServidor(erro, res)
    
    middlewareDeErros(erro, res)
}

module.exports = tratarErrosDeControllers