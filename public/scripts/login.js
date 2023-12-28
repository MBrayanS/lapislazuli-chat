const enviarForm = document.querySelector('form')

enviarForm.addEventListener('submit', enviarRequisicao)

function enviarRequisicao(evento){

  evento.preventDefault()

  const nomeInput = document.getElementById('loginNome');
  const senhaInput = document.getElementById('loginSenha');

  const dadosLogin = {
    nome: nomeInput.value,
    senha: senhaInput.value
  }
  enviarDadosLogin(dadosLogin)
}

function enviarDadosLogin(dados){
  fetch('',{
    method: 'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify(dados)
  })
  .then(response => response.json())
  .then(data =>{
    console.log('Resposta da Requisição', data);
  })
  .catch(error => {
    console.log('Erro na requisição:', error);
  })
}

