const menuDeAdicionarHTML = document.querySelector('#btnMenuAdicionar');
const btnAbrirFecharMenuAdicionarHTML = document.querySelector('#btnAbrirFecharMenuAdicionar');
const btnAdicionarContatoHTML = document.querySelector('#btnAdicionarContato')
const btnCriarGrupoHTML = document.querySelector('#btnCriarGrupo')

btnAbrirFecharMenuAdicionarHTML.addEventListener('click', abrirFecharMenuAdicionar)
btnAdicionarContatoHTML.addEventListener('click', adicionarContato)
btnCriarGrupoHTML.addEventListener('click', criarGrupo)

function abrirFecharMenuAdicionar() {
    menuDeAdicionarHTML.classList.toggle('btn-menu-adicionar--fechado')
}

function adicionarContato() {

}

function criarGrupo() {

}

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