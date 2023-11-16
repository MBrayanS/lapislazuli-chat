const Grupo = require("../../src/entities/Grupo")
const GrupoModel = require("../../src/models/GrupoModel")

const testarMetodoCriarComPropriedadesInvalidas = require('../testarMetodoCriarComPropriedadesInvalidas')

describe('Testes do model GrupoModel', () => {
    const dadosDoGrupo = { nome: 'Grupo teste', descricao: 'grupo teste e tals' }
    const idFalso = '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e3'

    describe('Criar novo grupo', () => {
        it('Criar com sucesso', async () => {
            const novoGrupo = await GrupoModel.criar(dadosDoGrupo)
    
            expect(novoGrupo instanceof Grupo).toBeTruthy()
    
            await Grupo.destroy({ where: { id: novoGrupo.id } })
        })

        it('Erro com valores invalidos', async () => {
            const dadosInvalidos = { nome: {}, descricao: [] }
            const finalDaMensagem = 'não tem um valor valido'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( GrupoModel, dadosDoGrupo, dadosInvalidos, finalDaMensagem ) )
        })
    
        it('Erro com valores vazios', async () => {
            const dadosInvalidos = { nome: undefined, descricao: undefined }
            const finalDaMensagem = 'esta vazia'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( GrupoModel, dadosDoGrupo, dadosInvalidos, finalDaMensagem ) )
        })
    })

    describe('Pegar grupo', () => {
        it('Pegar com sucesso', async () => {
            const novoGrupo = await GrupoModel.criar(dadosDoGrupo)
            const grupoSalvo = await GrupoModel.pegarPorId(novoGrupo.id)
            
            expect(grupoSalvo.id).toEqual(novoGrupo.id)
    
            await Grupo.destroy({ where: { id: novoGrupo.id } })
        })
    
        it('Grupo não encontrado', async () => {
            const funcaoComErro = async () => await GrupoModel.pegarPorId(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Grupo não encontrado')
        })
    
        it('Erro de id com valor invalido', async () => {
            const funcaoComErro = async () => await GrupoModel.pegarPorId('')
    
            await expect(funcaoComErro).rejects.toThrow('As propriedades de ids devem ter o formato UUID')
        })
    })

    describe('Apagar grupo', () => {
        it('Apagar com sucesso', async () => {
            const novoGrupo = await GrupoModel.criar(dadosDoGrupo)
            const funcaoComErro = async () => await GrupoModel.pegarPorId(novoGrupo.id)
    
            await GrupoModel.apagar(novoGrupo.id)
    
            await expect(funcaoComErro).rejects.toThrow('Grupo não encontrado')
        })
    
        it('Tentar apagar um grupo que não existe', async () => {
            const funcaoComErro = async () => await GrupoModel.apagar(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Esse grupo não existe')
        })
    })
})