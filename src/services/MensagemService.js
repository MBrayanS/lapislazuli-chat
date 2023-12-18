function MensagemService( MensagemRepository ) {
    
    async function criar({ texto, usuario_id, canal_id }) {
        return await MensagemRepository.criar({ texto, usuario_id, canal_id }) 
    }

    async function pegarTodasDeUmCanal( canal_id ) {
        return await MensagemRepository.pegarTodos({ canal_id })
    }

    async function pegarTodasDeUmUsuario( usuario_id ) {
        return await MensagemRepository.pegarTodos({ usuario_id })
    }

    async function apagarPorId( id ) {
        const resposta = await MensagemRepository.apagar({ id })

        if( !resposta ) throw { statusCode: 400, message: 'Essa mensagem não existe' }

        return resposta
    }

    return {
        criar,
        pegarTodasDeUmCanal,
        pegarTodasDeUmUsuario,
        apagarPorId
    }
}

module.exports = MensagemService