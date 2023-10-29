const rotas = require('express').Router()
const ViewController = require('../controllers/ViewController.js')

rotas.get('/', ViewController.home)
rotas.get('/login', ViewController.login)
rotas.get('/cadastrar', ViewController.cadastrar)
rotas.get('/confirmarEmail', ViewController.confirmarEmail)
rotas.get('/redefinirSenha', ViewController.redefinirSenha)

module.exports = rotas