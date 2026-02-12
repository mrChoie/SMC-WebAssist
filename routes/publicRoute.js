import express from 'express';
import { getTime } from '../utils/getTime.js'
const publicRoute = express.Router();

publicRoute.get("/home", (req, res) => {
    console.log("%c[Public Router-Logger]::","color:#0B",getTime(),">> homepage page loaded to client")
    res.render('home.ejs')
})
publicRoute.get("/about", async (req, res) => {
    console.log("[Public Router-Logger]::",getTime(),">> about page loaded to client")
    res.render('about.ejs')
})
publicRoute.get("/terms-of-service", async (req, res) => {
    console.log("[Public Router-Logger]::",getTime(),">> eula page loaded to client")
    res.render('tos.ejs')
})
publicRoute.get("/signup", async (req, res) => {
    console.log("[Public Router-Logger]::",getTime(),">> sign-up page loaded to client")
    res.render('signup.ejs')
})
publicRoute.get("/signin", async (req, res) => {
    console.log("[Public Router-Logger]::",getTime(),">> sign-in page loaded to client")
    res.render('signin.ejs')
})
publicRoute.get("/reset-password", async (req, res) =>{
    console.log("[Public Router-Logger]::",getTime(),">> Reset password page loaded to client")
    res.render('reset.ejs')
})

export default publicRoute;