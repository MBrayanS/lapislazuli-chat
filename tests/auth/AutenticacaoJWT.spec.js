const AutenticacaoJWT = require('../../src/auth/AutenticacaoJWT')

describe('Testes de AutenticacaoJWT', () => {
    const idTeste = 'id_teste'

    describe('Método criarToken', () => {

        it('Sucesso', () => {
            const payload = { id: idTeste }
            const token = AutenticacaoJWT.criarToken(payload)

            expect(token).toBeTruthy()
        })

        it('Payload não fornecido', () => {
            const funcaoComErro = () => AutenticacaoJWT.criarToken()
    
            expect(funcaoComErro).toThrow({ statusCode: 401, message: 'O payload não foi fornecido' })
        })

        it('Payload invalido', () => {
            const funcaoComErro = () => AutenticacaoJWT.criarToken('string')
    
            expect(funcaoComErro).toThrow({ statusCode: 401, message: 'O payload deve ser um objeto' })
        })

    })

    describe('Método validarToken', () => {

        it('Sucesso', () => {
            const payload = { id: idTeste }
            const token = AutenticacaoJWT.criarToken(payload)
            const { id } = AutenticacaoJWT.validarToken(token)
    
            expect(id).toEqual(idTeste)
        })

        it('Token não fornecido', () => {
            const funcaoComErro = () => AutenticacaoJWT.validarToken()
    
            expect(funcaoComErro).toThrow({ statusCode: 401, message: 'O token não foi fornecido' })
        })

        it('Token invalido', () => {
            const tokenInvalido = 'eyJhbGciOiJIUzI1NiIsInR5cC6IkpXVCJ9.eyJpZCI6ImlkX3Rlg3RlIiwiaWF0IjoxNzAyMTcwNDg1fQ.wgCjPbq6EnZKlj2YOFZGYfylhOepCD5_vP8Rtz6XhIU'
            const funcaoComErro = () => AutenticacaoJWT.validarToken(tokenInvalido)
    
            expect(funcaoComErro).toThrow({ statusCode: 401, message: 'O token é invalido' })
        })

        it('Token mal formado', () => {
            const tokenInvalido = 'eyJhbGciOiJ'
            const funcaoComErro = () => AutenticacaoJWT.validarToken(tokenInvalido)
    
            expect(funcaoComErro).toThrow({ statusCode: 401, message: 'O token é invalido' })
        })
    
        it('Token expirado', () => {
            const tokenExpirado = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImlkLXRlc3RlIiwiaWF0IjoxNzAxOTkzMjU4LCJleHAiOjE3MDE5OTMzMTh9.jQFuuC9rT1ewPk9x5qFknMQ1G99ACvO7AA96Qa7r4jc'
            const funcaoComErro = () => AutenticacaoJWT.validarToken(tokenExpirado)
    
            expect(funcaoComErro).toThrow({ statusCode: 401, message: 'O token expirou' })
        })

    })
    
})