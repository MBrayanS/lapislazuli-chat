const { Sequelize } = require('sequelize')
require('dotenv').config()

const sistemaEmTeste = process.env.NODE_ENV === 'test'

const configuracaoSequelize = {
    define: { freezeTableName: true },
    logging: false
}

const configuracaoDoSistemaDeTeste = {
    dialect: 'sqlite',
    storage: './src/database/sqlite/database.sqlite',

    ...configuracaoSequelize
}

const configuracaoDoSistemaEmProdução = {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

    ...configuracaoSequelize
}

const opcoes = sistemaEmTeste ? configuracaoDoSistemaDeTeste: configuracaoDoSistemaEmProdução
const sequelize = new Sequelize(opcoes)

module.exports = sequelize