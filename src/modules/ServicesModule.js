const ContatoService = require('../services/ContatoService')
const GrupoService = require('../services/GrupoService')
const MembroService = require('../services/MembroService')
const MensagemService = require('../services/MensagemService')
const UsuarioService = require('../services/UsuarioService')

const {
    ContatoRepository,
    GrupoRepository,
    MembroRepository,
    MensagemRepository,
    UsuarioRepository
} = require('./RepositoriesModule')

module.exports = {
    ContatoService: ContatoService(ContatoRepository),
    GrupoService: GrupoService(GrupoRepository),
    MembroService: MembroService(MembroRepository),
    MensagemService: MensagemService(MensagemRepository),
    UsuarioService: UsuarioService(UsuarioRepository)
}