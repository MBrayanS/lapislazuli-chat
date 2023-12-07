const middlewareDeErros = require("../errors/middlewareDeErros")

function UsuarioController( UsuarioService, CookieParser, AutenticacaoJWT ) {
    async function cadastrar( req, res ) {
        try {
            const dadosDeCadastro = req.body
            const { id } = await UsuarioService.criar(dadosDeCadastro)
            const token = AutenticacaoJWT.criarToken(id)

            CookieParser.enviarCookie(token, res)

            res.sendStatus(201)
        }
        
        catch( erro ) { middlewareDeErros(erro, res) }
    }

    return {
        cadastrar
    }
}

module.exports = UsuarioController