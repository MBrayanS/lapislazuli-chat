function PaginasMiddlewares() {

    function principal( req, res ) {
        res.render('home')
    }

    function login( req, res ) {
        res.render('login')
    }

    function cadastrar( req, res ) {
        res.render('cadastrar')
    }

    function confirmarEmail( req, res ) {
        res.render('confirmarEmail')
    }

    function redefinirSenha( req, res ) {
        res.render('redefinirSenha')
    }

    return {
        principal,
        login,
        cadastrar,
        confirmarEmail,
        redefinirSenha
    }
}

module.exports = PaginasMiddlewares()