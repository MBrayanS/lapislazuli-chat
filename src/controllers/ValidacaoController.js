const Joi = require("joi")

function ValidacaoController() {
    const mensagensPersonalizadas = {
        'string.base': 'O campo {#label} deve ser uma string',
        'string.min': 'O campo {#label} deve ter pelo menos {#limit} caracteres',
        'string.max': 'O campo {#label} não pode ter mais de {#limit} caracteres',
        'any.required': 'O campo {#label} é obrigatório',
        'string.email' : 'O campo email não esta valido'
    }

    const options = { messages: mensagensPersonalizadas }

    async function cadastrar( req, res, next ) {
        try {
            const schema = Joi.object({
                nome: Joi.string().min(3).max(20).required(),
                email: Joi.string().email().required(),
                senha: Joi.string().min(8).max(20).pattern(/^(?=.*\d)(?=.*[!@#$%^&*])/)
                .message({ 'string.pattern.base': 'A senha deve conter pelo menos um número e um caractere especial' })
                .required()
            })
            
            const dadosDeCadastro = req.body
            const { error } = schema.validate(dadosDeCadastro, options)

            if( error ) throw { status: 400, erro: error.message }

            next()
        }
        
        catch( excecao ) {
            if( excecao.status ) return res.status(excecao.status).json({ erro: excecao.erro })

           res.status(500).send(erro)
        }
    }

    return {
        cadastrar
    }
}

module.exports = ValidacaoController()