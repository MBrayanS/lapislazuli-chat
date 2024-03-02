const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const GrupoEntity = sequelize.define('Grupo', {
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
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = GrupoEntity