import express from 'express';
import { getTime, getClient } from '../utils/getTime.js'
const privateRoute = express();

privateRoute.get("/feedback", async (req, res) => {
    const cookies = req.headers.cookie
    console.log('[Router-Logger]::',getTime(),'>> feedback page loaded by client:',getClient(cookies))
    res.render('feedback.ejs')
})
privateRoute.get("/category", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> category page loaded by client:",getClient(cookies))
    res.render('categories.ejs')
})
privateRoute.get("/account", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> account page loaded by client:",getClient(cookies))
    res.render('account.ejs')
})
privateRoute.get("/account/settings", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> account settings page loaded by client:",getClient(cookies))
    res.render('settings.ejs')
})
privateRoute.get("/dashboard", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> dashboard page loaded by client:",getClient(cookies))
    res.render('dashboard.ejs') 
})
privateRoute.get("/ticket-form", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> ticket-form page loaded by client:",getClient(cookies))
    res.render('ticketForm.ejs')
})
privateRoute.get("/admin/view-tickets", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> admin tickets page loaded by client:",getClient(cookies))
    res.render('adminticketsv2.ejs')
})
privateRoute.get("/admin/view-tickets-v1", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> admin tickets page loaded by client:",getClient(cookies))
    res.render('admintickets.ejs')
})
privateRoute.get("/admin/view-tickets-v2", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> admin tickets page loaded by client:",getClient(cookies))
    res.render('adminticketsv2.ejs')
})
privateRoute.get("/admin/view-feedback", async (req, res) => {
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> view feedback page loaded by client:",getClient(cookies))
    res.render('adminfeedback.ejs')
})
privateRoute.get("/view-ticket/ticket", async (req, res) =>{
    const cookies = req.headers.cookie
    console.log("[Router-Logger]::",getTime(),">> view ticket page loaded by client:",getClient(cookies))
    res.render('viewticket.ejs')
})
export default privateRoute;