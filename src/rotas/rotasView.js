const rotas = require('express').Router()
const ViewController = require('../controllers/ViewController.js')

rotas.get('/', ViewController.home)

module.exports = rotas