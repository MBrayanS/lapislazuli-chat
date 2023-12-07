const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const rotas = require('./src/routes/rotas')

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

rotas(app)

module.exports = app