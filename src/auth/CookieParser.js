function CookieParser() {
    function enviarCookie( token, res ) { res.cookie('token', token) }

    return {
        enviarCookie
    }
}

module.exports = CookieParser()