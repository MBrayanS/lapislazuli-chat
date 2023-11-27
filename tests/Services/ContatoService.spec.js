const ContatoEntity = require("../../src/models/ContatoEntity")
const ContatoService = require("../../src/services/ContatoService")

const testarMetodoCriarComPropriedadesInvalidas = require('../testarMetodoCriarComPropriedadesInvalidas')

const idFalso = '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e3'

const dadosDoContato = {
    nome: 'Contato teste',
    ultima_interacao: new Date(),
    ultima_mensagem: new Date(),
    usuario_id: '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e1',
    destinatario_id: '9b15b9dc-7ad6-4ef0-b8ef-b2f46178b7e5'
}

describe('Testes do service ContatoService', () => {
    describe('Criar novo contato', () => {
        it('Criar com sucesso', async () => {
            const novoContato = await ContatoService.criar(dadosDoContato)
    
            expect(novoContato instanceof ContatoEntity).toBeTruthy()
            expect(novoContato).toMatchObject(dadosDoContato)
    
            await ContatoEntity.destroy({ where: { id: novoContato.id } })
        })

        it('Erro com nome invalido', async () => {
            const dadosInvalidos = { ...dadosDoContato, nome: {} }

            await expect( async () => await ContatoService.criar(dadosInvalidos) )
            .rejects.toThrow('A propriedade nome não tem um valor valido')
        })

        it('Erro com data invalida', async () => {
            const dadosInvalidos = { ...dadosDoContato, ultima_interacao: {} }

            await expect( async () => await ContatoService.criar(dadosInvalidos) )
            .rejects.toThrow('As propriedades de dadas devem ter o formato DATE')
        })

        it('Erro com id invalido', async () => {
            const dadosInvalidos = { ...dadosDoContato, usuario_id: {} }

            await expect( async () => await ContatoService.criar(dadosInvalidos) )
            .rejects.toThrow('As propriedades de ids devem ter o formato UUID')
        })
    
        it('Erro com valores vazios', async () => {
            const dadosInvalidos = {
                nome: undefined,
                usuario_id: undefined,
                destinatario_id: undefined
            }

            const finalDaMensagem = 'esta vazia'

            await Promise.all( testarMetodoCriarComPropriedadesInvalidas( ContatoService, dadosDoContato, dadosInvalidos, finalDaMensagem ) )
        })
    })
    
    describe('Pegar contato', () => {
        it('Pegar com sucesso', async () => {
            const novoContato = await ContatoService.criar(dadosDoContato)
            const mensagemSalva = await ContatoService.pegarPorId(novoContato.id)
            
            expect(mensagemSalva.id).toEqual(novoContato.id)
    
            await ContatoEntity.destroy({ where: { id: novoContato.id } })
        })
    
        it('Contato não encontrado', async () => {
            const funcaoComErro = async () => await ContatoService.pegarPorId(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Contato não encontrado')
        })
    
        it('Erro de id com string invalida', async () => {
            const funcaoComErro = async () => await ContatoService.pegarPorId('')
    
            await expect(funcaoComErro).rejects.toThrow('As propriedades de ids devem ter o formato UUID')
        })
    
        it('Erro de id com valor invalido', async () => {
            const funcaoComErro = async () => await ContatoService.pegarPorId(undefined)
    
            await expect(funcaoComErro).rejects.toThrow('A propriedade id não pode ter valor undefined')
        })
    })
    
    describe('Apagar contato', () => {
        it('Apagar com sucesso', async () => {
            const novoContato = await ContatoService.criar(dadosDoContato)
            const funcaoComErro = async () => await ContatoService.pegarPorId(novoContato.id)
    
            await ContatoService.apagar(novoContato.id)
    
            await expect(funcaoComErro).rejects.toThrow('Contato não encontrado')
        })
    
        it('Tentar apagar um contato que não existe', async () => {
            const funcaoComErro = async () => await ContatoService.apagar(idFalso)
    
            await expect(funcaoComErro).rejects.toThrow('Esse contato não existe')
        })
    })
})