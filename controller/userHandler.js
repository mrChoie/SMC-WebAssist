import express from 'express';
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser';
import dotenv from 'dotenv';
import { getMyTickets, getCategoryById, getUserByID, getTickets, getUserbyName, checkDuplicateUser, checkDuplicateAdmin, verifyIDinDB, createUser, createAdmin, updateUserPass, getTicket } from '../model/database.js';
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
    console.log(categoryTitle)
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
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    const uid = cookieObject.uid
    console.log(uid)
    const newpass = req.body.userPass
    const result = await updateUserPass(newpass, uid)
    res.send({message: "Password successfully updated"})
})

user.post('/login', async (req, res) => {
    const {userName , userPass} = req.body
    const user = await getUserbyName(userName)
    
    if (!user) {
        res.json({ message: "Account does not exist", statusCode:'01' });

    } else if (userName == user.username) {

        if (userPass == user.password){
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            delete user.password
            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000
            });
            res.cookie('user', user.username, {
                maxAge: 60 * 60 * 1000
            });
            res.cookie('uid', user.uid, {
                maxAge: 60 * 60 * 1000
            });
            res.cookie('lvl', user.user_level, {
                maxAge: 60 * 60 * 1000
            });
            console.log("[Server-Logger]::",getTime(),">> client with a username [",user.username,"] successfully logged in.")
            res.json({user, message: "Login Successful", statusCode:'11'})
        } else {
            console.log("[Server-Logger]::",getTime(),">> client tried to log-in [",user.username,"] with invalid credentials.")
            res.json({ message: "Invalid Password", statusCode:'02' });
        }
    } else {
        res.json({ message: "Invalid username", statusCode:'03' });
    }
});

function sendResponse(result, statusCode) {
    if (result=='2') {
        statusCode='52'
        return ({message: "Account already registered", statusCode });
    } else {
        statusCode='53'
        return ({message: "Account successfully created", statusCode });
    }
}

user.post('/register', async (req, res) => {
    var statusCode
    const {userName, userStudId, userEmail, userPass} = req.body;
    const token = jwt.sign(userName, process.env.USER_TOKEN_SECRET);

    // const pattern = /^E-[0-1]{1,4}$/;

    // 1 = Student
    // 4 = Engineering
    // 5 = College
    // 6 = Main
    // 7 = Annex
    // 8 = Head Admin

    if (userStudId.startsWith("E-")){
        console.log("ID is an Engineering faculty")
        const result = await checkDuplicateAdmin(userName, userStudId, userEmail, userPass, '4', token);
        if (result=='2') {
            res.json(sendResponse(result, statusCode));
        } else {
            const admin = await createAdmin('Engineering Admin', userStudId, 'Admin')
            res.json(sendResponse(result, statusCode))
        }
    } else if (userStudId.startsWith("C-")) {
        console.log("ID is a College faculty")
        const result = await checkDuplicateAdmin(userName, userStudId, userEmail, userPass, '5', token);
        if (result=='2') {
            res.json(sendResponse(result, statusCode));
        } else {
            const admin = await createAdmin('College Admin', userStudId, 'Admin')
            res.json(sendResponse(result, statusCode))
        }
    } else if (userStudId.startsWith("M-")) {
        console.log("ID is a Main faculty")
        const result = await checkDuplicateAdmin(userName, userStudId, userEmail, userPass, '6', token);
        if (result=='2') {
            res.json(sendResponse(result, statusCode));
        } else {
            const admin = await createAdmin('SMC Main Admin', userStudId, 'Admin')
            res.json(sendResponse(result, statusCode))
        }
    } else if (userStudId.startsWith("A-")) {
        console.log("ID is an Annex faculty")
        const result = await checkDuplicateAdmin(userName, userStudId, userEmail, userPass, '7', token);
        if (result=='2') {
            res.json(sendResponse(result, statusCode));
        } else {
            const admin = await createAdmin('HS Annex Admin', userStudId, 'Admin')
            res.json(sendResponse(result, statusCode))
        }
    } else if (userStudId.startsWith("SMC-")) {
        console.log("ID is an Annex faculty")
        const result = await checkDuplicateAdmin(userName, userStudId, userEmail, userPass, '8', token);
        if (result=='2') {
            res.json(sendResponse(result, statusCode));
        } else {
            const admin = await createAdmin('SMC Head Admin', userStudId, 'Head Admin')
            res.json(sendResponse(result, statusCode))

        }
    } else {
        console.log("ID is a student")
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
        console.log("statusCode: ",statusCode)
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