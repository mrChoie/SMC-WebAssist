// import express from 'express'
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


// export async function verifyToken(token, callback) {
//     const [result] = await getUserbyName(token)
//     if (result) {
//         callback(null)
//     } else {
//         callback("Invalid token")
//     }
//     return result
// }
export async function getMyTickets(uid){
    const [result] = await connection.query(`
        SELECT *, DATE_FORMAT(tktTimestamp, '%M %e, %l:%i %p') AS formatted_time
        FROM tickets
        WHERE tktUID = ?
    `, [uid])
    return [result]
}

export async function getTickets() {
    const [rows] = await connection.query("SELECT *, DATE_FORMAT(tktTimestamp, '%M %e, %l:%i %p') AS formatted_time FROM tickets")
    return [rows]
}

export async function getTicket(tktID){
    const [rows] = await connection.query(`
        SELECT *, DATE_FORMAT(tktTimestamp, '%M %e, %l:%i %p') AS formatted_time
        FROM tickets
        WHERE tktID = ?
        `, [tktID])
    return rows[0]
}

export async function createTicket(tktUID, categoryID, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile) {
    const [result] = await connection.query(`
            INSERT INTO tickets ( tktUID, tktCategoryID, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [tktUID, categoryID, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile])
    const id = result.insertId
    return getTicket(id)
}
// export async function createTicket(categoryID, tktPublisher) {
//     const [result] = await connection.query(`
//         INSERT INTO tickets (categoryID, tktPublisher)
//         VALUES (?, ?)
//         `, [categoryID, tktPublisher])
//     const id = result.insertId
//     return getTicket(id)
// }

export async function updateTicket(tktID, tktStatus) {
    const [result] = await connection.query(`
        UPDATE tickets
        SET tktStatus = ?
        WHERE tktID = ?
        `, [tktStatus, tktID])
        // console.log(result)
    return 0
}

export async function getCategoryById(cId) {
    const [result] = await connection.query(`
        SELECT *
        FROM categories
        WHERE categoryId = ?
        `, [cId])
        // console.log(result)
        return result[0]
}

export async function getUsers() {
    const [rows] = await connection.query("SELECT * FROM users")
    return rows
}

export async function getUserbyName(name) {
    const [result] = await connection.query(`
        SELECT *
        FROM users
        WHERE username = ?
        `, [name])
        // console.log(result)
        return result[0]
}

export async function getUserByID(userID){
    const [rows] = await connection.query(`
        SELECT *, DATE_FORMAT(user_timestamp, '%M %e') AS formatted_time 
        FROM users
        WHERE uid = ?
        `, [userID])
    return rows[0]
}

export async function checkDuplicateUser(userName, userStudId, userPass, userLevel){
    // console.log(userName, userStudId, userPass, userLevel)
    const [result] = await connection.query(`
        SELECT EXISTS (
            SELECT 1 
            FROM users 
            WHERE username = ? OR stud_id = ?) AS is_exists;
        `, [userName, userStudId])
    // console.log(result)
    if (!result[0].is_exists) {
        // console.log("user registered! \n")
        // console.log("after IF: ",!result[0].is_exists)
        return await createUser(userName, userStudId, userPass, userLevel);
    } else {
        // console.log("user already exist \n")
        // console.log("after IF: ",!result[0].is_exists)
    }
    return result[0].is_exists;
}

export async function createUser(userName, userStudId, userPass, userLevel) {
    const [result] = await connection.query(`
        INSERT INTO users (username, stud_id, password, user_level)
        VALUES (?, ?, ?, ?)
        `, [userName, userStudId, userPass, userLevel])
    const id = result.insertId
    return getUserByID(id)
}

export async function updateUser(userID, userName, userStudId, userPass) {
    const [result] = await connection.query(`
        UPDATE users
        SET userName = ?, userStudId = ?, userPass = ?
        WHERE userID = ?
        `, [userName, userStudId, userPass, userID])
    return getUserByID(userID)
}

export async function submitFeedback(feedbackUID, feedbackTitle, feedbackDesc, feedbackFile ) {
    const [result] = await connection.query(`
        INSERT INTO feedbacks (feedbackUID, feedbackTitle, feedbackDesc, feedbackFile)
        VALUES (?, ?, ?, ?)
        `, [feedbackUID, feedbackTitle, feedbackDesc, feedbackFile ])
    return
}

export async function sendMessage(ticketId, sender, content) {
    const [result] = await connection.query(`
        INSERT INTO messages (ticket_id, sender_id, content)
        VALUES (?, ?, ?)
        `, [ticketId, sender, content])
    const id = result.insertId
    return getMessage(id)
}

export async function getMessages(ticketId) {
    // console.log("getting messages")
    // const [rows] = await connection.query(`
    // SELECT * 
    //     FROM messages
    //     WHERE ticket_id = ?
    //     `, [ticketId])
    const [rows] = await connection.query(`
        SELECT 
            m.id,
            m.ticket_id,
            m.sender_id,
            m.content,
            DATE_FORMAT(sent_at, '%M %e, %l:%i %p') AS formatted_time,
            u.username AS sender_username,
            u.uid
        FROM messages m
        JOIN users u ON m.sender_id = u.uid
        WHERE m.ticket_id = ?
        ORDER BY m.sent_at ASC;
        `,[ticketId])
    // console.log("result: ",rows)
    return rows
}

export async function getMessage(id) {
    const [rows] = await connection.query(`
        SELECT * 
        FROM messages
        WHERE id = ?
        `, [id])
    return rows[0]
}

export async function getCategories(){
    const [rows] = await connection.query("SELECT * FROM categories")
}