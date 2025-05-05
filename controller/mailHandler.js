import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { getUserByEmail } from '../model/database.js';
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

mailer.post('/email', async (req, res) => {
    console.log("processing mail...")

    

    var statusCode
    const email = req.body.email
    const user = await getUserByEmail(email)
    console.log(user)

    const token = jwt.sign({username: user.username}, process.env.USER_RESET_PASS, { expiresIn: '15m' })

    delete user.password
    // console.log(user)

    if (!user) {
        statusCode = '01'
        res.json({message: "Email is not registered", statusCode})
    } else {
        statusCode = '02'
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
        }).catch(()=>{
            console.error(err)
        })
    }
})



export default mailer