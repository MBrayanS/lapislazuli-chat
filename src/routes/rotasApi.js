const rotas = require('express').Router()

const AutenticacaoController = require('../controllers/AutenticacaoController')
const ValidacaoController = require('../controllers/ValidacaoController')

const { UsuarioController } = require('../modules/ControllersModule')

rotas.post('/cadastrar', ValidacaoController.cadastrar, UsuarioController.cadastrar)
rotas.post('/logar', ValidacaoController.logar, UsuarioController.logar)
rotas.post('/buscarUsuariosPorNome', ValidacaoController.texto, AutenticacaoController.autenticar , UsuarioController.buscarUsuariosPorNome)

module.exports = rotas