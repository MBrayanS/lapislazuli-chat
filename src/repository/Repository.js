class Repository {
    #Entity

    constructor( Entity ) {
        this.#Entity = Entity
    }
    
    async criar( dados ) {
        try { return await this.#Entity.create(dados) }
            
        catch( erro ) {
            if( erro?.errors[0]?.type == 'unique violation' ) throw { tipo: 'Violação única', campo: erro.errors[0].path }

            throw erro
        }
    }

    async pegar( dados ) {
        return await this.#Entity.findOne({ where: dados })
    }

    async pegarTodos( dados ) {
        return await this.#Entity.findAll({ where: dados })
    }

    async apagar( dados ) {
        return await this.#Entity.destroy({ where: dados })
    }

}

module.exports = Repository