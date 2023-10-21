const app = require('./app')
const rotas = require('./src/rotas')
const PORT = 3000

rotas(app)

app.listen(PORT, () => console.log('No ar na porta ' + PORT))