const formulario = document.querySelector('form')

formulario.addEventListener('submit', coletarDadosDeCadastro)

function coletarDadosDeCadastro( evento ) {
    evento.preventDefault()

    const { nomeInput, emailInput, senhaInput, confirmarSenhaInput } = formulario
    const senhasInvalidas = senhaInput.value !== confirmarSenhaInput.value

    if( senhasInvalidas ) return alert('As senhas devem ser iguais!')

    const dadosDoFormulario = {
        nome: nomeInput.value,
        email: emailInput.value,
        senha: senhaInput.value,
        confirmarSenha: confirmarSenhaInput.value
    }

    const rota = window.location.origin + '/api/cadastrar'

    requisicaoPost(rota, dadosDoFormulario)
}