import express from 'express';
import { getMessages, sendMessage, getUserByID } from '../model/database.js';

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
    const { tktID, content } = req.body;
    // console.log("Ticket id: ",tktID)
    const result = await sendMessage(tktID, sender, content);
    res.send(result);
})

export default msg;