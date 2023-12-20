function CookieParser() {
    function enviarCookieComToken( token, res ) { res.cookie( 'token', token, { httpOnly: true } ) }

    function pegarCookieComToken( req ) { return req.cookies.token }

    return {
        enviarCookieComToken,
        pegarCookieComToken
    }
}

module.exports = CookieParser()