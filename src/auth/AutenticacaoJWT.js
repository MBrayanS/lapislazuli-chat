const jwt = require('jsonwebtoken')
const tratarErrosDeAutenticacaoJWT = require('../errors/tratarErrosDeAutenticacaoJWT')

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

function AutenticacaoJWT() {
    
    function criarToken( payload ) {
        try {
            if( !payload ) throw { mensagemDeErro: 'O payload não foi fornecido' }
            if( typeof payload != 'object' ) throw { mensagemDeErro: 'O payload deve ser um objeto' }

            return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
        } 
        
        catch( erro ) { tratarErrosDeAutenticacaoJWT(erro) }
    }

    function validarToken( token ) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET)
        } 
        
        catch( erro ) { tratarErrosDeAutenticacaoJWT(erro) }
    }

    return {
        criarToken,
        validarToken
    }
}

module.exports = AutenticacaoJWT()