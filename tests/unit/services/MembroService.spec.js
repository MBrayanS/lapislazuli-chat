const MembroServiceFactory = require("../../../src/services/MembroService")
const RepositoryInMemory = require('../../../src/repository/RepositoryInMemory')

const MembroRepository = RepositoryInMemory()
const MembroService = MembroServiceFactory(MembroRepository)

const dadosDoMembro = {
    usuario_id: 'idUsuarioTeste',
    grupo_id: 'idGrupoTeste'
}

describe('Testando o MembroService ao', () => {

    afterEach( () => MembroRepository.limparTodosOsRegistros() )
    
    describe('Criar novo membro', () => {

        it('com sucesso', async () => {
            const novoMembro = await MembroService.criar(dadosDoMembro)

            expect(novoMembro).toMatchObject(dadosDoMembro)
        })

        it('com erro ao criar membro duplicado', async () => {
            const MembroRepositoryMock = { criar: jest.fn().mockRejectedValue({ tipo: 'Violação única', campo: 'usuario_id' }) }
            const MembroServiceMock = MembroServiceFactory(MembroRepositoryMock)

            const funcaoComErro = async () => await MembroServiceMock.criar(dadosDoMembro)

            await expect(funcaoComErro).rejects.toEqual({ statusCode: 400, message: 'Já existe um membro com esses dados' })
        })

    })

    describe('Encontrar membro', () => {

        const { usuario_id, grupo_id } = dadosDoMembro

        it('com sucesso', async () => {
            const novoMembro = await MembroService.criar(dadosDoMembro)
            const membroEncontrado = await MembroService.encontrar({ usuario_id, grupo_id })
        
            expect(novoMembro).toEqual(membroEncontrado)
        })

        it('com erro de membro não encontrado', async () => {
            const funcaoComErro = async () => await MembroService.encontrar({ usuario_id, grupo_id })
        
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 404, message: 'Membro não encontrado' })
        })

    })

    describe('Apagar membro', () => {

        it('com sucesso', async () => {
            const novoMembro = await MembroService.criar(dadosDoMembro)
            const resposta = await MembroService.apagarPorId(novoMembro.id)
    
            expect(resposta).toBeTruthy()
        })

        it('com erro de apagar um membro que não existe', async () => {
            const funcaoComErro = async () => await MembroService.apagarPorId(0)
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 400, message: 'Esse membro não existe' })
        })

    })

})