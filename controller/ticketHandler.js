import express from 'express';
import { getTickets, getTicket, createTicket, updateTicket, getCategories} from '../model/database.js';
import { getTime } from '../utils/getTime.js';

const db = express();

db.post('/', async (req, res) => {
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    // const token = cookies;
    const lvl = cookies.lvl;
    const [tickets] = await getTickets();
    const numOfTkts = tickets.length
    // console.log("number of tickets: ",numOfTkts)
    res.json({tickets, numOfTkts,lvl})
})

db.get("/tickets", async (req, res) => {
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    // const token = cookies;
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
    res.send(tickets,lvl);
});

db.get("/view-ticket/ticket/:id", async (req, res) => {
    // console.log("fetching specified ticket")
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const token = cookies;
    const lvl = cookies.lvl;
    const id = req.params.id;
    res.cookie('currticket', id, {
        // httpOnly: true,  // Inaccessible to JavaScript
        // secure: true,    // Only sent over HTTPS (recommended for production)
        maxAge: 60 * 60 * 1000  // 1 hour in milliseconds (60 minutes * 60 seconds * 1000 ms)
    });
    // console.log(id)
    const ticket = await getTicket(id);
    if (ticket) {
        // console.log("Ticket obtained: ",ticket)
        res.json({ticket, lvl})
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
    const client = cookieObject.user
    console.log("[Server-Logger]::",getTime(),">> client with a username [",client,"] submitted a ticket")
    // console.log(req.body,'\n\n\n', uid)

    const { inqCat, buildCat, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile} = req.body;
    const ticket = await createTicket( uid, inqCat, buildCat, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile);
    res.status(201).json({ticket, message: "Ticket has been submitted", statusCode:'40'})
});

db.post("/ticket/update", async (req, res) => {
    const tktStatus = req.body.tktStatus
    const tktID = req.body.tktID
    const result = await updateTicket(tktID, tktStatus)
    res.json(result)
})

db.get("/categories", async (req, res) => {
    const result = await getCategories()
    res.json(result)
})

export default db;