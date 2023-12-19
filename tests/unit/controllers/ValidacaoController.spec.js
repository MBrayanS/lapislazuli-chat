const ValidacaoController = require("../../../src/controllers/ValidacaoController")

const dadosDeUsuario = {
    nome: 'Nome de usuario',
    email: 'usuario@teste.com',
    senha: 'Senha12!'
}

const Response = { status: jest.fn().mockReturnThis(), json: jest.fn() }
const Resquest = { body: {} }
const next = jest.fn()

describe('Testando o ValidacaoController ao', () => {

    afterEach( () => {
        Response.status.mockClear()
        Response.json.mockClear()
    })

    describe('Validar dados para cadastro', () => {

        beforeEach( () => Resquest.body = dadosDeUsuario )

        it('com sucesso', () => {
            ValidacaoController.cadastrar( Resquest, Response, next )
    
            expect(next).toHaveBeenCalled()
        })

        it('com erro inesperado', async () => {
            const nextComErro = () => { throw new Error('Erro inesperado') }

            ValidacaoController.cadastrar( Resquest, Response, nextComErro )

            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'Erro interno do servidor' })
            expect(Response.status).toHaveBeenCalledWith(500)
        })

    })

    describe('Validar dados para logar', () => {

        const { email, senha } = dadosDeUsuario
        
        beforeEach( () => Resquest.body = { email, senha } )

        it('com sucesso', () => {
            ValidacaoController.logar( Resquest, Response, next )
    
            expect(next).toHaveBeenCalled()
        })

        it('com erro inesperado', async () => {
            const nextComErro = () => { throw new Error('Erro inesperado') }

            ValidacaoController.logar( Resquest, Response, nextComErro )

            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'Erro interno do servidor' })
            expect(Response.status).toHaveBeenCalledWith(500)
        })

    })

    describe('Gerar erro de email inválido', () => {

        const erroEsperado = { mensagemDeErro: 'O campo email não está válido' }
        const statusEsperado = 400

        beforeEach( () => Resquest.body = { ...dadosDeUsuario, email: 'usuario'} )

        it('com a rota cadastrar', () => {
            ValidacaoController.cadastrar( Resquest, Response )
    
            expect(Response.json).toHaveBeenCalledWith(erroEsperado)
            expect(Response.status).toHaveBeenCalledWith(statusEsperado)
        })

        it('com a rota logar', () => {
            ValidacaoController.logar( Resquest, Response )
    
            expect(Response.json).toHaveBeenCalledWith(erroEsperado)
            expect(Response.status).toHaveBeenCalledWith(statusEsperado)
        })

    })

    describe('Gerar erro de senha inválida', () => {

        const erroEsperado = { mensagemDeErro: 'A senha deve conter pelo menos um número e um caractere especial' }
        const statusEsperado = 400

        beforeEach( () => Resquest.body = { ...dadosDeUsuario, senha: '12345678'} )

        it('com a rota cadastrar', () => {
            ValidacaoController.cadastrar( Resquest, Response )
        
            expect(Response.json).toHaveBeenCalledWith(erroEsperado)
            expect(Response.status).toHaveBeenCalledWith(statusEsperado)
        })

        it('com a rota logar', () => {
            ValidacaoController.logar( Resquest, Response )
        
            expect(Response.json).toHaveBeenCalledWith(erroEsperado)
            expect(Response.status).toHaveBeenCalledWith(statusEsperado)
        })

    })
    
    describe('Gerar erro de campo', () => {

        it('vazio', async () => {
            Resquest.body = {}

            ValidacaoController.cadastrar( Resquest, Response, next )

            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'O campo \"nome\" é obrigatório' })
            expect(Response.status).toHaveBeenCalledWith(400)
        })
        
        it('com tipo inválido', async () => {
            Resquest.body = { nome: {} }

            ValidacaoController.cadastrar( Resquest, Response, next )

            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'O campo \"nome\" deve ser uma string' })
            expect(Response.status).toHaveBeenCalledWith(400)
        })
        
        it('com tamanho mínimo inválido', async () => {
            Resquest.body.nome = 'No'
            
            ValidacaoController.cadastrar( Resquest, Response, next )
    
            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'O campo \"nome\" deve ter pelo menos 3 caracteres' })
            expect(Response.status).toHaveBeenCalledWith(400)
        })
    
        it('com tamanho máximo inválido', async () => {
            Resquest.body.nome = 'Nome de usuario muito grande'
    
            ValidacaoController.cadastrar( Resquest, Response, next )
    
            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'O campo \"nome\" não pode ter mais de 20 caracteres' })
            expect(Response.status).toHaveBeenCalledWith(400)
        })
    })

})