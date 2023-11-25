
const enviarForm = document.querySelector('form')

enviarForm.addEventListener('submit', enviarRequisicao)

function enviarRequisicao(evento) {
  
  evento.preventDefault()

  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const confirmarSenhaInput = document.getElementById('confirmarSenha');

  const dadosDoFormulario = {
    nome: nomeInput.value,
    email: emailInput.value,
    senha: senhaInput.value,
    confirmarSenha: confirmarSenhaInput.value
  };

  const senhasValidas = senhaInput.value === confirmarSenhaInput.value

  if(senhasValidas) return console.log(dadosDoFormulario)

  alert('As senhas devem ser iguais!')
}


function enviarDados(dados) {
  fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Resposta da requisição:', data);
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
}
