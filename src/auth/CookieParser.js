function CookieParser() {
    function enviarCookieComToken( token, res ) { res.cookie( 'token', token, { httpOnly: true } ) }

    return {
        enviarCookieComToken
    }
}

module.exports = CookieParser()