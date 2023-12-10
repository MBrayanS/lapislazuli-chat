const UsuarioEntity = require('../../src/models/UsuarioEntity');
const UsuarioService = require('../../src/services/UsuarioService')

const testarMetodoCriarComPropriedadesInvalidas = require('../testarMetodoCriarComPropriedadesInvalidas')

describe('Testes do model UsuarioService', () => {

    const dadosDoUsuario = { nome: 'Usuario teste', senha: '12345678', email: 'usuario@teste' }
    const idFalso = '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e3'
    
    describe('Criar novo usuario', () => {

        it('Criar com sucesso', async () => {
            const novoUsuario = await UsuarioService.criar(dadosDoUsuario)
    
            expect(novoUsuario).toMatchObject(dadosDoUsuario)
            expect(novoUsuario instanceof UsuarioEntity).toBeTruthy()
    
            await UsuarioEntity.destroy({ where: { email: dadosDoUsuario.email } })
        })
    
        it('Erro com valores invalidos', async () => {
            const dadosInvalidos = { nome: {}, senha: [], email: {} }
            const finalDaMensagem = 'não tem um valor valido'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( UsuarioService, dadosDoUsuario, dadosInvalidos, finalDaMensagem ) )
        })

        it('Erro com valores vazios', async () => {
            const dadosInvalidos = { nome: undefined, senha: undefined, email: undefined }
            const finalDaMensagem = 'esta vazia'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( UsuarioService, dadosDoUsuario, dadosInvalidos, finalDaMensagem ) )
        })
    
        it('Erro com valor duplicado', async () => {
            const funcaoComErro = async () => {
                await UsuarioService.criar(dadosDoUsuario)
                await UsuarioService.criar(dadosDoUsuario)
            }

            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'A propriedade email esta duplicada' })
    
            await UsuarioEntity.destroy({ where: { email: dadosDoUsuario.email } })
        })

    })

    describe('Pegar usuario por id', () => {

        it('Pegar com sucesso', async () => {
            const novoUsuario = await UsuarioService.criar(dadosDoUsuario)
            const usuarioSalvo = await UsuarioService.pegarPorId(novoUsuario.id)
    
            expect(usuarioSalvo.id).toEqual(novoUsuario.id)
    
            await UsuarioEntity.destroy({ where: { email: dadosDoUsuario.email } })
        })
    
        it('Usuario não encontrado', async () => {
            const funcaoComErro = async () => await UsuarioService.pegarPorId(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'Usuario não encontrado' })
        })
    
        it('Erro de id com string invalida', async () => {
            const funcaoComErro = async () => await UsuarioService.pegarPorId('')
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'As propriedades de ids devem ter o formato UUID' })
        })
    
        it('Erro de id com valor invalido', async () => {
            const funcaoComErro = async () => await UsuarioService.pegarPorId(undefined)
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'A propriedade id não pode ter valor undefined' })
        })

    })

    describe('Pegar usuario por email e senha', () => {

        it('Pegar com sucesso', async () => {
            const novoUsuario = await UsuarioService.criar(dadosDoUsuario)
            const usuarioSalvo = await UsuarioService.pegarPorEmailESenha(dadosDoUsuario.email, dadosDoUsuario.senha)
    
            expect(usuarioSalvo.id).toEqual(novoUsuario.id)
    
            await UsuarioEntity.destroy({ where: { email: dadosDoUsuario.email } })
        })

        it('Usuario não encontrado', async () => {
            const funcaoComErro = async () => await UsuarioService.pegarPorEmailESenha('teste', 'teste')
    
            expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'Usuario não encontrado' })
        })

    })

    describe('Apagar usuario', () => {
        
        it('Apagar com sucesso', async () => {
            const novoUsuario = await UsuarioService.criar(dadosDoUsuario)
            const funcaoComErro = async () => await UsuarioService.pegarPorId(novoUsuario.id)
    
            await UsuarioService.apagar(novoUsuario.id)
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'Usuario não encontrado' })
        })
    
        it('Tentar apagar um usuario que não existe', async () => {
            const funcaoComErro = async () => await UsuarioService.apagar(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow({ statusCode: 400, message: 'Esse usuario não existe' })
        })

    })

})