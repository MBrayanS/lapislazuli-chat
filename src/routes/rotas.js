const rotas = require('express').Router()

const rotasApi = require('./rotasApi')
const rotasView = require('./rotasView')

rotas.use('/api', rotasApi)
rotas.use(rotasView)

module.exports = rotas