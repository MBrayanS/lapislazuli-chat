const Repository = require("../models/repositories/Repository");
const UsuarioRepository = require("../models/repositories/UsuarioRepository");

const ContatoEntity = require("../models/entities/ContatoEntity");
const GrupoEntity = require("../models/entities/GrupoEntity");
const MembroEntity = require("../models/entities/MembroEntity");
const MensagemEntity = require("../models/entities/MensagemEntity");
const UsuarioEntity = require("../models/entities/UsuarioEntity");

module.exports = {
    ContatoRepository: new Repository(ContatoEntity),
    GrupoRepository: new Repository(GrupoEntity),
    MembroRepository: new Repository(MembroEntity),
    MensagemRepository: new Repository(MensagemEntity),
    UsuarioRepository: new UsuarioRepository(UsuarioEntity),
}