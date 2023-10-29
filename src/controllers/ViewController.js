function ViewController() {
    function home( req, res ) {
        try { res.render('home') }

        catch( excecao ) {
            res.sendStatus(404)
            console.log(excecao)
        }
    }

    function login( req, res ) {
        try { res.render('login') }

        catch( excecao ) {
            res.sendStus(404)
            console.log(excecao)
        }
    }

    function cadastrar( req, res ) {
        try { res.render('cadastrar') }

        catch( excecao ) {
            res.sendStus(404)
            console.log(excecao)
        }
    }

    function confirmarEmail( req, res ) {
        try { res.render('confirmarEmail') }

        catch( excecao ) {
            res.sendStus(404)
            console.log(excecao)
        }
    }

    function redefinirSenha( req, res ) {
        try { res.render('redefinirSenha') }

        catch( excecao ) {
            res.sendStus(404)
            console.log(excecao)
        }
    }

    return {
        home,
        login,
        cadastrar,
        confirmarEmail,
        redefinirSenha
    }
}

module.exports = ViewController()