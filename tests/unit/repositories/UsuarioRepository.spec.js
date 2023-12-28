const { UsuarioRepository } = require('../../../src/modules/RepositoriesModule')

describe('Testando o UsuarioRepository ao', () => {

    const usuariosTestes = {
        lucas: { nome: 'Lucas', email: 'lucas@gmail.com', senha: 'lucas12!' },
        ana: { nome: 'Ana', email: 'ana@gmail.com', senha: 'ana1234!' },
        gabriel: { nome: 'Gabriel', email: 'gabriel@gmail.com', senha: 'gabriel12!' }
    }

    describe('Buscar usuários pelo nome', () => {

        beforeEach( async () => {
            await UsuarioRepository.criar(usuariosTestes.lucas)
            await UsuarioRepository.criar(usuariosTestes.ana)
            await UsuarioRepository.criar(usuariosTestes.gabriel)
        })
        
        afterAll( async () => UsuarioRepository.limparTodosOsRegistros() ) 

        it('com sucesso', async () => {
            const usuariosEncontrados = await UsuarioRepository.buscarPorNome('L')
    
            expect(usuariosEncontrados[0]).toMatchObject(usuariosTestes.lucas)
            expect(usuariosEncontrados[1]).toMatchObject(usuariosTestes.gabriel)
        })

    })

})