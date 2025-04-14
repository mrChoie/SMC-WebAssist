import express from 'express'
import { submitFeedback } from '../model/database.js'
const feedb = express()
feedb.use(express.json());
feedb.use(express.urlencoded({ extended: false }));

function getTime(){
    var d = new Date();
    var time = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + "-[TIME]" + ("0" + d.getHours()).slice(-2) + "_" + ("0" + d.getMinutes()).slice(-2);
    return time
}

feedb.post('/submit/feedback', async (req, res) => {
    // console.log("Route hit: /submit/feedback");
    // console.log("Request body:", req.body);
    // console.log("Request cookies:", req.headers.cookie);
    
    const {title, desc, file} = req.body
    const clientCookies = req.headers.cookie
    // console.log(clientCookies, title, desc, file)
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    )
    const client = cookieObject.user
    const uid = cookieObject.uid
    // console.log(uid, title, desc, file)
    
    const feedback = await submitFeedback(uid, title, desc, file)
    console.log("[Server-Logger]::",getTime(),">> client with a username [",client,"] submitted a feedback")
    res.json({feedback, message: "Feedback has been submitted!", statusCode:'30' });
})

export default feedb