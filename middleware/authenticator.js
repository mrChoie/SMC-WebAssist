import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import openLogin from '../public/js/script.js'
dotenv.config();

// const checkCookie = async (req, res, next) => {
//     const token = req.headers.cookie && req.headers.cookie.split('=')[1]
//     console.log("Token: ", token)
//     // 20 = not logged in, display sign-in div
//     // 21 = logged in, display profile div
//     try {
//         if (token == null) return res.json({statusCode:'20'})
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
//             if (err) return res.json({statusCode:'21'})
//             next()
//         })
//     } catch (err) {
//         console.log(err)
//         res.status(500).send("Internal Server Error")
//     }
// }

const auth = async (req, res, next) => {
    const clientCookies = req.headers.cookie
    if (clientCookies == null) return res.status(401).redirect('/smc-webassist/signin')
    // && req.headers.cookie.split('=')[1]
    // const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const token = cookieObject.token
    const userToken = cookieObject.user

    // console.log("Token: ", token)
    // console.log("\n\nuser: ", userToken)
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
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if (token == null) return res.status(401).redirect('/smc-webassist/signin')
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    //     if (err) return res.status(403).redirect('/smc-webassist/signin')
    //     console.log("---------------------",token)
    //     req.body.token = token
    //     next()
    // })

    // const token = req.cookies.token
    // if (token == null) return res.status(401).redirect('/smc-webassist/signin')
    //     const checkedToken = await verifyToken(token, (err) => {
    //     if (err) return res.status(403).redirect('/smc-webassist/signin')
    //     console.log("---------------------",checkedToken)
    //     req.body.checkedToken = checkedToken
    //     next()
    // })
    // var loginStatus=0;

    
    // if (loginStatus) {
    //     // res.
    //     // res.render('home.ejs', {loginStatus})
        
    //     // return res.status(401).send("No cookie found");
    // } else {
    //     next()
    // }
    // return res.status(400).send("cookie found");
    
    // const username = req.body.name;
    // const password = req.body.password;

    // const hashedPass = bcrypt.hash( password, 12)
    // const userToken = jwt.sign( username, process.env.ACCESS_TOKEN_SECRET);
    // res.cookie('token', userToken, {
    //     httpOnly: true,
    // });
    // res.send({ 'User Token': userToken, 'Hashed Password': hashedPass})
}







// const app = express();
// app.use(express.json());

// app.post('/test', async (req, res) => {
//     const username = req.body.name;
//     const password = req.body.password;

//     const hashedPass = await bcrypt.hash( password, 12)
//     const userToken = jwt.sign( username, process.env.ACCESS_TOKEN_SECRET);
//     res.cookie('token', userToken, {
//         httpOnly: true,
//     });
//     res.send({ 'User Token': userToken, 'Hashed Password': hashedPass})
    
// })
export default auth
// export default 