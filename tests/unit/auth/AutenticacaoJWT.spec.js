const AutenticacaoJWT = require('../../../src/auth/AutenticacaoJWT')

describe('Testando o AutenticacaoJWT ao', () => {
    const idTeste = 'id_teste'

    describe('Criar token', () => {

        it('com sucesso', () => {
            const payload = { id: idTeste }
            const token = AutenticacaoJWT.criarToken(payload)

            expect(token).toBeTruthy()
        })

        it('com erro de payload não fornecido', async () => {
            const funcaoComErro = async () => AutenticacaoJWT.criarToken()
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 401, message: 'O payload não foi fornecido' })
        })

        it('com erro de payload invalido', async () => {
            const funcaoComErro = async () => AutenticacaoJWT.criarToken('string')
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 401, message: 'O payload deve ser um objeto' })
        })

    })

    describe('Validar token', () => {

        it('com sucesso', () => {
            const payload = { id: idTeste }
            const token = AutenticacaoJWT.criarToken(payload)
            const { id } = AutenticacaoJWT.validarToken(token)
    
            expect(id).toEqual(idTeste)
        })

        it('com erro de token não fornecido', async () => {
            const funcaoComErro = async () => AutenticacaoJWT.validarToken()
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 401, message: 'O token não foi fornecido' })
        })

        it('com erro de token invalido', async () => {
            const tokenInvalido = 'eyJhbGciOiJIUzI1NiIsInR5cC6IkpXVCJ9.eyJpZCI6ImlkX3Rlg3RlIiwiaWF0IjoxNzAyMTcwNDg1fQ.wgCjPbq6EnZKlj2YOFZGYfylhOepCD5_vP8Rtz6XhIU'
            const funcaoComErro = async () => AutenticacaoJWT.validarToken(tokenInvalido)
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 401, message: 'O token é invalido' })
        })

        it('com erro de token mal formado', async () => {
            const tokenInvalido = 'eyJhbGciOiJ'
            const funcaoComErro = async () => AutenticacaoJWT.validarToken(tokenInvalido)
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 401, message: 'O token é invalido' })
        })
    
        it('com erro de token expirado', async () => {
            const tokenExpirado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkLXRlc3RlIiwiaWF0IjoxNzAxOTkzMjU4LCJleHAiOjE3MDE5OTMzMTh9.jQFuuC9rT1ewPk9x5qFknMQ1G99ACvO7AA96Qa7r4jc'
            const funcaoComErro = async () => AutenticacaoJWT.validarToken(tokenExpirado)
    
            await expect(funcaoComErro).rejects.toEqual({ statusCode: 401, message: 'O token expirou' })
        })

    })

})