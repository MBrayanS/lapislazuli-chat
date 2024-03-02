const express = require('express')
const cookieParser = require('cookie-parser')
const { createServer } = require('http')
const { Server: socketServer } = require('socket.io')
const path = require('path')

const PORT = process.env.PORT || 3000

const rotas = require('./routes/rotas.js')

const conectarBancoDeDados = require('./database/conectarBancoDeDados.js')

function aplicacao() {
    const app = express()
    const httpServer = createServer(app)

    async function configurarAplicacao() {
        await conectarBancoDeDados()

        configurarExpress()
        configurarCookies()
        configurarEjs()
        inicializarSockectIo()
        configurarRotas()
    }

    async function rodarAplicacao() {
        await configurarAplicacao()

        httpServer.listen(PORT, () => console.log('No ar na porta ' + PORT))
    }

    function configurarExpress() {
        app.use(express.static('public'))
        app.use(express.json())
    }

    function configurarCookies() {
        app.use(cookieParser())
    }

    function configurarEjs() {
        app.set('view engine', 'ejs')
        app.set('views', path.resolve() + '/src/app/pages')
    }

    function inicializarSockectIo() {
        const socketIo = new socketServer(httpServer)

        return socketIo
    }

    function configurarRotas() {
        app.use(rotas)
    }

    return {
        rodarAplicacao,
        inicializarSockectIo
    }
}

module.exports = aplicacao()