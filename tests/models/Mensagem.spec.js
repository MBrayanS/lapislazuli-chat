const Mensagem = require("../../src/entities/Mensagem")
const MensagemModel = require("../../src/models/MensagemModel")
const GrupoModel = require("../../src/models/GrupoModel")
const UsuarioModel = require("../../src/models/UsuarioModel")

const testarMetodoCriarComPropriedadesInvalidas = require('../testarMetodoCriarComPropriedadesInvalidas')

const idFalso = '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e3'

let usuarioTeste
let grupoTeste

const dadosDaMensagem = { texto: 'Essa é uma mensagem de teste.' }

describe('Testes do model MensagemModel', () => {
    beforeAll( async () => {
        usuarioTeste = await UsuarioModel.criar({ nome: 'Usuario teste', senha: '12345678', email: 'usuario@teste', cor: '#fff' })
        grupoTeste = await GrupoModel.criar({ nome: 'Grupo teste', descricao: 'grupo teste e tals' })

        dadosDaMensagem.usuario_id = usuarioTeste.id
        dadosDaMensagem.canal_id = grupoTeste.id
    })

    describe('Criar nova mensagem', () => {
        it('Criar com sucesso', async () => {
            const novaMensagem = await MensagemModel.criar(dadosDaMensagem)
    
            expect(novaMensagem instanceof Mensagem).toBeTruthy()
            expect(novaMensagem).toMatchObject(dadosDaMensagem)
    
            await Mensagem.destroy({ where: { id: novaMensagem.id } })
        })

        it('Erro com texto invalido', async () => {
            const dadosInvalidos = { ...dadosDaMensagem, texto: {} }

            await expect( async () => await MensagemModel.criar(dadosInvalidos) )
            .rejects.toThrow(`A propriedade texto não tem um valor valido`)
        })

        it('Erro com id invalido', async () => {
            const dadosInvalidos = { ...dadosDaMensagem, usuario_id: {} }

            await expect( async () => await MensagemModel.criar(dadosInvalidos) )
            .rejects.toThrow('As propriedades de ids devem ter o formato UUID')
        })

        it('Erro com valores vazios', async () => {
            const dadosInvalidos = { texto: undefined, usuario_id: undefined, canal_id: undefined }
            const finalDaMensagem = 'esta vazia'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( MensagemModel, dadosDaMensagem, dadosInvalidos, finalDaMensagem ) )
        })
    })
    
    describe('Pegar mensagem', () => {
        it('Pegar com sucesso', async () => {
            const novaMensagem = await MensagemModel.criar(dadosDaMensagem)
            const mensagemSalva = await MensagemModel.pegarPorId(novaMensagem.id)
            
            expect(mensagemSalva.id).toEqual(novaMensagem.id)
    
            await Mensagem.destroy({ where: { id: novaMensagem.id } })
        })
    
        it('Mensagem não encontrada', async () => {
            const funcaoComErro = async () => await MensagemModel.pegarPorId(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Mensagem não encontrada')
        })
    
        it('Erro de id com valor invalido', async () => {
            const funcaoComErro = async () => await UsuarioModel.pegarPorId(undefined)
    
            await expect(funcaoComErro).rejects.toThrow('A propriedade id não pode ter valor undefined')
        })
    })
    
    describe('Apagar mensagem', () => {
        it('Apagar com sucesso', async () => {
            const novaMensagem = await MensagemModel.criar(dadosDaMensagem)
            const funcaoComErro = async () => await MensagemModel.pegarPorId(novaMensagem.id)
    
            await MensagemModel.apagar(novaMensagem.id)
    
            await expect(funcaoComErro).rejects.toThrow('Mensagem não encontrada')
        })
    
        it('Tentar apagar uma mensagem que não existe', async () => {
            const funcaoComErro = async () => await MensagemModel.apagar(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Essa mensagem não existe')
        })
    })
    

    afterAll( async () => {
        await UsuarioModel.apagar(usuarioTeste.id)
        await GrupoModel.apagar(grupoTeste.id)
    })
})