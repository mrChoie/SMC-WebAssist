import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import openLogin from '../public/js/script.js'
dotenv.config();

const checkCookie = async (req, res, next) => {
    const token = req.headers.cookie && req.headers.cookie.split('=')[1]
    // console.log("Token:", token)
    // 20 = not logged in, display sign-in div
    // 21 = logged in, display profile div
    if (!token){
        res.json({ message: "User is not logged in", statusCode:'20' });
        // next(json({message: "User is not logged in", statusCode:'20'}))
    } else {
        res.json({ message: "User is logged in", statusCode:'21' });
        // next(json({message: "User is logged in", statusCode:'21'}))
        
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