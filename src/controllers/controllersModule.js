const UsuarioController = require("./UsuarioController")

const UsuarioService = require('../services/UsuarioService')
const CookieParser = require("../auth/CookieParser")
const AutenticacaoJWT = require('../auth/AutenticacaoJWT')

module.exports = {
    UsuarioController: UsuarioController(UsuarioService, CookieParser, AutenticacaoJWT)
}