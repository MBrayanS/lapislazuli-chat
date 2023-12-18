function MembroService( MembroRepository ) {
    
    async function criar({ usuario_id, grupo_id, ultima_interacao, ultima_mensagem }) {
        try {
            return await MembroRepository.criar({ usuario_id, grupo_id, ultima_interacao, ultima_mensagem })
        }
            
        catch( erro ) {
            const membroJaCriado = erro.tipo == 'Violação única' && erro.campo == 'usuario_id'

            if( membroJaCriado ) throw { statusCode: 400, message: 'Já existe um membro com esses dados' }

            throw erro
        }
    }

    async function encontrar({ usuario_id, grupo_id }) {
        const membroSalvo = await MembroRepository.pegar({ usuario_id, grupo_id })

        if( !membroSalvo ) throw { statusCode: 404, message: 'Membro não encontrado' }

        return membroSalvo
    }

    async function apagarPorId( id ) {
        const resposta = await MembroRepository.apagar({ id })
        
        if( !resposta ) throw { statusCode: 400, message: 'Esse membro não existe' }
        
        return resposta
    }

    return {
        criar,
        encontrar,
        apagarPorId
    }
}

module.exports = MembroService