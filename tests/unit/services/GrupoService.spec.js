const GrupoServiceFactory = require("../../../src/services/GrupoService")
const RepositoryInMemory = require('../../../src/repository/RepositoryInMemory')

const GrupoRepository = RepositoryInMemory()
const GrupoService = GrupoServiceFactory(GrupoRepository)

const dadosDoGrupo = {
    nome: 'Nome do grupo',
    descricao: 'Descricao do grupo'
}

describe('Testando o GrupoService ao', () => {

    afterEach( () => GrupoRepository.limparTodosOsRegistros() )
    
    it('Criar novo grupo com sucesso', async () => {
        const novoGrupo = await GrupoService.criar(dadosDoGrupo)

        expect(novoGrupo).toMatchObject(dadosDoGrupo)
    })

    describe('Pegar grupo por id', () => {

        it('com sucesso', async () => {
            const novoGrupo = await GrupoService.criar(dadosDoGrupo)
            const grupoEncontrado = await GrupoService.pegarPorId(novoGrupo.id)
        
            expect(novoGrupo).toEqual(grupoEncontrado)
        })

        it('com erro de grupo não encontrado', async () => {
            const funcaoComErro = async () => await GrupoService.pegarPorId(0)
        
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 404, message: 'Grupo não encontrado' })
        })

    })

    describe('Apagar grupo', () => {

        it('com sucesso', async () => {
            const novoGrupo = await GrupoService.criar(dadosDoGrupo)
            const resposta = await GrupoService.apagarPorId(novoGrupo.id)
    
            expect(resposta).toBeTruthy()
        })

        it('com erro de apagar um grupo que não existe', async () => {
            const funcaoComErro = async () => await GrupoService.apagarPorId(0)
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 400, message: 'Esse grupo não existe' })
        })

    })

})