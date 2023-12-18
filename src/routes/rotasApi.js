const rotas = require('express').Router()

const ValidacaoController = require('../controllers/ValidacaoController')
const { UsuarioController } = require('../modules/ControllersModule')

rotas.post('/cadastrar', ValidacaoController.cadastrar, UsuarioController.cadastrar)

module.exports = rotas