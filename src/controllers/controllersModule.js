const UsuarioController = require("./UsuarioController")

const UsuarioService = require('../services/UsuarioService')

module.exports = {
    UsuarioController: UsuarioController(UsuarioService)
}