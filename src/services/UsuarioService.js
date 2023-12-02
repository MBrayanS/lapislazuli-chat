const UsuarioEntity = require('../models/UsuarioEntity')
const tratarErrosDeServices = require('../Errors/tratarErrosDeServices')

function UsuarioService () {
    async function criar( dadosDoUsuario ) {
        try { return await UsuarioEntity.create(dadosDoUsuario) } 
        
        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function pegarPorId( id ) {
        try {
            const usuarioSalvo =  await UsuarioEntity.findOne({ where: { id } })

            if ( !usuarioSalvo ) throw 'Usuario não encontrado'

            return usuarioSalvo
        } 
        
        catch( erro ) { tratarErrosDeServices(erro) }
    }

    async function apagar( id ) {
        try { 
            const resposta = await UsuarioEntity.destroy({ where: { id } }) 

            if ( !resposta ) throw 'Esse usuario não existe'
        } 
        
        catch( erro ) { tratarErrosDeServices(erro) }
    }

    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = UsuarioService()