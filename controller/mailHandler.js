import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { getUserByEmail, getUserByID, getTicket } from '../model/database.js';
dotenv.config()
const mailer = express()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'kyzerhinston@gmail.com',
        pass: process.env.GOOGLE_APP_PASSWORD
    },
});

export async function sendReplyNotif(email, tktOwner, stud_id, tktSubj){
    console.log("sending notification to: ",email)
    transporter.sendMail({
        from: '"SMC Web-Assist" <kyzerhinston@gmail.com>',
        to: email,
        subject: 'Ticket Reply',
        text: `
        Student Information:
        Name: ${tktOwner}
        ID Number: ${stud_id}
        An administrator has sent a reply to your "${tktSubj}" ticket.
        `,
    }).then(()=>{
        console.log("Email Sent!");
        return ({message: "Author has been notified via email"})
    }).catch(()=>{
        console.error(err)
    })
}

mailer.post('/email', async (req, res) => {
    console.log("processing mail...")
    var statusCode
    const email = req.body.email
    const user = await getUserByEmail(email)
    if (!user) {
        statusCode = '00'
        res.json({message: "Email is not registered", statusCode})
    } else {
        const token = jwt.sign({username: user.username}, process.env.USER_RESET_PASS, { expiresIn: '15m' })
        delete user.password
        statusCode = '01'
        transporter.sendMail({
            from: '"SMC Web-Assist" <kyzerhinston@gmail.com>',
            to: email,
            subject: 'Password Reset',
            text: `
            Student Information:
            Name: ${user.username}
            ID Number: ${user.stud_id}
            You have requested to reset your password.
            Click the link below to proceed.\n
            Reset Password Link: 192.168.254.169:8080/smc-webassist/reset-password?token=${token}\n
            If you did not request a reset, disregard this mail.
            `,
        }).then(()=>{
            console.log("Email Sent!");
            res.json({message: "Request link sent!\n Check your email inbox!\nNote: Link will expire in 15 minutes.", statusCode})
        }).catch(()=>{
            console.error(err)
        })
    }
})

export default mailer