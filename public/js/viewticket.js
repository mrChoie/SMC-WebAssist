const sendReplyBtn = document.getElementById("sendReplyBtn")
const msgBox = document.getElementById("msgBox")
const optionBtn = document.getElementById("optionBtn")
const optionDiv = document.getElementById("optionDiv")
const archivedNotice = document.getElementById("archivedNotice")
const resolvedNotice = document.getElementById("resolvedNotice")
const archivedBtn = document.getElementById("archivedBtn")
const resolvedBtn = document.getElementById("resolvedBtn")
const submitLink = document.getElementById("submitLink")
const tktOptionList = document.getElementById("tktOptionList")


const ticketContainer = document.getElementById("viewTicketContainer")
const messageContainer = document.getElementById("messagesContainer")


sendReplyBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault(); // Prevent form submission if needed
    const reply = msgBox.value;
    sendMessage(reply);
    location.reload();
});

archivedBtn.addEventListener("click", function (event) {
    updateTicket('2')
    // console.log("ticket status updated to: 2")
    location.reload();
})
resolvedBtn.addEventListener("click", function (event) {
    updateTicket('3')
    // console.log("ticket status updated to: 3")
    location.reload();
})
submitLink.addEventListener("click", function (event) {
    window.location.href = "/smc-webassist/ticket/submit";
})
// optionBtn.addEventListener("click", function (event){
//     // optionDiv.style.width= "210px";
//     // optionDiv.style.transition="height 1s";
//     optionDiv.style.display="flex";
// })

