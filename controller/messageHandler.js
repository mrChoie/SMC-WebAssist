import express from 'express';
import { getMessages, sendMessage, getUserByID, getTicket } from '../model/database.js';
import { sendReplyNotif } from './mailHandler.js';

const msg = express();

msg.get("/get-messages", async (req, res) => {
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const currTicket = cookies.currticket;
    const messages = await getMessages(currTicket);
    const numOfMessages = messages.length
    if (!messages) {
        return res.status(404).send({ error: "Messages not found" });
    } else {
        
    }
    res.json({messages, numOfMessages})
})

msg.post("/send-message", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    const sender = cookieObject.uid
    const { tktID, content ,email} = req.body;
    const result = await sendMessage(tktID, sender, content);
    const ticket = await getTicket(result.ticket_id)
    if (sender==ticket.uid) {
        console.log("Reply sent by author")
        res.send({result});
    } else {
        console.log("Reply sent by admin, sending notif to author")
        const notif = await sendReplyNotif(email, ticket.tktOwner, ticket.stud_id, ticket.tktSubj)
        res.send({result, notif});
    }
})

export default msg;