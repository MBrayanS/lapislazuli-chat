const { UsuarioRepository } = require('../../../src/modules/RepositoriesModule')

describe('Testando o Repository ao', () => {

    const dadosDoUsuario = { nome: 'Usuario teste', senha: '12345678', email: 'usuario@teste' }
    const { email, senha } = dadosDoUsuario

    afterEach( () => UsuarioRepository.limparTodosOsRegistros() )

    describe('Criar novo registro', () => {
        
        it('com sucesso', async () => {
            const novoUsuario = await UsuarioRepository.criar(dadosDoUsuario)
    
            expect(novoUsuario).toMatchObject(dadosDoUsuario)
        })
    
        it('com erro de violação única', async () => {
            await UsuarioRepository.criar(dadosDoUsuario)

            const funcaoComErro = async () => await UsuarioRepository.criar(dadosDoUsuario)
    
            await expect(funcaoComErro).rejects.toEqual({ tipo: 'Violação única', campo: 'email' })
        })

    })

    it('Pegar registro com sucesso', async () => {
        const novoUsuario = await UsuarioRepository.criar(dadosDoUsuario)
        const usuarioSalvo = await UsuarioRepository.pegar({ email, senha })

        expect(usuarioSalvo.id).toEqual(novoUsuario.id)
    })

    it('Pegar todos os registros com sucesso', async () => {
        await UsuarioRepository.criar({ ...dadosDoUsuario, email: 'usuario@teste1' })
        await UsuarioRepository.criar({ ...dadosDoUsuario, email: 'usuario@teste2' })

        const usuariosSalvos = await UsuarioRepository.pegarTodos({ nome: dadosDoUsuario.nome })

        expect(usuariosSalvos[0]).toMatchObject({ ...dadosDoUsuario, email: 'usuario@teste1' })
        expect(usuariosSalvos[1]).toMatchObject({ ...dadosDoUsuario, email: 'usuario@teste2' })
    })

    it('Apagar registro com sucesso', async () => {
        const novoUsuario = await UsuarioRepository.criar(dadosDoUsuario)
        const { id } = novoUsuario

        await UsuarioRepository.apagar({ id })
        const usuarioSalvo = await UsuarioRepository.pegar({ id })
        
        expect(usuarioSalvo).toBe(null)
    })

})