const GrupoEntity = require('../models/GrupoEntity')
const tratarErrosDeServices = require('../errors/tratarErrosDeServices')

function GrupoService() {
    async function criar( dadosDoGrupo ) {
        try { return await GrupoEntity.create(dadosDoGrupo) } 
        
        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function pegarPorId( id ) {
        try { 
            const grupoSalvo = await GrupoEntity.findOne({ where: { id } })

            if( !grupoSalvo ) throw 'Grupo não encontrado'

            return grupoSalvo
        } 
        
        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function apagar( id ) {
        try { 
            const resposta = await GrupoEntity.destroy({ where: { id } })

            if( !resposta ) throw 'Esse grupo não existe'
        } 
        
        catch( erro ) { tratarErrosDeServices(erro) }
    }
    
    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = GrupoService()