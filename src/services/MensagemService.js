const MensagemEntity = require('../models/MensagemEntity')
const tratarErrosDeServices = require('../Errors/tratarErrosDeServices')

function MensagemModel() {
    async function criar( dadosDaMensagem ) {
        try { return await MensagemEntity.create(dadosDaMensagem) }

        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function pegarPorId( id ) {
        try {
            const mensagemSalva = await MensagemEntity.findOne({ where: { id } })

            if( !mensagemSalva ) throw 'Mensagem não encontrada'

            return mensagemSalva
        }

        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function apagar( id ) {
        try { 
            const resposta = await MensagemEntity.destroy({ where: { id } }) 

            if ( !resposta ) throw 'Essa mensagem não existe'
        } 
        
        catch( erro ) { tratarErrosDeServices(erro) }
    }

    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = MensagemModel()