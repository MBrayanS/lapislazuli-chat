const conectarBancoDeDados = require('./database/conectarBancoDeDados')
const rotasApi = require('./rotas/rotasApi')
const rotasView = require('./rotas/rotasView')

module.exports = async app => {
    await conectarBancoDeDados()

    app.use('/api', rotasApi)
    app.use(rotasView)

    console.log('<-- No ar -->')
}