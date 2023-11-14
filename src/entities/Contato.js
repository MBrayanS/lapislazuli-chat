const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Contato = sequelize.define('Contato', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destinatario_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    ultima_interacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    ultima_mensagem: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    usuario_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
})

module.exports = Contato