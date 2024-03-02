const sequelize = require("./sequelize");

require('../modules/RepositoriesModule')

module.exports = () => sequelize.sync({ force: true })