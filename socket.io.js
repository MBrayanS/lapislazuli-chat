const app = require('./app')
const server = require('http').createServer(app)
const socketIo = require('socket.io')

const io = socketIo(server)

io.on('connection', (socket) => {
    console.log('Um usuário conectou')
  
    socket.on('disconnect', () => console.log('Um usuário desconectou') )
})

module.exports = { server, io }