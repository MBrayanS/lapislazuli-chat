const rotas = require('express').Router()

const ValidacaoController = require('../controllers/ValidacaoController')
const { UsuarioController } = require('../controllers/controllersModule')

rotas.post('/cadastrar', ValidacaoController.cadastrar, UsuarioController.cadastrar)

module.exports = rotas