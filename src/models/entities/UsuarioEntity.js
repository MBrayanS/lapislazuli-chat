const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const UsuarioEntity = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        defaultValue: '#050259'
    }
})

module.exports = UsuarioEntity