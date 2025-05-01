import express from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import dotenv from 'dotenv';
import { getMyTickets, getCategoryById, getUserByID, getTickets, getUserbyName, checkDuplicateUser, createUser, updateUser, getTicket } from '../model/database.js';
import { getTime } from '../utils/getTime.js';
dotenv.config();
const user = express();
user.use(express.json());
user.use(express.urlencoded({ extended: false }));


user.post('/', async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    
    const category = req.body.category;
    const uid = cookieObject.uid

    if (category!=0){
        const categoryTitle = await getCategoryById(category)
        const user = await getUserByID(uid)
        delete user.password
        res.json({user, categoryTitle})
    } else {
        // console.log("logged in")
        const [tickets] = await getMyTickets(uid)
        const user = await getUserByID(uid)
        const numOfTkts = tickets.length
        delete user.password
        res.json({user, tickets, numOfTkts})
    }
})

user.post('/login', async (req, res) => {
    const {userName , userPass} = req.body
    const user = await getUserbyName(userName)
    
    if (!user) {
        res.json({ message: "Account does not exist", statusCode:'01' });

    } else if (userName == user.username) {

        if (userPass == user.password){
            // console.log("Matching :", userName, userPass)
            // console.log("to:", user.username, user.password)
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            delete user.password
            // console.log(user)
            res.cookie('token', token, {
                // httpOnly: true,  // Inaccessible to JavaScript
                // secure: true,    // Only sent over HTTPS (recommended for production)
                maxAge: 60 * 60 * 1000  // 1 hour in milliseconds (60 minutes * 60 seconds * 1000 ms)
            });
            res.cookie('user', user.username, {
                // httpOnly: true,  // Inaccessible to JavaScript
                // secure: true,    // Only sent over HTTPS (recommended for production)
                maxAge: 60 * 60 * 1000  // 1 hour in milliseconds (60 minutes * 60 seconds * 1000 ms)
            });
            res.cookie('uid', user.uid, {
                // httpOnly: true,  // Inaccessible to JavaScript
                // secure: true,    // Only sent over HTTPS (recommended for production)
                maxAge: 60 * 60 * 1000  // 1 hour in milliseconds (60 minutes * 60 seconds * 1000 ms)
            });
            res.cookie('lvl', user.user_level, {
                // httpOnly: true,  // Inaccessible to JavaScript
                // secure: true,    // Only sent over HTTPS (recommended for production)
                maxAge: 60 * 60 * 1000  // 1 hour in milliseconds (60 minutes * 60 seconds * 1000 ms)
            });
            console.log("[Server-Logger]::",getTime(),">> client with a username [",user.username,"] successfully logged in.")
            res.json({user, message: "Login Successful", statusCode:'11'})
            
            // res.json({ user: user, message: "Login Successful", statusCode:'11'});
        } else {
            // console.log("Account did not obtain a cookie")
            console.log("[Server-Logger]::",getTime(),">> client tried to log-in [",user.username,"] with invalid credentials.")
            res.json({ message: "Invalid Password", statusCode:'02' });
            // res.render('signin.ejs', {
            //     returnStatement: "Invalid Password"
            // })
            
        }
    } else {
        res.status(400)
        // res.render('signin.ejs', {
        //     returnStatement: "Account does not exist"
        // })
    }
    // console.log("Login form input:", userName, userPass)
    // next();
    // res.render('home.ejs',{
    //     loginStatus : 1,
    //     profile : "Profile",
    //     sign_in : "Sign in"
    // })
    
});

user.post('/register', async (req, res) => {
    var statusCode
    var {userName, userStudId, userPass, userLevel} = req.body;
    userStudId="xxxx-xxx-xxx"
    if (userLevel==4){
        const user = await checkDuplicateUser(userName, userStudId, userPass, userLevel);
        if (user!=1) {
            statusCode='50'
            res.json({user, message: "Account successfully created", statusCode });
        } else {
            statusCode='51'
            res.json({user, message: "Account already exist", statusCode});
        }
    } else {
        const user = await checkDuplicateUser(userName, userStudId, userPass, '1');
        // console.log(user,"-------------------------")
        if (user!=1) {
            statusCode='50'
            res.json({message: "Account successfully created", statusCode});
        } else {
            statusCode='51'
            // console.log(user,"-------------------------")
            res.json({message: "Account already exist", statusCode});
        }
        // console.log("-------------------------")
    }
    if (statusCode=='50'){
        console.log("[Server-Logger]::",getTime(),">> client registered an account with status code:",statusCode)
    }
});

user.get('/logout', async (req, res) =>{
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    const client = cookieObject.user

    console.log("[Server-Logger]::",getTime(),">> client [",client,"] has logout")
    res.clearCookie('lvl',  { path: '/' })
    res.clearCookie('token',  { path: '/' })
    res.clearCookie('uid',  { path: '/' })
    res.clearCookie('user',  { path: '/' }).redirect('/smc-webassist/home')
})



export default user;