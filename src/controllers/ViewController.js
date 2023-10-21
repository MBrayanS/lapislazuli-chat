function ViewController() {
    function home( req, res ) {
        try { res.sendFile('home.html') }

        catch( excecao ) {
            res.sendStus(404)
            console.log(excecao)
        }
    }

    return { home }
}

module.exports = ViewController()