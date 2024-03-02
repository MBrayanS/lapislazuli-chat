const rotas = require('express').Router()
const PaginasMiddlewares = require('../app/middlewares/PaginasMiddlewares')

rotas.get('/', PaginasMiddlewares.principal)
rotas.get('/login', PaginasMiddlewares.login)
rotas.get('/cadastrar', PaginasMiddlewares.cadastrar)
rotas.get('/confirmarEmail', PaginasMiddlewares.confirmarEmail)
rotas.get('/redefinirSenha', PaginasMiddlewares.redefinirSenha)

module.exports = rotas