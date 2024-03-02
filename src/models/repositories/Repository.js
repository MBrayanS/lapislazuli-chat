class Repository {
    #Entity

    constructor( Entity ) {
        this.#Entity = Entity
    }
    
    async criar( dados ) {
        try {
            const resultado = await this.#Entity.create(dados)

            return resultado.get({ plain: true })
        }
            
        catch( erro ) {
            if( erro?.errors[0]?.type == 'unique violation' ) throw { tipo: 'Violação única', campo: erro.errors[0].path }

            throw erro
        }
    }

    async pegar( dados ) {
        const resultado = await this.#Entity.findOne({ where: dados })
        
        if( !resultado ) return null
        
        return resultado.get({ plain: true })
    }

    async pegarTodos( dados ) {
        const resultados = await this.#Entity.findAll({ where: dados })
 
        return resultados.map( resultado => resultado.get({ plain: true }) )
    }

    async apagar( dados ) {
        return await this.#Entity.destroy({ where: dados })
    }

    async limparTodosOsRegistros() {
        return await this.#Entity.destroy({ truncate: true })
    }

}

module.exports = Repository