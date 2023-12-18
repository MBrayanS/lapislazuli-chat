function UsuarioService( UsuarioRepository ) {
    
    async function criar({ nome, email, senha }) {
        try { return await UsuarioRepository.criar({ nome, email, senha }) }
            
        catch( erro ) {
            const emailEmUso = erro.tipo == 'Violação única' && erro.campo == 'email'

            if( emailEmUso ) throw { statusCode: 400, message: 'Este email já esta em uso' }

            throw erro
        }
    }

    async function encontrar({ email, senha }) {
        const usuario = await UsuarioRepository.pegar({ email, senha })

        if( !usuario ) throw { statusCode: 404, message: 'Usuário não encontrado' }

        return usuario
    }

    async function apagarPorId( id ) {
        const resposta = await UsuarioRepository.apagar({ id })
        
        if( !resposta ) throw { statusCode: 400, message: 'Esse usuário não existe' }

        return resposta
    }

    return {
        criar,
        encontrar,
        apagarPorId
    }
}

module.exports = UsuarioService