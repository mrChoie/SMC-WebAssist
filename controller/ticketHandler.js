import express from 'express';
import auth from './userHandler.js';
import { getTickets, getTicket, createTicket, updateTicket} from '../model/database.js';

const db = express();
db.use('/smc-webassist/auth', auth);

db.get("/tickets", async (req, res) => {
    const tickets = await getTickets();
    res.send(tickets);
});

db.get("/ticket/:id", async (req, res) => {
    const id = req.params.id;
    const ticket = await getTicket(id);
    if (ticket) {
        res.send(ticket);
    } else {
        res.status(404).send({ error: "Ticket not found" });
        //res.render("view/404.ejs")
        return;
    }
});

db.post("/ticket/submit", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );

    const uid = cookieObject.uid
    
    // console.log(req.body,'\n\n\n', uid)
    const { categoryId, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile} = req.body;
    const ticket = await createTicket( uid, categoryId, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile);
    res.status(201).json({ticket, message: "Ticket has been submitted", statusCode:'40'})
});



export default db;