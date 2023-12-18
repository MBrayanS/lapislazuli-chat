function ContatoService( ContatoRepository ) {
    
    async function criar({ nome, usuario_id, destinatario_id, ultima_interacao, ultima_mensagem }) {
        try {
            return await ContatoRepository.criar({ nome, usuario_id, destinatario_id, ultima_interacao, ultima_mensagem })
        }
            
        catch( erro ) {
            const contatoJaCriado = erro.tipo == 'Violação única' && erro.campo == 'usuario_id'

            if( contatoJaCriado ) throw { statusCode: 400, message: 'Já existe um contato com esses dados' }

            throw erro
        }
    }

    async function pegarPorId( id ) {
        const contatoSalvo = await ContatoRepository.pegar({ id })

        if( !contatoSalvo ) throw { statusCode: 404, message: 'Contato não encontrado' }

        return contatoSalvo
    }

    async function apagarPorId( id ) {
        const resposta = await ContatoRepository.apagar({ id })

        if( !resposta ) throw { statusCode: 400, message: 'Esse contato não existe' }

        return resposta
    }

    return {
        criar,
        pegarPorId,
        apagarPorId
    }
}

module.exports = ContatoService