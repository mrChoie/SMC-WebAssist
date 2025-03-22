import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import openLogin from '../public/js/script.js'
dotenv.config();

const checkCookie = async (req, res, next) => {
    // const token = req.headers.cookie && req.headers.cookie.split('=')
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const token = cookies;
    const lvl = cookies.lvl;
    // console.log("Token:", lvl)
    // 20 = not logged in, display sign-in div
    // 21 = logged in, display profile div
    if (cookies.token==null){
        res.json({token, message: "User is not logged in", statusCode:20 });
        // next(json({message: "User is not logged in", statusCode:'20'}))
        // res.json({token})
    } else {
        res.json({cookies, lvl, message: "User is logged in", statusCode:21 });
        // next(json({message: "User is logged in", statusCode:'21'}))
        // res.json({token})
        
    }
    // try {
    //     if (token == null) return next().res.json({statusCode:'20'})
    //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    //         next().res.json({statusCode:'21'})
            
    //     })
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).send("Internal Server Error")
    // }
}

export default checkCookie
// export default 