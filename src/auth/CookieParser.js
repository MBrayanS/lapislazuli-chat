function CookieParser() {
    function enviarCookie( token, res ) { res.cookie( 'token', token, { httpOnly: true } ) }

    return {
        enviarCookie
    }
}

module.exports = CookieParser()