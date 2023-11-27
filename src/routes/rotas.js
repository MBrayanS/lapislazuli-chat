const conectarBancoDeDados = require('../database/conectarBancoDeDados')
const rotasApi = require('./rotasApi')
const rotasView = require('./rotasView')

module.exports = async app => {
    await conectarBancoDeDados()

    app.use('/api', rotasApi)
    app.use(rotasView)

    console.log('<-- No ar -->')
}