const Mensagem = require('../entities/Mensagem')
const tratarErroDeModel = require('../tratarErroDeModel')

function MensagemModel() {
    async function criar( dadosDaMensagem ) {
        try { return await Mensagem.create(dadosDaMensagem) }

        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function pegarPorId( id ) {
        try {
            const mensagemSalva = await Mensagem.findOne({ where: { id } })

            if( !mensagemSalva ) throw 'Mensagem não encontrada'

            return mensagemSalva
        }

        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function apagar( id ) {
        try { 
            const resposta = await Mensagem.destroy({ where: { id } }) 

            if ( !resposta ) throw 'Essa mensagem não existe'
        } 
        
        catch( erro ) { tratarErroDeModel(erro) }
    }

    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = MensagemModel()