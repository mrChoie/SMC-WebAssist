import express from 'express';
// import connection from '../model/database.js';
// import checkCookie from '../middleware/checkCookieOnLoad.js';
import publicRoute from '../routes/publicRoute.js';
import user from './userHandler.js';
import auth from '../middleware/authenticator.js';
import admin from '../middleware/adminAuth.js'
import feedb from './feedbackHandler.js';
import privateRoute from "../routes/privateRoute.js";
import db from './ticketHandler.js';
import msg from './messageHandler.js';

const app = express();
// app.engine("html", ejs.renderFile);
// app.set('view engine', 'html');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    // console.log("[Router-Logger]::",getTime(),">> homepage page loaded to client")
    res.render('index.ejs')
})
// app.use('/',(req, res) => {
//     res.render('home.ejs')
// })
app.get('/checkCookie', async (req, res) => {
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const token = cookies;
    const lvl = cookies.lvl;
    
    if (cookies.token==null){
        res.json({token, message: "User is not logged in", statusCode:20 });
    } else {
        res.json({cookies, lvl, message: "User is logged in", statusCode:21 });
    }
});
app.use('/getTickets',auth, db);
app.use('/getATicket',auth, db);
app.use('/getInfo',auth, user);
app.use('/msg', msg);
app.use('/smc-webassist', publicRoute);
// app.use(auth)
// app.use('/smc-webassist', auth);
app.use('/smc-webassist/admin', admin);
app.use('/smc-webassist', user, auth, privateRoute)
app.use('/smc-webassist', db)
app.use('/smc-webassist', feedb);


// app.post('/smc-webassist/auth/register', async (req, res) => {
//     console.log("Registering user");
//     const { userName, userStudId, userPass } = req.body;
//     // const [user] = (userName, userStudId, userPass);
//     console.log({
//         userName,
//         userStudId,
//         userPass
//     });
//     res.status(201).send(req.body);
// });

// Writing error handlers
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Something broke! Error: ${err.message}`);
});

app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});