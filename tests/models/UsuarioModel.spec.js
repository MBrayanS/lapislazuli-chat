const Usuario = require('../../src/entities/Usuario');
const UsuarioModel = require('../../src/models/UsuarioModel')

const testarMetodoCriarComPropriedadesInvalidas = require('../testarMetodoCriarComPropriedadesInvalidas')

describe('Testes do model UsuarioModel', () => {
    const dadosDoUsuario = { nome: 'Usuario teste', senha: '12345678', email: 'usuario@teste', cor: '#fff' }
    const idFalso = '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e3'
    
    describe('Criar novo usuario', () => {
        it('Criar com sucesso', async () => {
            const novoUsuario = await UsuarioModel.criar(dadosDoUsuario)
    
            expect(novoUsuario).toMatchObject(dadosDoUsuario)
            expect(novoUsuario instanceof Usuario).toBeTruthy()
    
            await Usuario.destroy({ where: { email: dadosDoUsuario.email } })
        })
    
        it('Erro com valores invalidos', async () => {
            const dadosInvalidos = { nome: {}, senha: [], email: {}, cor: [] }
            const finalDaMensagem = 'não tem um valor valido'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( UsuarioModel, dadosDoUsuario, dadosInvalidos, finalDaMensagem ) )
        })

        it('Erro com valores vazios', async () => {
            const dadosInvalidos = { nome: undefined, senha: undefined, email: undefined, cor: undefined }
            const finalDaMensagem = 'esta vazia'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( UsuarioModel, dadosDoUsuario, dadosInvalidos, finalDaMensagem ) )
        })
    
        it('Erro com valor duplicado', async () => {
            const funcaoComErro = async () => {
                await UsuarioModel.criar(dadosDoUsuario)
                await UsuarioModel.criar(dadosDoUsuario)
            }

            await expect(funcaoComErro).rejects.toThrow('A propriedade email esta duplicada')
    
            await Usuario.destroy({ where: { email: dadosDoUsuario.email } })
        })
    })

    describe('Pegar usuario', () => {
        it('Pegar com sucesso', async () => {
            const novoUsuario = await UsuarioModel.criar(dadosDoUsuario)
            const usuarioSalvo = await UsuarioModel.pegarPorId(novoUsuario.id)
    
            expect(usuarioSalvo.id).toEqual(novoUsuario.id)
    
            await Usuario.destroy({ where: { email: dadosDoUsuario.email } })
        })
    
        it('Usuario não encontrado', async () => {
            const funcaoComErro = async () => await UsuarioModel.pegarPorId(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Usuario não encontrado')
        })
    
        it('Erro de id com string invalida', async () => {
            const funcaoComErro = async () => await UsuarioModel.pegarPorId('')
    
            await expect(funcaoComErro).rejects.toThrow('As propriedades de ids devem ter o formato UUID')
        })
    
        it('Erro de id com valor invalido', async () => {
            const funcaoComErro = async () => await UsuarioModel.pegarPorId(undefined)
    
            await expect(funcaoComErro).rejects.toThrow('A propriedade id não pode ter valor undefined')
        })
    })

    describe('Apagar usuario', () => {
        it('Apagar com sucesso', async () => {
            const novoUsuario = await UsuarioModel.criar(dadosDoUsuario)
            const funcaoComErro = async () => await UsuarioModel.pegarPorId(novoUsuario.id)
    
            await UsuarioModel.apagar(novoUsuario.id)
    
            await expect(funcaoComErro).rejects.toThrow('Usuario não encontrado')
        })
    
        it('Tentar apagar um usuario que não existe', async () => {
            const funcaoComErro = async () => await UsuarioModel.apagar(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Esse usuario não existe')
        })
    })
})