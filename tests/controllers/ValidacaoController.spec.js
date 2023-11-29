const ValidacaoController = require("../../src/controllers/ValidacaoController")

const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
const req = { body: {} }
const next = jest.fn()

const dadosDeCadastro = {
    nome: 'Nome de usuario',
    email: 'usuario@teste.com',
    senha: 'Senha12!'
}

describe('Testes do controller ValidacaoController', () => {

    it('Sucesso', async () => {
        req.body = dadosDeCadastro

        await ValidacaoController.cadastrar( req, res, next )

        expect(next).toHaveBeenCalled()
    })

    it('Email invalido', async () => {
        req.body = { ...dadosDeCadastro, email: 'usuario'}

        await ValidacaoController.cadastrar( req, res, next )

        expect(res.json).toHaveBeenCalledWith({ erro: 'O campo email não esta valido' })
    })

    it('Senha invalida', async () => {
        req.body = { ...dadosDeCadastro, senha: '12345678'}

        await ValidacaoController.cadastrar( req, res, next )

        expect(res.json).toHaveBeenCalledWith({ erro: 'A senha deve conter pelo menos um número e um caractere especial' })
    })
    
    describe('Erros gerais', () => {

        it('Tipo invalido', async () => {
            req.body = { ...dadosDeCadastro, nome: {} }

            await ValidacaoController.cadastrar( req, res, next )

            expect(res.json).toHaveBeenCalledWith({ erro: 'O campo \"nome\" deve ser uma string' })
            expect(res.status).toHaveBeenCalledWith(400)
        })

        it('Dado vazio', async () => {
            req.body = {}

            await ValidacaoController.cadastrar( req, res, next )

            expect(res.json).toHaveBeenCalledWith({ erro: 'O campo \"nome\" é obrigatório' })
            expect(res.status).toHaveBeenCalledWith(400)
        })

        it('Tamanho minimo invalido', async () => {
            req.body = { ...dadosDeCadastro, nome: 'No' }

            await ValidacaoController.cadastrar( req, res, next )

            expect(res.json).toHaveBeenCalledWith({ erro: 'O campo \"nome\" deve ter pelo menos 3 caracteres' })
            expect(res.status).toHaveBeenCalledWith(400)
        })

        it('Tamanho maximo invalido', async () => {
            req.body = { ...dadosDeCadastro, nome: 'Nome de usuario muito grande' }

            await ValidacaoController.cadastrar( req, res, next )

            expect(res.json).toHaveBeenCalledWith({ erro: 'O campo \"nome\" não pode ter mais de 20 caracteres' })
            expect(res.status).toHaveBeenCalledWith(400)
        })

    })

})