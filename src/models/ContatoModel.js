const Contato = require('../entities/Contato')
const tratarErroDeModel = require('../tratarErroDeModel')

function ContatoModel () {
    async function criar({ nome, usuario_id, destinatario_id, ultima_interacao, ultima_mensagem }) {
        try {
            return await Contato.create({
                nome,
                usuario_id,
                destinatario_id,
                ultima_interacao,
                ultima_mensagem
            })
        }

        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function pegarPorId( id ) {
        try {
            const contatoSalvo = await Contato.findOne({ where: { id } })

            if( !contatoSalvo ) throw 'Contato não encontrado'

            return contatoSalvo
        }

        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function apagar( id ) {
        try {
            const resposta = await Contato.destroy({ where: { id } })

            if( !resposta ) throw 'Esse contato não existe'
        }

        catch( erro ) { tratarErroDeModel(erro) }
    }

    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = ContatoModel()