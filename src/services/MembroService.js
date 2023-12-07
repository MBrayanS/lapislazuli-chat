const MembroEntity = require('../models/MembroEntity')
const tratarErrosDeServices = require('../errors/tratarErrosDeServices')

function MembroService () {
    async function criar( dadosDoMembro ) {
        try { return await MembroEntity.create(dadosDoMembro) }

        catch ( erro ) { tratarErrosDeServices(erro) }
    }

    async function pegarPorId( id ) {
        try {
            const membroSalvo = await MembroEntity.findOne({ where: { id } })

            if( !membroSalvo ) throw 'Membro não encontrado'

            return membroSalvo
        }

        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function apagar( id ) {
        try {
            const resposta = await MembroEntity.destroy({ where: { id } })

            if( !resposta ) throw 'Esse membro não existe'
        }

        catch( erro ) { tratarErrosDeServices(erro) }
    }

    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = MembroService()