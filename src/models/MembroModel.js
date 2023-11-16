const Membro = require('../entities/Membro')
const tratarErroDeModel = require('../tratarErroDeModel')

function MembroModel () {
    async function criar( dadosDoMembro ) {
        try { return await Membro.create(dadosDoMembro) }

        catch ( erro ) { tratarErroDeModel(erro) }
    }

    async function pegarPorId( id ) {
        try {
            const membroSalvo = await Membro.findOne({ where: { id } })

            if( !membroSalvo ) throw 'Membro não encontrado'

            return membroSalvo
        }

        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function apagar( id ) {
        try {
            const resposta = await Membro.destroy({ where: { id } })

            if( !resposta ) throw 'Esse membro não existe'
        }

        catch( erro ) { tratarErroDeModel(erro) }
    }

    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = MembroModel()