const rotasApi = require('./rotas/rotasApi')
const rotasView = require('./rotas/rotasView')

module.exports = async app => {
    app.use('/api', rotasApi)
    app.use('/api', rotasView)

    console.log('<-- No ar -->')
}