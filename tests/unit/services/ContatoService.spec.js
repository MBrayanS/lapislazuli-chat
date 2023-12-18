const ContatoServiceFactory = require("../../../src/services/ContatoService")
const RepositoryInMemory = require('../../../src/repository/RepositoryInMemory')

const ContatoRepository = RepositoryInMemory()
const ContatoService = ContatoServiceFactory(ContatoRepository)

const dadosDoContato = {
    nome: 'Nome do contato',
    destinatario_id: 'idDestinatarioTeste',
    usuario_id: 'idUsuarioTeste'
}

describe('Testando o ContatoService ao', () => {

    afterEach( () => ContatoRepository.limparTodosOsRegistros() )
    
    describe('Criar novo contato', () => {
        it('com sucesso', async () => {
            const novoContato = await ContatoService.criar(dadosDoContato)
    
            expect(novoContato).toMatchObject(dadosDoContato)
        })

        it('com erro ao criar contato duplicado', async () => {
            const ContatoRepositoryMock = { criar: jest.fn().mockRejectedValue({ tipo: 'Violação única', campo: 'usuario_id' }) }
            const ContatoServiceMock = ContatoServiceFactory(ContatoRepositoryMock)

            const funcaoComErro = async () => await ContatoServiceMock.criar(dadosDoContato)

            await expect(funcaoComErro).rejects.toEqual({ statusCode: 400, message: 'Já existe um contato com esses dados' })
        })

    })

    describe('Pegar contato por id', () => {

        it('com sucesso', async () => {
            const novoContato = await ContatoService.criar(dadosDoContato)
            const contatoEncontrado = await ContatoService.pegarPorId(novoContato.id)
        
            expect(novoContato).toEqual(contatoEncontrado)
        })

        it('com erro de contato não encontrado', async () => {
            const funcaoComErro = async () => await ContatoService.pegarPorId(0)
        
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 404, message: 'Contato não encontrado' })
        })

    })

    describe('Apagar contato', () => {

        it('com sucesso', async () => {
            const novoContato = await ContatoService.criar(dadosDoContato)
            const resposta = await ContatoService.apagarPorId(novoContato.id)
    
            expect(resposta).toBeTruthy()
        })

        it('com erro de apagar um contato que não existe', async () => {
            const funcaoComErro = async () => await ContatoService.apagarPorId(0)
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 400, message: 'Esse contato não existe' })
        })

    })

})