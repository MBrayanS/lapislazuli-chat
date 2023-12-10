const middlewareDeErros = require("../errors/middlewareDeErros")

function UsuarioController( UsuarioService, CookieParser, AutenticacaoJWT ) {
    async function cadastrar( req, res ) {
        try {
            const dadosDeCadastro = req.body
            const { id } = await UsuarioService.criar(dadosDeCadastro)
            const token = AutenticacaoJWT.criarToken({ id })

            CookieParser.enviarCookie(token, res)

            res.sendStatus(201)
        }
        
        catch( erro ) { middlewareDeErros(erro, res) }
    }

    async function logar( req, res ) {
        try {
            const { email, senha } = req.body
            const { id } = await UsuarioService.pegarPorEmailESenha(email, senha)
            const token = AutenticacaoJWT.criarToken({ id })
            
            CookieParser.enviarCookie(token, res)

            res.sendStatus(200)
        }
        
        catch( erro ) { middlewareDeErros(erro, res) }
    }

    return {
        cadastrar,
        logar
    }
}

module.exports = UsuarioController