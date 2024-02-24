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