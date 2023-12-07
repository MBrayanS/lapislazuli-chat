require('dotenv').config()

const ErroCustomizado = require('../../src/errors/ErroCustomizado')

const UsuarioController = require("../../src/controllers/UsuarioController")

const mockUsuarioService = {
    criar: jest.fn().mockReturnValue({ id: undefined }),
    pegarPorEmailESenha: jest.fn().mockReturnValue({ id: undefined })
}

const mockCookieParser = { enviarCookie: jest.fn() }
const mockAutenticacaoJWT = { criarToken: jest.fn() }

const usuarioController = UsuarioController(mockUsuarioService, mockCookieParser, mockAutenticacaoJWT)

const res = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn(), json: jest.fn(), cookie: jest.fn() }
const req = { body: {} }

const dadosDeCadastro = {
    nome: 'Nome de usuario',
    email: 'usuario@teste.com',
    senha: 'Senha12!'
}

describe('Testes do controller UsuarioController', () => {
    
    it('Cadastrar usuário com sucesso', async () => {
        req.body = dadosDeCadastro
    
        await usuarioController.cadastrar(req, res)
    
        expect(res.sendStatus).toHaveBeenCalledWith(201)
    })
    
    it('Logar usuário com sucesso', async () => {
        req.body = dadosDeCadastro

        await usuarioController.logar(req, res)

        expect(res.sendStatus).toHaveBeenCalledWith(200)
    })

    describe('Tratamento de erros', () => {
        
        it('Erro esperado', async () => {
            const erro = new ErroCustomizado(400, 'O campo email é obrigatório')
    
            const mockUsuarioService = { criar: jest.fn().mockRejectedValue(erro) }
            const usuarioController = UsuarioController(mockUsuarioService, mockCookieParser, mockAutenticacaoJWT)
    
            await usuarioController.cadastrar(req, res)
        
            expect(res.json).toHaveBeenCalledWith({ mensagemDeErro: 'O campo email é obrigatório' })
            expect(res.status).toHaveBeenCalledWith(400)
        })
    
        it('Erro inesperado', async () => {
            const mockUsuarioService = { criar: () =>  uu + 5 }
            const usuarioController = UsuarioController(mockUsuarioService, mockCookieParser, mockAutenticacaoJWT)

            process.env.LOG_DE_ERROS = 'false'

            await usuarioController.cadastrar(req, res)

            process.env.LOG_DE_ERROS = 'true'
        
            expect(res.json).toHaveBeenCalledWith({ mensagemDeErro: 'Erro interno do servidor' })
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })

})