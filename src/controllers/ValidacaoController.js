const ErroCustomizado = require('../errors/ErroCustomizado')

const Joi = require("joi")
const tratarErrosDeControllers = require('../errors/tratarErrosDeControllers')

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
                    .required(),
                cor: Joi.alternatives().try( 
                        Joi.string().pattern(/^#([0-9A-Fa-f]{3}){1,2}$/),
                        Joi.string().pattern(/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/)
                    ).messages({ 'alternatives.match': 'Este valor para cor não é suportado' }).required()
            })
            
            const dadosDeCadastro = req.body
            const { error } = schema.validate(dadosDeCadastro, options)

            if( error ) throw new ErroCustomizado(400, error.message)
            next()
        }
        
        catch( erro ) { tratarErrosDeControllers(erro, res) }
    }

    return {
        cadastrar
    }
}

module.exports = ValidacaoController()