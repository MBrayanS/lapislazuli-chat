const Joi = require("joi")
const tratarErrosDeControllers = require('../errors/tratarErrosDeControllers')

function ValidacaoController() {
    const mensagensPersonalizadas = {
        'string.base': 'O campo {#label} deve ser uma string',
        'string.min': 'O campo {#label} deve ter pelo menos {#limit} caracteres',
        'string.max': 'O campo {#label} não pode ter mais de {#limit} caracteres',
        'any.required': 'O campo {#label} é obrigatório',
        'string.email' : 'O campo email não está válido',
        'string.empty': 'O campo {#label} não pode estar vazio',
    }

    const options = { messages: mensagensPersonalizadas }

    const regrasDeValidacao = {
        nome: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        senha: Joi.string().min(8).max(20).pattern(/^(?=.*\d)(?=.*[!@#$%^&*])/)
            .message({ 'string.pattern.base': 'A senha deve conter pelo menos um número e um caractere especial' })
            .required()
    }
    
    function validarCamposDeEntrada( camposDeEntrada, regras ) {
        const schema = Joi.object(regras)
    
        const { error } = schema.validate(camposDeEntrada, options)
    
        if( error ) throw { statusCode: 400, message: error.message }
    }

    function cadastrar( req, res, next ) {
        try {
            const camposDeEntrada = req.body
            const { nome, email, senha } = regrasDeValidacao
            
            validarCamposDeEntrada(camposDeEntrada, { nome, email, senha })

            next()
        }
        
        catch( erro ) { tratarErrosDeControllers(erro, res) }
    }

    function logar( req, res, next ) {
        try {
            const camposDeEntrada = req.body
            const { email, senha } = regrasDeValidacao
            
            validarCamposDeEntrada(camposDeEntrada, { email, senha })
    
            next()
        }
        
        catch( erro ) { tratarErrosDeControllers(erro, res) }
    }

    return {
        cadastrar,
        logar
    }
}

module.exports = ValidacaoController()