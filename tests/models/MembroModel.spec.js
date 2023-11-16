const Membro = require("../../src/entities/Membro")
const MembroModel = require("../../src/models/MembroModel")

const testarMetodoCriarComPropriedadesInvalidas = require('../testarMetodoCriarComPropriedadesInvalidas')

const idFalso = '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e3'

const dadosDoMembro = {
    ultima_interacao: new Date(),
    ultima_mensagem: new Date(),
    usuario_id: '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e1',
    grupo_id: '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e5'
}

describe('Testes do model MembroModel', () => {
    describe('Criar novo membro', () => {
        it('Criar com sucesso', async () => {
            const novoMembro = await MembroModel.criar(dadosDoMembro)
    
            expect(novoMembro instanceof Membro).toBeTruthy()
            expect(novoMembro).toMatchObject(dadosDoMembro)
    
            await Membro.destroy({ where: { id: novoMembro.id } })
        })

        it('Erro com data invalida', async () => {
            const dadosInvalidos = { ...dadosDoMembro, ultima_interacao: {} }

            await expect( async () => await MembroModel.criar(dadosInvalidos) )
            .rejects.toThrow('As propriedades de dadas devem ter o formato DATE')
        })

        it('Erro com id invalido', async () => {
            const dadosInvalidos = { ...dadosDoMembro, usuario_id: {} }

            await expect( async () => await MembroModel.criar(dadosInvalidos) )
            .rejects.toThrow('As propriedades de ids devem ter o formato UUID')
        })
    
        it('Erro com valores vazios', async () => {
            const dadosInvalidos = {
                usuario_id: undefined,
                grupo_id: undefined
            }

            const finalDaMensagem = 'esta vazia'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( MembroModel, dadosDoMembro, dadosInvalidos, finalDaMensagem ) )
        })
    })
    
    describe('Pegar membro', () => {
        it('Pegar com sucesso', async () => {
            const novoMembro = await MembroModel.criar(dadosDoMembro)
            const mensagemSalva = await MembroModel.pegarPorId(novoMembro.id)
            
            expect(mensagemSalva.id).toEqual(novoMembro.id)
    
            await Membro.destroy({ where: { id: novoMembro.id } })
        })
    
        it('Membro não encontrado', async () => {
            const funcaoComErro = async () => await MembroModel.pegarPorId(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Membro não encontrado')
        })
    
        it('Erro de id com string invalida', async () => {
            const funcaoComErro = async () => await MembroModel.pegarPorId('')
    
            await expect(funcaoComErro).rejects.toThrow('As propriedades de ids devem ter o formato UUID')
        })
    
        it('Erro de id com valor invalido', async () => {
            const funcaoComErro = async () => await MembroModel.pegarPorId(undefined)
    
            await expect(funcaoComErro).rejects.toThrow('A propriedade id não pode ter valor undefined')
        })
    })
    
    describe('Apagar membro', () => {
        it('Apagar com sucesso', async () => {
            const novoMembro = await MembroModel.criar(dadosDoMembro)
            const funcaoComErro = async () => await MembroModel.pegarPorId(novoMembro.id)
    
            await MembroModel.apagar(novoMembro.id)
    
            await expect(funcaoComErro).rejects.toThrow('Membro não encontrado')
        })
    
        it('Tentar apagar um membro que não existe', async () => {
            const funcaoComErro = async () => await MembroModel.apagar(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Esse membro não existe')
        })
    })
})