module.exports = function testarMetodoCriarComPropriedadesInvalidas( Model, dadosCorretos, dadosInvalidos, finalDaMensagem ) {
    return Object.entries(dadosInvalidos).map( async ([ propriedade, valorInvalido ]) => {
        const dadosComErro = { ...dadosCorretos, [propriedade]: valorInvalido }

        await expect( async () => await Model.criar(dadosComErro) )
        .rejects.toThrow(`A propriedade ${propriedade} ${finalDaMensagem}`)
    })
}