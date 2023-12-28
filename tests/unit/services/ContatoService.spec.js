const { ContatoRepository } = require("../../../src/modules/RepositoriesModule")
const { ContatoService } = require('../../../src/modules/ServicesModule')

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
            await ContatoService.criar(dadosDoContato)

            const funcaoComErro = async () => await ContatoService.criar(dadosDoContato)

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