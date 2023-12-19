const Repository = require("../repository/Repository");

const ContatoEntity = require("../models/ContatoEntity");
const GrupoEntity = require("../models/GrupoEntity");
const MembroEntity = require("../models/MembroEntity");
const MensagemEntity = require("../models/MensagemEntity");
const UsuarioEntity = require("../models/UsuarioEntity");

module.exports = {
    ContatoRepository: new Repository(ContatoEntity),
    GrupoRepository: new Repository(GrupoEntity),
    MembroRepository: new Repository(MembroEntity),
    MensagemRepository: new Repository(MensagemEntity),
    UsuarioRepository: new Repository(UsuarioEntity),
}