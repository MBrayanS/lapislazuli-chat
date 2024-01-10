async function requisicaoPost( rota, dados ) {
    try {
        const init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        }
        
        const requisicao = await fetch(rota, init)
    
        if( requisicao.ok ) return
    
        const { mensagemDeErro } = await requisicao.json()
    
        alert(mensagemDeErro)
    }
    
    catch( erro ) { console.error(erro) }
}