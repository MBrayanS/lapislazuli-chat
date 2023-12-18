const ValidacaoController = require("../../../src/controllers/ValidacaoController")

const dadosDeUsuario = {
    nome: 'Nome de usuario',
    email: 'usuario@teste.com',
    senha: 'Senha12!'
}

const Response = { status: jest.fn().mockReturnThis(), json: jest.fn() }
const Resquest = { body: dadosDeUsuario }
const next = jest.fn()

describe('Testando o ValidacaoController ao', () => {

    afterEach( () => {
        Response.status.mockClear()
        Response.json.mockClear()
        Resquest.body = dadosDeUsuario
    })

    describe('Validar dados para cadastro', () => {

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

    it('Gerar erro de email inválido', async () => {
        Resquest.body = { ...dadosDeUsuario, email: 'usuario'}

        ValidacaoController.cadastrar( Resquest, Response )

        expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'O campo email não está válido' })
        expect(Response.status).toHaveBeenCalledWith(400)
    })

    it('Gerar erro de senha inválida', async () => {
        Resquest.body = { ...dadosDeUsuario, senha: '12345678'}

        ValidacaoController.cadastrar( Resquest, Response )

        expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'A senha deve conter pelo menos um número e um caractere especial' })
        expect(Response.status).toHaveBeenCalledWith(400)
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