const { Op } = require("sequelize")
const Repository = require("./Repository")

class UsuarioRepository extends Repository {
    #Entity

    constructor( Entity ) {
        super(Entity)

        this.#Entity = Entity
    }

    async buscarPorNome( nome ) {
        return await this.#Entity.findAll({ where: { nome: { [Op.iLike]: `%${nome}%`} } })
    }

}

module.exports = UsuarioRepository