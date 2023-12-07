const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

function AutenticacaoJWT() {
    function criarToken( id ) {
        return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
    }

    function validarToken( token ) {
        return jwt.verify(token, process.env.JWT_SECRET)
    }

    return {
        criarToken,
        validarToken
    }
}

module.exports = AutenticacaoJWT()