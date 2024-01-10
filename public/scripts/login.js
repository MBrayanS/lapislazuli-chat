const formulario = document.querySelector('form')

formulario.addEventListener('submit', coletarDadosDeLogin)

function coletarDadosDeLogin( evento ) {
    evento.preventDefault()

    const { emailInput, senhaInput } = formulario

    const dadosDoFormulario = {
        email: emailInput.value,
        senha: senhaInput.value,
    }

    const rota = window.location.origin + '/api/logar'

    requisicaoPost(rota, dadosDoFormulario)
}