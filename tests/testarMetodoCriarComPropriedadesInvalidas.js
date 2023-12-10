module.exports = function testarMetodoCriarComPropriedadesInvalidas( Service, dadosCorretos, dadosInvalidos, finalDaMensagem ) {
    return Object.entries(dadosInvalidos).map( async ([ propriedade, valorInvalido ]) => {
        const dadosComErro = { ...dadosCorretos, [propriedade]: valorInvalido }

        await expect( async () => await Service.criar(dadosComErro) )
        .rejects.toThrow({ statusCode: 400, message: `A propriedade ${propriedade} ${finalDaMensagem}` })
    })
}