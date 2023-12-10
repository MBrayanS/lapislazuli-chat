const MensagemEntity = require("../../src/models/MensagemEntity")
const MensagemService = require("../../src/services/MensagemService")
const GrupoService = require("../../src/services/GrupoService")
const UsuarioService = require("../../src/services/UsuarioService")

const testarMetodoCriarComPropriedadesInvalidas = require('../testarMetodoCriarComPropriedadesInvalidas')

const idFalso = '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e3'

let usuarioTeste
let grupoTeste

const dadosDaMensagem = { texto: 'Essa é uma mensagem de teste.' }

describe('Testes do service MensagemService', () => {

    beforeAll( async () => {
        usuarioTeste = await UsuarioService.criar({ nome: 'Usuario teste', senha: '12345678', email: 'usuario@teste' })
        grupoTeste = await GrupoService.criar({ nome: 'Grupo teste', descricao: 'grupo teste e tals' })

        dadosDaMensagem.usuario_id = usuarioTeste.id
        dadosDaMensagem.canal_id = grupoTeste.id
    })

    describe('Criar nova mensagem', () => {

        it('Criar com sucesso', async () => {
            const novaMensagem = await MensagemService.criar(dadosDaMensagem)
    
            expect(novaMensagem instanceof MensagemEntity).toBeTruthy()
            expect(novaMensagem).toMatchObject(dadosDaMensagem)
    
            await MensagemEntity.destroy({ where: { id: novaMensagem.id } })
        })

        it('Erro com texto invalido', async () => {
            const dadosInvalidos = { ...dadosDaMensagem, texto: {} }

            await expect( async () => await MensagemService.criar(dadosInvalidos) )
            .rejects.toThrow({ statusCode: 400, message: 'A propriedade texto não tem um valor valido' })
        })

        it('Erro com id invalido', async () => {
            const dadosInvalidos = { ...dadosDaMensagem, usuario_id: {} }

            await expect( async () => await MensagemService.criar(dadosInvalidos) )
            .rejects.toThrow({ statusCode: 400, message: 'As propriedades de ids devem ter o formato UUID' })
        })

        it('Erro com valores vazios', async () => {
            const dadosInvalidos = { texto: undefined, usuario_id: undefined, canal_id: undefined }
            const finalDaMensagem = 'esta vazia'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( MensagemService, dadosDaMensagem, dadosInvalidos, finalDaMensagem ) )
        })

    })
    
    describe('Pegar mensagem', () => {

        it('Pegar com sucesso', async () => {
            const novaMensagem = await MensagemService.criar(dadosDaMensagem)
            const mensagemSalva = await MensagemService.pegarPorId(novaMensagem.id)
            
            expect(mensagemSalva.id).toEqual(novaMensagem.id)
    
            await MensagemEntity.destroy({ where: { id: novaMensagem.id } })
        })
    
        it('Mensagem não encontrada', async () => {
            const funcaoComErro = async () => await MensagemService.pegarPorId(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'Mensagem não encontrada' })
        })
    
        it('Erro de id com valor invalido', async () => {
            const funcaoComErro = async () => await UsuarioService.pegarPorId(undefined)
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'A propriedade id não pode ter valor undefined' })
        })

    })
    
    describe('Apagar mensagem', () => {

        it('Apagar com sucesso', async () => {
            const novaMensagem = await MensagemService.criar(dadosDaMensagem)
            const funcaoComErro = async () => await MensagemService.pegarPorId(novaMensagem.id)
    
            await MensagemService.apagar(novaMensagem.id)
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'Mensagem não encontrada' })
        })
    
        it('Tentar apagar uma mensagem que não existe', async () => {
            const funcaoComErro = async () => await MensagemService.apagar(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'Essa mensagem não existe' })
        })

    })
    

    afterAll( async () => {
        await UsuarioService.apagar(usuarioTeste.id)
        await GrupoService.apagar(grupoTeste.id)
    })
    
})