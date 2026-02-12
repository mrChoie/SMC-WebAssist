import express from 'express';
import publicRoute from '../routes/publicRoute.js';
import user from './userHandler.js';
import auth from '../middleware/authenticator.js';
import admin from '../middleware/adminAuth.js'
import feedb from './feedbackHandler.js';
import privateRoute from "../routes/privateRoute.js";
import mailer from "../controller/mailHandler.js";
import db from './ticketHandler.js';
import msg from './messageHandler.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.render('index.ejs')
})
app.get('/checkCookie', async (req, res) => {
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const token = cookies;
    const lvl = cookies.lvl;
    
    if (cookies.token==null){
        console.log("[server.js:26] No token found in cookies.")
        res.json({token, message: "User is not logged in", statusCode:20 });
    } else {
        console.log("[server.js:29] Token found in cookies:", token);
        res.json({cookies, lvl, message: "User is logged in", statusCode:21 });
    }
});
app.use('/reqResetPassword', mailer);
app.use('/getTickets',auth, db);
app.use('/getATicket',auth, db);
app.use('/getInfoByToken', user);
app.use('/getInfo',auth, user);
app.use('/getFeeds',auth, feedb);
app.use('/updateUser', user);
app.use('/msg', msg);
app.use('/smc-webassist', publicRoute);
app.use('/smc-webassist/admin', admin);
app.use('/smc-webassist', user, auth, privateRoute)
app.use('/smc-webassist', db)
app.use('/smc-webassist', feedb);

// Writing error handlers
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something broke! Error: ${err.message}`);
});

app.listen(8080, () => {
    
    // if (status) {
    //     status = false;
    // }
    console.log(`Server is running on port 8080`);
});
