const UsuarioControllerFactory = require("../../../src/controllers/UsuarioController")

const UsuarioServiceMock = {
    criar: jest.fn().mockReturnValue({ id: 'idTeste' }),
    encontrar: jest.fn().mockReturnValue({ id: 'idTeste' })
}

const CookieParserMock = { enviarCookie: jest.fn() }
const AutenticacaoJWTMock = { criarToken: jest.fn() }

const UsuarioController = UsuarioControllerFactory(UsuarioServiceMock, CookieParserMock, AutenticacaoJWTMock)

const Response = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn(), json: jest.fn() }
const Request = { body: {} }

describe('Testando o UsuarioController ao', () => {

    afterEach( () => {
        Response.status.mockClear()
        Response.sendStatus.mockClear()
        Response.json.mockClear()
    })

    describe('Cadastrar usuário', () => {

        it('com sucesso', async () => {
            await UsuarioController.cadastrar(Request, Response)

            expect(Response.sendStatus).toHaveBeenCalledWith(201)
        })

        it('com erro esperado', async () => {
            const UsuarioServiceMock = { criar: () => { throw { statusCode: 400, message: 'Este email já esta em uso' } } }
            const UsuarioController = UsuarioControllerFactory(UsuarioServiceMock, CookieParserMock, AutenticacaoJWTMock)

            await UsuarioController.cadastrar(Request, Response)
        
            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'Este email já esta em uso' })
            expect(Response.status).toHaveBeenCalledWith(400)
        })

        it('com erro inesperado', async () => {
            const UsuarioServiceMock = { criar: () => { throw new Error('Erro inesperado') } }
            const UsuarioController = UsuarioControllerFactory(UsuarioServiceMock, CookieParserMock, AutenticacaoJWTMock)

            await UsuarioController.cadastrar(Request, Response)
        
            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'Erro interno do servidor' })
            expect(Response.status).toHaveBeenCalledWith(500)
        })

    })
    
    describe('Logar usuário', () => {

        it('com sucesso', async () => {
            await UsuarioController.logar(Request, Response)
    
            expect(Response.sendStatus).toHaveBeenCalledWith(200)
        })

        it('com erro esperado', async () => {
            const UsuarioServiceMock = { encontrar: () => { throw { statusCode: 404, message: 'Usuário não encontrado' } } }
            const UsuarioController = UsuarioControllerFactory(UsuarioServiceMock, CookieParserMock, AutenticacaoJWTMock)

            await UsuarioController.logar(Request, Response)
        
            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'Usuário não encontrado' })
            expect(Response.status).toHaveBeenCalledWith(404)
        })

        it('com erro inesperado', async () => {
            const UsuarioServiceMock = { encontrar: () => { throw new Error('Erro inesperado') } }
            const UsuarioController = UsuarioControllerFactory(UsuarioServiceMock, CookieParserMock, AutenticacaoJWTMock)

            await UsuarioController.logar(Request, Response)
        
            expect(Response.json).toHaveBeenCalledWith({ mensagemDeErro: 'Erro interno do servidor' })
            expect(Response.status).toHaveBeenCalledWith(500)
        })
        
    })

})