window.onload; {
    const urlParams = new URLSearchParams(window.location.search);
    const tktID = urlParams.get("id");
    archivedNotice.classList.remove("d-flex")
    resolvedNotice.classList.remove("d-flex")

    fetch ('/getATicket/view-ticket/ticket/'+tktID, {
        method: "GET",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        // body: JSON.stringify({ tktID })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        console.log(data)
        // window.location.href = "/smc-webassist/view-ticket/ticket/"+data.ticket.tktID;
        // history.replaceState({}, '', "/smc-webassist/view-ticket/ticket/"+data.ticket.tktID);
        if (data.lvl == '1') {
            archivedBtn.setAttribute('disabled','1');
        } else if (data.lvl == '4') {
            appendAdminOptions();
        }

        if (data.ticket.tktStatus=='2') {     // ticket is archived
            archivedNotice.classList.add("d-flex")
            resolvedBtn.setAttribute('disabled','1');
            archivedBtn.setAttribute('disabled','1');
            msgBox.setAttribute('disabled','1');
            sendReplyBtn.setAttribute('disabled','1');

        } else if (data.ticket.tktStatus=='3') { // ticket is resolved
            resolvedNotice.classList.add("d-flex")
            resolvedBtn.setAttribute('disabled','1');
            archivedBtn.setAttribute('disabled','1');
            msgBox.setAttribute('disabled','1');
            sendReplyBtn.setAttribute('disabled','1');
        }
        displayTicket(data.ticket);
        getMessages(data.ticket);
        // tkOwner2.value = data.user.username;
        // tkOwnerID2.value = data.user.stud_id;
        // tkOwner.value = data.user.username;
        // tkOwnerdbid.value = data.user.stud_id;
        // categoryTitle.textContent = data.categoryTitle.categoryTitle 
        // categoryID.value = data.categoryTitle.categoryId
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

function getMessages(tktID) {
    // console.log("getiing data")
    fetch ('/msg/get-messages', {
        method: "GET",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        // console.log(data)
        // console.log("got message")
        displayMessages(data);
        // execute code
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

function sendMessage(reply) {
    const urlParams = new URLSearchParams(window.location.search);
    const tktID = urlParams.get("id");
    const content = reply;

    fetch ('/msg/send-message', {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ tktID, content })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        // console.log(data)
        // execute code
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

function updateTicket(tktStatus){
    const urlParams = new URLSearchParams(window.location.search);
    const tktID = urlParams.get("id");

    // console.log("tktStatus: ",tktStatus, "tktID: ", tktID)
    fetch ('/smc-webassist/ticket/update', {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ tktID, tktStatus })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        // console.log("data recieved: ",data)
        // execute code
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

function appendAdminOptions() {
    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.classList.add("btn","w-100","text-end","rounded-0","openBtn");
    btn.textContent = "Open Ticket";
    tktOptionList.appendChild(li)
    li.appendChild(btn);
    // console.log("appended")
    addEvent(btn)
    
}

function addEvent(btn){
    btn.addEventListener("click", function(event){
        console.log("btn clicked");
        updateTicket('1');
    })
    // console.log("added event")
}

function displayTicket(ticket) {
    var rowDiv = document.createElement("div");
    var ticketDiv = document.createElement("div");
    var title = document.createElement("p");
    // var id = document.createElement("p");
    var content = document.createElement("p");
    var date = document.createElement("p");
    var author = document.createElement("p");

    rowDiv.classList.add("row","mt-2");
    ticketDiv.classList.add("viewTicketContent","border","rounded");
    title.classList.add("ptitle")
    // id.classList.add("pid")
    content.classList.add("pcontent")
    date.classList.add("pdate")
    author.classList.add("pAuthor")

    title.textContent = ticket.tktSubj;
    // id.textContent = "Ticket ID: "+ ticket.tktID;
    content.textContent = ticket.tktDesc;
    date.textContent = ticket.formatted_time;
    author.textContent = "Author: "+ ticket.tktOwner;
    
    ticketContainer.appendChild(rowDiv)
    rowDiv.appendChild(ticketDiv)
    ticketDiv.appendChild(title)
    // ticketDiv.appendChild(id)
    ticketDiv.appendChild(content)
    ticketDiv.appendChild(author)
    ticketDiv.appendChild(date)
}

function displayMessages(data) {
    // console.log(data)
    for (x = 0; x<data.numOfMessages; x++) {
        var rowDiv= document.createElement("div");
        var sender=document.createElement("p");
        var content=document.createElement("p");
        var date=document.createElement("p");
        var userIcon=document.createElement("i");

        rowDiv.classList.add("row","mt-2","mb-2","bg-light");
        sender.classList.add("pSender")
        content.classList.add("pMessage")
        date.classList.add("pid","text-end")

        if (data.messages[x].sender_level=='4') {
            userIcon.classList.add("fa-solid","fa-user-tie")
        } else {
            userIcon.classList.add("fa-solid","fa-user")
        }
        
        

        sender.textContent = data.messages[x].sender_username;
        content.textContent = data.messages[x].content;
        date.textContent = data.messages[x].formatted_time;
        
        messageContainer.appendChild(rowDiv)
        rowDiv.appendChild(sender)
        sender.appendChild(userIcon)
        rowDiv.appendChild(content)
        rowDiv.appendChild(date)
    }
}
// function displayMessages
// function displayMessages(tickets) {
//     // console.log(tickets)
//     for (x = 0; x<tickets.numOfTkts; x++) {

//         var rowDiv= document.createElement("div");
//         var rowDiv= document.createElement("div");
//         var colDivLink= document.createElement("div");
//         var colDivLink= document.createElement("div");
//         var title=document.createElement("p");
//         var id=document.createElement("p");
//         var content=document.createElement("p");
//         var date=document.createElement("p");
//         var link=document.createElement("a");
//         var btn=document.createElement("i");

//         rowDiv.classList.add("row","bg-light","animate");
//         rowDiv.classList.add("col-10","ticketContent");
//         colDivLink.classList.add("col-2","ticketLink","text-center");
//         title.classList.add("ptitle")
//         id.classList.add("pid")
//         content.classList.add("pcontent")
//         date.classList.add("pdate")
//         btn.classList.add("fa-solid","fa-circle-chevron-right")
//         link.href = "/smc-webassist/view-ticket/ticket?id="+tickets.tickets[x].tktID;
        

//         title.textContent = tickets.tickets[x].tktSubj;
//         id.textContent = "Ticket ID: "+ tickets.tickets[x].tktID;
//         content.textContent = tickets.tickets[x].tktDesc.substring(0, 170) + ". . .";
//         date.textContent = tickets.tickets[x].tktTimestamp;
//         // btn.textContent = "Open";

//         ticketDiv.appendChild(rowDiv)

//         rowDiv.appendChild(rowDiv)
//         rowDiv.appendChild(title)
//         rowDiv.appendChild(id)
//         rowDiv.appendChild(content)
//         rowDiv.appendChild(date)

//         rowDiv.appendChild(colDivLink)
//         colDivLink.appendChild(link)
//         link.appendChild(btn)
//     }
// }