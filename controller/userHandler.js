import express from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import dotenv from 'dotenv';
import { getMyTickets, getCategoryById, getUserByID, getTickets, getUserbyName, checkDuplicateUser, verifyIDinDB, createUser, updateUserPass, getTicket } from '../model/database.js';
import { getTime } from '../utils/getTime.js';
dotenv.config();
const user = express();
user.use(express.json());
user.use(express.urlencoded({ extended: false }));


user.post('/category', async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    
    const category = req.body.category;
    const uid = cookieObject.uid

    const categoryTitle = await getCategoryById(category)
    const user = await getUserByID(uid)
    delete user.password
    res.json({user, categoryTitle})
    
})

user.get('/user', async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    
    const uid = cookieObject.uid

    const [tickets] = await getMyTickets(uid)
    const user = await getUserByID(uid)
    const numOfTkts = tickets.length
    delete user.password
    res.json({user, tickets, numOfTkts})
})

// async function verifyToken(){
//     const decoded = jwt.verify(userToken, process.env.USER_RESET_PASS)
//     console.log(decoded)
//     const user = await getUserbyName(userName.username)
//     statusCode = '01'
//     res.json({user, message:"User fetched", statusCode})
// }

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.USER_RESET_PASS);
        console.log('Token is valid:', decoded);
        return { valid: true, expired: false, decoded };
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.warn('Token has expired.');
            return { valid: false, expired: true, decoded: null };
        } else {
            console.error('Token is invalid:', err.message);
            return { valid: false, expired: false, decoded: null };
        }
    }
}

user.post('/Token', async (req, res) => {
    var statusCode = '0'
    const userToken = req.body.token
    console.log("fetching user using token: ",userToken)
    
    const verification = verifyToken(userToken)

    if (verification.valid) {
        console.log("verification success")
        // console.log(verification)
        const user = await getUserbyName(verification.decoded.username)
        statusCode = '01'
        res.cookie('uid', user.uid, {
            // httpOnly: true,  // Inaccessible to JavaScript
            // secure: true,    // Only sent over HTTPS (recommended for production)
            maxAge: 30 * 1000  // 1 hour in milliseconds (60 minutes * 60 seconds * 1000 ms)
        });
        res.json({user, message:"User fetched", statusCode})
    } else if (verification.expired) {
        statusCode = '00'
        res.json({message:"Token expired", statusCode})
    } else {
        statusCode = '03'
        res.json({message:"Token invalid", statusCode})
    }
})

user.post('/update-password', async (req, res) =>{
    // const [uid] = Object.fromEntries(req.headers.cookie.uid)
    // console.log("cookie uid=",uid)
    // console.log(req.headers)
    
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    const uid = cookieObject.uid
    console.log(uid)
    const newpass = req.body.userPass
    const result = await updateUserPass(newpass, uid)
    // res.clearCookie('uid',  { path: '/' })
    res.send({message: "Password successfully updated"})
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
        res.json({ message: "Invalid username", statusCode:'03' });
    }

    // statusCode= '01' = Account does not exist
    // statusCode= '02' = Invalid password
    // statusCode= '03' = Invalid username
    // statusCode= '11' = Login Successful

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
    const {userName, userStudId, userEmail, userPass, userLevel} = req.body;
    const token = jwt.sign(userName, process.env.USER_TOKEN_SECRET);
    if (userLevel==4){
        // const result = await checkDuplicateUser(userName, userStudId, userEmail, userPass, userLevel, token);
        // if (user!=1) {
        //     statusCode='50'
        //     res.json({user, message: "Account successfully created", statusCode });
        // } else {
        //     statusCode='51'
        //     res.json({user, message: "Account already exist", statusCode});
        // }
        if (userStudId=="0000-0-000"){
            const result = await verifyIDinDB(userName, userStudId, userEmail, userPass, userLevel, token);
            console.log("result: ",result)
            if (result=='1') {
                statusCode='51'
                res.json({message: "ID is not a student of SMC", statusCode });
            } else if (result=='2') {
                statusCode='52'
                res.json({message: "Account already registered", statusCode });
            } else {
                statusCode='53'
                res.json({message: "Account successfully created", statusCode });
            }
        } else {
            statusCode='51'
            res.json({message: "Invalid ID", statusCode });
        }
    } else {
        // userLevel=1
        const result = await verifyIDinDB(userName, userStudId, userEmail, userPass, '1', token);
        console.log("result: ",result)
        if (result=='1') {
            statusCode='51'
            res.json({message: "ID is not a student of SMC", statusCode });
        } else if (result=='2') {
            statusCode='52'
            res.json({message: "Account already registered", statusCode });
        } else {
            statusCode='53'
            res.json({message: "Account successfully created", statusCode });
        }
        //     statusCode='50'
        //     res.json({message: "Account successfully created", statusCode});
        // } else {
        //     statusCode='51'
        //     // console.log(user,"-------------------------")
        //     res.json({message: "Account already exist", statusCode});
        // }
        console.log("statusCode: ",statusCode)
    }
    // if (statusCode=='51'){
    //     console.log("[Server-Logger]::",getTime(),">> client tried to register a non-smc ID:",statusCode)
    // } else if (statusCode=='52'){
    //     console.log("[Server-Logger]::",getTime(),">> client tried to register an account with an existing ID:",statusCode)
    // } else {
    //     console.log("[Server-Logger]::",getTime(),">> client successfully registered an account:",statusCode)
    // }
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