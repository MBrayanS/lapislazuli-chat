const sequelize = require("./sequelize");

const Contato = require('../entities/Contato')
const Grupo = require('../entities/Grupo')
const Membro = require('../entities/Membro')
const Mensagem = require('../entities/Mensagem')
const Usuario = require('../entities/Contato')

module.exports = async () => {
    await sequelize.sync({ force: true })
}
