const CookieParser = require("../auth/CookieParser")
const AutenticacaoJWT = require("../auth/AutenticacaoJWT")
const tratarErrosDeControllers = require("../errors/tratarErrosDeControllers")

function AutenticacaoController() {
    function autenticar( req, res, next ) {
        try {
            const token = CookieParser.pegarCookieComToken( req )
            
            AutenticacaoJWT.validarToken(token)
    
            next()
        }
        
        catch( erro ) { tratarErrosDeControllers(erro, res) }
    }

    return {
        autenticar
    }
}

module.exports = AutenticacaoController()