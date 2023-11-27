const sequelize = require("./sequelize");

const ContatoEntity = require('../models/ContatoEntity')
const GrupoEntity = require('../models/GrupoEntity')
const MembroEntity = require('../models/MembroEntity')
const MensagemEntity = require('../models/MensagemEntity')
const UsuarioEntity = require('../models/ContatoEntity')

module.exports = async () => {
    await sequelize.sync({ force: true })
}
