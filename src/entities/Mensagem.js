const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Mensagem = sequelize.define('Mensagem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
        primaryKey: true,
        allowNull: false
    },
    texto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    canal_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
})

module.exports = Mensagem