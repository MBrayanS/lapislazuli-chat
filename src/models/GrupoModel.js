const Grupo = require('../entities/Grupo')
const tratarErroDeModel = require('../tratarErroDeModel')

function GrupoModel() {
    async function criar( dadosDoGrupo ) {
        try { return await Grupo.create(dadosDoGrupo) } 
        
        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function pegarPorId( id ) {
        try { 
            const grupoSalvo = await Grupo.findOne({ where: { id } })

            if( !grupoSalvo ) throw 'Grupo não encontrado'

            return grupoSalvo
        } 
        
        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function apagar( id ) {
        try { 
            const resposta = await Grupo.destroy({ where: { id } })

            if( !resposta ) throw 'Esse grupo não existe'
        } 
        
        catch( erro ) { tratarErroDeModel(erro) }
    }
    
    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = GrupoModel()