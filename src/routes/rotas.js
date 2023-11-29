const rotasApi = require('./rotasApi')
const rotasView = require('./rotasView')

module.exports = async app => {
    app.use('/api', rotasApi)
    app.use(rotasView)
}