import express from 'express'
import { submitFeedback, getFeedbacks } from '../model/database.js'
import { getTime } from '../utils/getTime.js'
const feedb = express()
feedb.use(express.json());
feedb.use(express.urlencoded({ extended: false }));

feedb.get('/', async (req, res) => {
    const feedbacks = await getFeedbacks()
    const numOfFeeds = feedbacks.length
    res.json({feedbacks, numOfFeeds})
})

feedb.post('/submit/feedback', async (req, res) => {
    const {title, desc, file} = req.body
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    )
    const client = cookieObject.user
    const uid = cookieObject.uid
    
    const feedback = await submitFeedback(uid, title, desc, file)
    console.log("[Server-Logger]::",getTime(),">> client with a username [",client,"] submitted a feedback")
    res.json({feedback, message: "Feedback has been submitted!", statusCode:'30' });
})

export default feedb