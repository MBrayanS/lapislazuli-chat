const UsuarioServiceFactory = require('../../../src/services/UsuarioService')
const RepositoryInMemory = require('../../../src/repository/RepositoryInMemory')

const UsuarioRepository = RepositoryInMemory()
const UsuarioService = UsuarioServiceFactory(UsuarioRepository)

const dadosDoUsuario = {
    nome: 'Usuario teste',
    email: 'usuario@teste',
    senha: '12345678'
}

describe('Testando o UsuarioService ao', () => {

    afterEach( () => UsuarioRepository.limparTodosOsRegistros() )

    describe('Criar novo usuario', () => {

        it('com sucesso', async () => {
            const novoUsuario = await UsuarioService.criar(dadosDoUsuario)
    
            expect(novoUsuario).toMatchObject(dadosDoUsuario)
        })

        it('com erro de email duplicado', async () => {
            const UsuarioRepositoryMock = { criar: jest.fn().mockRejectedValue({ tipo: 'Violação única', campo: 'email' }) }
            const UsuarioServiceMock = UsuarioServiceFactory(UsuarioRepositoryMock)

            const funcaoComErro = async () => await UsuarioServiceMock.criar(dadosDoUsuario)

            await expect(funcaoComErro).rejects.toEqual({ statusCode: 400, message: 'Este email já esta em uso' })
        })

    })

    describe('Encontrar usuário', () => {

        it('com sucesso', async () => {
            const novoUsuario = await UsuarioService.criar(dadosDoUsuario)
            const usuarioEncontrado = await UsuarioService.encontrar({ email: 'usuario@teste', senha: '12345678' })
        
            expect(novoUsuario).toEqual(usuarioEncontrado)
        })

        it('com erro de Usuário não encontrado', async () => {
            const funcaoComErro = async () => await UsuarioService.encontrar({ email: 'usuario@teste', senha: '12345678' })
        
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 404, message: 'Usuário não encontrado' })
        })

    })

    describe('Apagar usuário', () => {

        it('com sucesso', async () => {
            const novoUsuario = await UsuarioService.criar(dadosDoUsuario)
            const resposta = await UsuarioService.apagarPorId(novoUsuario.id)
    
            expect(resposta).toBeTruthy()
        })

        it('com erro de apagar um usuario que não existe', async () => {
            const funcaoComErro = async () => await UsuarioService.apagarPorId(0)
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 400, message: 'Esse usuário não existe' })
        })

    })

})