const sequelize = require('../../database/sequelize.js')
const Repository = require('./Repository.js')

class UsuarioRepository extends Repository {
    #Entity

    constructor( Entity ) {
        super(Entity)

        this.#Entity = Entity
    }

    async buscarPorNome( nome ) {
        const where = sequelize.where( sequelize.fn('LOWER', sequelize.col('nome')), 'LIKE', `%${nome.toLowerCase()}%` )
        const resultados = await this.#Entity.findAll({ where }) 

        return resultados.map( resultado => resultado.get({ plain: true }) )
    }

}

module.exports = UsuarioRepository