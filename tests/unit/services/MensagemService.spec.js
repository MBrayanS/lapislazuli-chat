const { MensagemRepository } = require("../../../src/modules/RepositoriesModule")
const { MensagemService } = require('../../../src/modules/ServicesModule')

const dadosDaMensagem = {
    texto: 'Texto da mensagem',
    usuario_id: 'idDeUsuarioTeste',
    canal_id: 'IdDeCanalTeste'
}

describe('Testando o MensagemService ao', () => {

    afterEach( () => MensagemRepository.limparTodosOsRegistros() )
    
    it('Criar nova mensagem com sucesso', async () => {
        const novaMensagem = await MensagemService.criar(dadosDaMensagem)

        expect(novaMensagem).toMatchObject(dadosDaMensagem)
    })

    describe('Pegar todas as mensagens de um usuario', () => {

        it('com sucesso', async () => {
            const novaMensagem1 = await MensagemRepository.criar(dadosDaMensagem)
            const novaMensagem2 = await MensagemRepository.criar(dadosDaMensagem)

            const mensagens = await MensagemService.pegarTodasDeUmUsuario(dadosDaMensagem.usuario_id)
        
            expect(mensagens).toEqual([ novaMensagem1, novaMensagem2 ])
        })

        it('com resposta vazia', async () => {
            const mensagens = await MensagemService.pegarTodasDeUmUsuario(dadosDaMensagem.usuario_id)
        
            expect(mensagens).toEqual([])
        })

    })

    describe('Pegar todas as mensagens de um canal', () => {

        it('com sucesso', async () => {
            const novaMensagem1 = await MensagemRepository.criar(dadosDaMensagem)
            const novaMensagem2 = await MensagemRepository.criar(dadosDaMensagem)

            const mensagens = await MensagemService.pegarTodasDeUmCanal(dadosDaMensagem.canal_id)
        
            expect(mensagens).toEqual([ novaMensagem1, novaMensagem2 ])
        })

        it('com resposta vazia', async () => {
            const mensagens = await MensagemService.pegarTodasDeUmCanal(dadosDaMensagem.canal_id)
        
            expect(mensagens).toEqual([])
        })

    })

    describe('Apagar mensagem', () => {

        it('com sucesso', async () => {
            const novaMensagem = await MensagemService.criar(dadosDaMensagem)
            const resposta = await MensagemService.apagarPorId(novaMensagem.id)
    
            expect(resposta).toBeTruthy()
        })

        it('com erro de apagar mensagem que não existe', async () => {
            const funcaoComErro = async () => await MensagemService.apagarPorId(0)
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 400, message: 'Essa mensagem não existe' })
        })

    })

})