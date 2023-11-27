const { server } = require('./socket.io')
const app = require('./app')
const rotas = require('./src/routes/rotas')
const PORT = 3000

rotas(app)

server.listen(PORT, () => console.log('No ar na porta ' + PORT))