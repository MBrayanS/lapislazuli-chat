function Repository( Entity ) {
    
    async function criar( dados ) {
        try { return await Entity.create(dados) }
            
        catch( erro ) {
            if( erro?.errors[0]?.type == 'unique violation' ) throw { tipo: 'Violação única', campo: erro.errors[0].path }

            throw erro
        }
    }

    async function pegar( dados ) {
        return await Entity.findOne({ where: dados })
    }

    async function pegarTodos( dados ) {
        return await Entity.findAll({ where: dados })
    }

    async function apagar( dados ) {
        return await Entity.destroy({ where: dados })
    }

    return {
        criar,
        pegar,
        pegarTodos,
        apagar
    }
}

module.exports = Repository