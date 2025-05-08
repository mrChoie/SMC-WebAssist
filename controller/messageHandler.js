import express from 'express';
import { getMessages, sendMessage, getUserByID, getTicket } from '../model/database.js';
import { sendReplyNotif } from './mailHandler.js';

const msg = express();

msg.get("/get-messages", async (req, res) => {
    const cookies = Object.fromEntries(req.headers.cookie?.split('; ').map(c => c.split('=')) || []);
    const currTicket = cookies.currticket;
    // const tktID = req.params.id;
    // console.log("Ticket id: ",currTicket)
    const messages = await getMessages(currTicket);
    const numOfMessages = messages.length
    // for (var x=0 ; x<numOfMessages ; x++){
    //     messages += await getUserByID(messages[0].sender_id)
    // }
    // const sender = await getUserByID(messages[0].sender_id)
    
    if (!messages) {
        return res.status(404).send({ error: "Messages not found" });
    } else {
        // console.log("message retrieved: ",messages)
    }
    
    // console.log("sender/s: ",sender)
    // res.send(messages);
    res.json({messages, numOfMessages})
})

msg.post("/send-message", async (req, res) => {
    const clientCookies = req.headers.cookie
    const cookieObject = Object.fromEntries(
        clientCookies.split('; ').map(cookie => cookie.split('='))
    );
    const sender = cookieObject.uid
    const { tktID, content ,email} = req.body;
    // console.log("Ticket id: ",tktID
    const result = await sendMessage(tktID, sender, content);
    const ticket = await getTicket(result.ticket_id)
    // console.log("---------------------------------\n",ticket)
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