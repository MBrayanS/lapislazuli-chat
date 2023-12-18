const Repository = require("../repository/Repository");

const ContatoEntity = require("../models/ContatoEntity");
const GrupoEntity = require("../models/GrupoEntity");
const MembroEntity = require("../models/MembroEntity");
const MensagemEntity = require("../models/MensagemEntity");
const UsuarioEntity = require("../models/UsuarioEntity");

module.exports = {
    ContatoRepository: Repository(ContatoEntity),
    GrupoRepository: Repository(GrupoEntity),
    MembroRepository: Repository(MembroEntity),
    MensagemRepository: Repository(MensagemEntity),
    UsuarioRepository: Repository(UsuarioEntity),
}