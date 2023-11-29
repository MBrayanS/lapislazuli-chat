const { server } = require('./socket.io')
const PORT = 3000

const conectarBancoDeDados = require('./src/database/conectarBancoDeDados')

conectarBancoDeDados()
    .then( () => {
        server.listen(PORT, () => console.log('No ar na porta ' + PORT)) 
    })
    
    .catch( erro => {
        console.log('Erro ao conectar banco de dados! \n', erro)
    })