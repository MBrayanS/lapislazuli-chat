function RepositoryInMemory() {
    let registros = []

    async function criar( dados ) {
        const registro = { id: registros.length, ...dados }

        registros.push(registro)

        return registros[registros.length-1]
    }
    
    async function pegar( dados ) {
        return registros.find( registro => {
           const propriedades = Object.keys(dados)

           return propriedades.every( propriedade => dados[propriedade] == registro[propriedade] )
        })
    }

    async function pegarTodos( dados ) {
        return registros.filter( registro => {
           const propriedades = Object.keys(dados)

           return propriedades.every( propriedade => dados[propriedade] == registro[propriedade] )
        })
    }

    async function apagar( dados ) {
        const registroADeletar = await pegar(dados)

        if( !registroADeletar ) return false

        registros = registros.filter( registro => registro !== registroADeletar )

        return true
    }

    function pegarTodosOsRegistros() { return registros }
    function limparTodosOsRegistros() { registros = [] }

    return {
        criar,
        pegar,
        pegarTodos,
        apagar,
        pegarTodosOsRegistros,
        limparTodosOsRegistros
    }
}

module.exports = RepositoryInMemory