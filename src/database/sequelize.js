const { Sequelize } = require('sequelize')
require('dotenv').config()

const sistemaEmTeste = process.env.NODE_ENV === 'test'
const url = sistemaEmTeste ? process.env.DATABASE_URL_TESTE : process.env.DATABASE_URL_PRODUCAO

const opcoes = {
    define: { freezeTableName: true },
    logging: false
}

const sequelize = new Sequelize(url, opcoes)

module.exports = sequelize