const ContatoEntity = require('../models/ContatoEntity')
const tratarErrosDeServices = require('./_tratarErrosDeServices')

function ContatoService () {
    async function criar({ nome, usuario_id, destinatario_id, ultima_interacao, ultima_mensagem }) {
        try {
            return await ContatoEntity.create({
                nome,
                usuario_id,
                destinatario_id,
                ultima_interacao,
                ultima_mensagem
            })
        }

        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function pegarPorId( id ) {
        try {
            const contatoSalvo = await ContatoEntity.findOne({ where: { id } })

            if( !contatoSalvo ) throw 'Contato não encontrado'

            return contatoSalvo
        }

        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function apagar( id ) {
        try {
            const resposta = await ContatoEntity.destroy({ where: { id } })

            if( !resposta ) throw 'Esse contato não existe'
        }

        catch( erro ) { tratarErrosDeServices(erro) }
    }

    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = ContatoService()