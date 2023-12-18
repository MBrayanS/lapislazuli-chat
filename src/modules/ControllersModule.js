const UsuarioController = require("../controllers/UsuarioController")

const { UsuarioService } = require('./ServicesModule')

const CookieParser = require("../auth/CookieParser")
const AutenticacaoJWT = require('../auth/AutenticacaoJWT')

module.exports = {
    UsuarioController: UsuarioController(UsuarioService, CookieParser, AutenticacaoJWT)
}