const Usuario = require('../entities/Usuario')
const tratarErroDeModel = require('../tratarErroDeModel')

function UsuarioModel () {
    async function criar( dadosDoUsuario ) {
        try { return await Usuario.create(dadosDoUsuario) } 
        
        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function pegarPorId( id ) {
        try {
            const usuarioSalvo =  await Usuario.findOne({ where: { id } })

            if ( !usuarioSalvo ) throw 'Usuario não encontrado'

            return usuarioSalvo
        } 
        
        catch( erro ) { tratarErroDeModel(erro) }
    }

    async function apagar( id ) {
        try { 
            const resposta = await Usuario.destroy({ where: { id } }) 

            if ( !resposta ) throw 'Esse usuario não existe'
        } 
        
        catch( erro ) { tratarErroDeModel(erro) }
    }

    return {
        criar,
        pegarPorId,
        apagar
    }
}

module.exports = UsuarioModel()