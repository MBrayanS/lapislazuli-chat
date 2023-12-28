const sequelize = require("./sequelize");

require('../models/ContatoEntity')
require('../models/GrupoEntity')
require('../models/MembroEntity')
require('../models/MensagemEntity')
require('../models/UsuarioEntity')

module.exports = () => sequelize.sync({ alter: true })