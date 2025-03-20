import express from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import dotenv from 'dotenv';
import {getCategoryById, getUserByID, getUsers, getUserbyName, checkDuplicateUser, createUser, updateUser, getTicket } from '../model/database.js';
dotenv.config();
const user = express();
user.use(express.json());
user.use(express.urlencoded({ extended: false }));

user.post('/', async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const category = req.body.category; // Get `?username=value` from URL
    
    const uid = cookieObject.uid

    if (category!=0){
        const categoryTitle = await getCategoryById(category)
        const user = await getUserByID(uid)
        delete user.password
        res.json({user, categoryTitle})
    } else {
        const user = await getUserByID(uid)
        delete user.password
        res.json({user})
    }
})

user.post('/login', async (req, res) => {
    const {userName , userPass} = req.body
    const user = await getUserbyName(userName)
    
    if (!user) {
        res.json({ message: "User does not exist", statusCode:'01' });

    } else if (userName == user.username) {

        if (userPass == user.password){
            // console.log("Matching :", userName, userPass)
            // console.log("to:", user.username, user.password)
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            delete user.password
            // console.log(user)
            res.cookie('token', token, {httpOnly: true,})
            res.cookie('user', user.username)
            res.cookie('uid', user.uid)
            res.json({user, message: "Login Successful", statusCode:'11'})
            // res.json({ user: user, message: "Login Successful", statusCode:'11'});
        } else {
            res.json({ message: "Invalid Password", statusCode:'02' });
            // res.render('signin.ejs', {
            //     returnStatement: "Invalid Password"
            // })
            
        }
    } else {
        res.status(400)
        // res.render('signin.ejs', {
        //     returnStatement: "User does not exist"
        // })
    }
    console.log("Login form input:", userName, userPass)
    // next();
    // res.render('home.ejs',{
    //     loginStatus : 1,
    //     profile : "Profile",
    //     sign_in : "Sign in"
    // })
    
});

user.post('/register', async (req, res) => {
    const {userName, userStudId, userPass} = req.body;
    const user = await checkDuplicateUser(userName, userStudId, userPass);
    if (!user) {
        res.status(201).redirect('/smc-webassist/login')
    } else {
        res.status(409).redirect('/smc-webassist/signin')
    }
});

user.get('/logout', async (req, res) =>{
    res.clearCookie('token',  { path: '/' })
    res.clearCookie('uid',  { path: '/' })
    res.clearCookie('user',  { path: '/' }).redirect('/smc-webassist/home')
})



export default user;