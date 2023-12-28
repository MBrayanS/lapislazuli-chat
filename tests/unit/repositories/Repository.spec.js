const UsuarioEntity = require('../../../src/models/UsuarioEntity');
const { UsuarioRepository } = require('../../../src/modules/RepositoriesModule')

describe('Testando o Repository ao', () => {

    const dadosDoUsuario = { nome: 'Usuario teste', senha: '12345678', email: 'usuario@teste' }
    const { email, senha } = dadosDoUsuario

    describe('Criar novo registro', () => {
        
        it('com sucesso', async () => {
            const novoUsuario = await UsuarioRepository.criar(dadosDoUsuario)
    
            expect(novoUsuario).toMatchObject(dadosDoUsuario)
            expect(novoUsuario).toBeInstanceOf(UsuarioEntity)
    
            await UsuarioEntity.destroy({ where: { email: dadosDoUsuario.email } })
        })
    
        it('com erro de violação única', async () => {
            await UsuarioRepository.criar(dadosDoUsuario)

            const funcaoComErro = async () => await UsuarioRepository.criar(dadosDoUsuario)
    
            await expect(funcaoComErro).rejects.toEqual({ tipo: 'Violação única', campo: 'email' })
    
            await UsuarioEntity.destroy({ where: { email: dadosDoUsuario.email } })
        })

    })

    it('Pegar registro com sucesso', async () => {
        const novoUsuario = await UsuarioRepository.criar(dadosDoUsuario)
        const usuarioSalvo = await UsuarioRepository.pegar({ email, senha })

        expect(usuarioSalvo.id).toEqual(novoUsuario.id)

        await UsuarioEntity.destroy({ where: { email: dadosDoUsuario.email } })
    })

    it('Pegar todos os registros com sucesso', async () => {
        await UsuarioRepository.criar({ ...dadosDoUsuario, email: 'usuario@teste1' })
        await UsuarioRepository.criar({ ...dadosDoUsuario, email: 'usuario@teste2' })

        const usuariosSalvos = await UsuarioRepository.pegarTodos({ nome: dadosDoUsuario.nome })

        expect(usuariosSalvos[0]).toMatchObject({ ...dadosDoUsuario, email: 'usuario@teste1' })
        expect(usuariosSalvos[1]).toMatchObject({ ...dadosDoUsuario, email: 'usuario@teste2' })

        await UsuarioEntity.destroy({ where: { email: 'usuario@teste1' } })
        await UsuarioEntity.destroy({ where: { email: 'usuario@teste2' } }) 
    })

    it('Apagar registro com sucesso', async () => {
        const novoUsuario = await UsuarioRepository.criar(dadosDoUsuario)
        const { id } = novoUsuario

        await UsuarioRepository.apagar({ id })
        const usuarioSalvo = await UsuarioRepository.pegar({ id })
        
        expect(usuarioSalvo).toBe(null)
    })

})