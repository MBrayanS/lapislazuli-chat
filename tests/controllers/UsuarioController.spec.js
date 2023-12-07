require('dotenv').config()

const ErroCustomizado = require('../../src/errors/ErroCustomizado')

const UsuarioController = require("../../src/controllers/UsuarioController")
const mockUsuarioService = { criar: jest.fn() }
const usuarioController = UsuarioController(mockUsuarioService)

const res = { status: jest.fn().mockReturnThis(), sendStatus: jest.fn(), json: jest.fn() }
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
    describe('Tratamento de erros', () => {
        
        it('Erro esperado', async () => {
            const erro = new ErroCustomizado(400, 'O campo email é obrigatório')
    
            const mockUsuarioService = { criar: jest.fn().mockRejectedValue(erro) }
            const usuarioController = UsuarioController(mockUsuarioService)
    
            await usuarioController.cadastrar(req, res)
        
            expect(res.json).toHaveBeenCalledWith({ mensagemDeErro: 'O campo email é obrigatório' })
            expect(res.status).toHaveBeenCalledWith(400)
        })
    
        it('Erro inesperado', async () => {
            const mockUsuarioService = { criar: () =>  uu + 5 }
            const usuarioController = UsuarioController(mockUsuarioService)

            process.env.LOG_DE_ERROS = 'false'

            await usuarioController.cadastrar(req, res)

            process.env.LOG_DE_ERROS = 'true'
        
            expect(res.json).toHaveBeenCalledWith({ mensagemDeErro: 'Erro interno do servidor' })
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })

})