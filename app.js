const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

module.exports = app