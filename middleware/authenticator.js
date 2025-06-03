import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = async (req, res, next) => {
    const clientCookies = req.headers.cookie
    if (clientCookies == null) return res.status(401).redirect('/smc-webassist/signin')
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    const lvl = cookieObject.lvl
    const token = cookieObject.token
    const userToken = cookieObject.user
    try {
        if (token == null) return res.status(401).redirect('/smc-webassist/signin')
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
            if (err) return res.status(403).redirect('/smc-webassist/signin')
            next()
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

export default auth