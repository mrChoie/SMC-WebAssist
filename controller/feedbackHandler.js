import express from 'express'
import { submitFeedback } from '../model/database.js'
const feedb = express()
feedb.use(express.json());
feedb.use(express.urlencoded({ extended: false }));

feedb.post('/submit/feedback', async (req, res) => {
    console.log("Route hit: /submit/feedback");
    console.log("Request body:", req.body);
    console.log("Request cookies:", req.headers.cookie);
    
    const {title, desc, file} = req.body
    const clientCookies = req.headers.cookie
    console.log(clientCookies, title, desc, file)
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    )
    const uid = cookieObject.uid
    console.log(uid, title, desc, file)
    const feedback = await submitFeedback(uid, title, desc, file)
    res.json({feedback, message: "Feedback has been submitted!", statusCode:'30' });
})

export default feedb