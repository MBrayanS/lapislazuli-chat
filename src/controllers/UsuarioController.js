const middlewareDeErros = require("../errors/middlewareDeErros")

function UsuarioController( UsuarioService ) {
    async function cadastrar( req, res ) {
        try {
            const dadosDeCadastro = req.body
            
            await UsuarioService.criar(dadosDeCadastro)

            res.sendStatus(201)
        }
        
        catch( erro ) { middlewareDeErros(erro, res) }
    }

    return {
        cadastrar
    }
}

module.exports = UsuarioController