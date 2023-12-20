const tratarErrosDeControllers = require("../errors/tratarErrosDeControllers")

function UsuarioController( UsuarioService, CookieParser, AutenticacaoJWT ) {
    async function cadastrar( req, res ) {
        try {
            const { nome, email, senha } = req.body
            const { id } = await UsuarioService.criar({ nome, email, senha })
            const token = AutenticacaoJWT.criarToken({ id })

            CookieParser.enviarCookieComToken(token, res)

            res.sendStatus(201)
        }
        
        catch( erro ) { tratarErrosDeControllers(erro, res) }
    }

    async function logar( req, res ) {
        try {
            const { email, senha } = req.body
            const { id } = await UsuarioService.encontrar({ email, senha })
            const token = AutenticacaoJWT.criarToken({ id })
            
            CookieParser.enviarCookieComToken(token, res)

            res.sendStatus(200)
        }
        
        catch( erro ) { tratarErrosDeControllers(erro, res) }
    }

    return {
        cadastrar,
        logar
    }
}

module.exports = UsuarioController