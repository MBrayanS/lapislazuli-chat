const GrupoEntity = require("../../src/models/GrupoEntity")
const GrupoService = require("../../src/services/GrupoService")

const testarMetodoCriarComPropriedadesInvalidas = require('../testarMetodoCriarComPropriedadesInvalidas')

describe('Testes do service GrupoService', () => {
    const dadosDoGrupo = { nome: 'Grupo teste', descricao: 'grupo teste e tals' }
    const idFalso = '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e3'

    describe('Criar novo grupo', () => {
        it('Criar com sucesso', async () => {
            const novoGrupo = await GrupoService.criar(dadosDoGrupo)
    
            expect(novoGrupo instanceof GrupoEntity).toBeTruthy()
    
            await GrupoEntity.destroy({ where: { id: novoGrupo.id } })
        })

        it('Erro com valores invalidos', async () => {
            const dadosInvalidos = { nome: {}, descricao: [] }
            const finalDaMensagem = 'não tem um valor valido'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( GrupoService, dadosDoGrupo, dadosInvalidos, finalDaMensagem ) )
        })
    
        it('Erro com valores vazios', async () => {
            const dadosInvalidos = { nome: undefined, descricao: undefined }
            const finalDaMensagem = 'esta vazia'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( GrupoService, dadosDoGrupo, dadosInvalidos, finalDaMensagem ) )
        })
    })

    describe('Pegar grupo', () => {
        it('Pegar com sucesso', async () => {
            const novoGrupo = await GrupoService.criar(dadosDoGrupo)
            const grupoSalvo = await GrupoService.pegarPorId(novoGrupo.id)
            
            expect(grupoSalvo.id).toEqual(novoGrupo.id)
    
            await GrupoEntity.destroy({ where: { id: novoGrupo.id } })
        })
    
        it('Grupo não encontrado', async () => {
            const funcaoComErro = async () => await GrupoService.pegarPorId(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Grupo não encontrado')
        })
    
        it('Erro de id com valor invalido', async () => {
            const funcaoComErro = async () => await GrupoService.pegarPorId('')
    
            await expect(funcaoComErro).rejects.toThrow('As propriedades de ids devem ter o formato UUID')
        })
    })

    describe('Apagar grupo', () => {
        it('Apagar com sucesso', async () => {
            const novoGrupo = await GrupoService.criar(dadosDoGrupo)
            const funcaoComErro = async () => await GrupoService.pegarPorId(novoGrupo.id)
    
            await GrupoService.apagar(novoGrupo.id)
    
            await expect(funcaoComErro).rejects.toThrow('Grupo não encontrado')
        })
    
        it('Tentar apagar um grupo que não existe', async () => {
            const funcaoComErro = async () => await GrupoService.apagar(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Esse grupo não existe')
        })
    })
})