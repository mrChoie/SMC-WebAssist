import express from 'express';
import { getTickets, getTicket, createTicket, updateTicket} from '../model/database.js';

const db = express();

db.post('/', async (req, res) => {
    const [tickets] = await getTickets();
    const numOfTkts = tickets.length
    // console.log("number of tickets: ",numOfTkts)
    res.json({tickets, numOfTkts})
})

db.get("/tickets", async (req, res) => {
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const token = cookies;
    const lvl = cookies.lvl;
    // console.log(lvl)
    try {
        if (lvl != 4) return res.status(401).redirect('/smc-webassist/signin')
            next()
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
    const [tickets] = await getTickets();
    res.send(tickets);
});

db.get("/view-ticket/ticket/:id", async (req, res) => {
    // console.log("fetching specified ticket")
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const token = cookies;
    const lvl = cookies.lvl;
    const id = req.params.id;
    // console.log(id)
    const ticket = await getTicket(id);
    if (ticket) {
        // console.log("Ticket obtained: ",ticket)
        res.json({ticket})
        // next();
        // res.send(ticket);
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