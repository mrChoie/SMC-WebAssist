import express from 'express';
import { getTime } from '../utils/getTime.js'
// import tktCategory from "../middleware/ticketCategorySelect.js"
const privateRoute = express();

// privateRoute.get("/login", async (req, res) => {
    
// })
privateRoute.get("/feedback", async (req, res) => {
    // const time = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + "-[TIME]" + ("0" + d.getHours()).slice(-2) + "_" + ("0" + d.getMinutes()).slice(-2);
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const client = cookieObject.user
    console.log('[Router-Logger]::',getTime(),'>> feedback page loaded by client:',client)
    res.render('feedback.ejs')
})
privateRoute.get("/category", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const client = cookieObject.user
    console.log("[Router-Logger]::",getTime(),">> category page loaded by client:",client)
    res.render('categories.ejs')
})
privateRoute.get("/account", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const client = cookieObject.user
    console.log("[Router-Logger]::",getTime(),">> account page loaded by client:",client)
    res.render('account.ejs')
})
privateRoute.get("/account/settings", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const client = cookieObject.user
    console.log("[Router-Logger]::",getTime(),">> account settings page loaded by client:",client)
    res.render('settings.ejs')
})
privateRoute.get("/dashboard", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const client = cookieObject.user
    console.log("[Router-Logger]::",getTime(),">> dashboard page loaded by client:",client)
    res.render('dashboard.ejs') 
})
privateRoute.get("/ticket-form", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const client = cookieObject.user
    console.log("[Router-Logger]::",getTime(),">> ticket-form page loaded by client:",client)
    res.render('ticketForm.ejs')
})
privateRoute.get("/admin/view-tickets", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const client = cookieObject.user
    console.log("[Router-Logger]::",getTime(),">> admin tickets page loaded by client:",client)
    res.render('admintickets.ejs')
})
privateRoute.get("/view-ticket/ticket", async (req, res) =>{
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const client = cookieObject.user
    console.log("[Router-Logger]::",getTime(),">> view ticket page loaded by client:",client)
    res.render('viewticket.ejs')
})
export default privateRoute;