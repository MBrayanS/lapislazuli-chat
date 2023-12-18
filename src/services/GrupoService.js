function GrupoService( GrupoRepository ) {

    async function criar({ nome, descricao }) {
        return await GrupoRepository.criar({ nome, descricao })
    }

    async function pegarPorId( id ) {
        const grupo = await GrupoRepository.pegar({ id })
        
        if( !grupo ) throw { statusCode: 404, message: 'Grupo não encontrado' }

        return grupo
    }

    async function apagarPorId( id ) {
        const resposta = await GrupoRepository.apagar({ id })
        
        if( !resposta ) throw { statusCode: 400, message: 'Esse grupo não existe' }

        return resposta
    }
    
    return {
        criar,
        pegarPorId,
        apagarPorId
    }
}

module.exports = GrupoService