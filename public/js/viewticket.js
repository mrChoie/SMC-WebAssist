const sendReplyBtn = document.getElementById("sendReplyBtn")
const msgBox = document.getElementById("msgBox")
const optionBtn = document.getElementById("optionBtn")
const optionDiv = document.getElementById("optionDiv")
const archivedNotice = document.getElementById("archivedNotice")
const resolvedNotice = document.getElementById("resolvedNotice")
const archivedBtn = document.getElementById("archivedBtn")
const resolvedBtn = document.getElementById("resolvedBtn")
const submitLinkRes = document.getElementById("submitLinkRes")
const submitLinkArc = document.getElementById("submitLinkArc")
const tktOptionList = document.getElementById("tktOptionList")
const authorEmail = document.getElementById("authorEmail")
const ticketContainer = document.getElementById("viewTicketContainer")
const messageContainer = document.getElementById("messagesContainer")
const msgNoticeParentDiv = document.getElementById("msgNoticeParentDiv")

sendReplyBtn.addEventListener("click", function (event) {
    const urlParams = new URLSearchParams(window.location.search);
    const tktID = urlParams.get("id");
    event.stopPropagation();
    event.preventDefault();
    const reply = msgBox.value;
    if (reply!=""){
        sendMessage(reply);
        msgNoticeParentDiv.style.display="flex"
        setTimeout(()=>{
            getMessages(tktID);
            msgNoticeParentDiv.style.display="none"
            messageContainer.innerHTML = ''
        },2000);
        msgBox.value= ""
    } else {
        msgBox.classList.add("border-danger")
    }
});

msgBox.addEventListener("keydown", function(event) {
    msgBox.classList.remove("border-danger")
})

archivedBtn.addEventListener("click", function (event) {
    updateTicket('2')
    location.reload();
})
resolvedBtn.addEventListener("click", function (event) {
    updateTicket('3')
    location.reload();
})
submitLinkRes.addEventListener("click", function (event) {
    window.location.href = "/smc-webassist/category";
})
submitLinkArc.addEventListener("click", function (event) {
    window.location.href = "/smc-webassist/category";
})

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
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        authorEmail.value = data.ticket.email
        if (data.lvl == '1') {
            archivedBtn.setAttribute('disabled','1');
        } else if (data.lvl == '4') {
            appendAdminOptions();
        }

        if (data.ticket.tktStatus=='2') {
            archivedNotice.classList.add("d-flex")
            resolvedBtn.setAttribute('disabled','1');
            archivedBtn.setAttribute('disabled','1');
            msgBox.setAttribute('disabled','1');
            sendReplyBtn.setAttribute('disabled','1');

        } else if (data.ticket.tktStatus=='3') {
            resolvedNotice.classList.add("d-flex")
            resolvedBtn.setAttribute('disabled','1');
            archivedBtn.setAttribute('disabled','1');
            msgBox.setAttribute('disabled','1');
            sendReplyBtn.setAttribute('disabled','1');
        }
        displayTicket(data.ticket);
        getMessages(data.ticket);
    })
    .catch(err => {
        console.log(err);
    });
}

function getMessages(tktID) {
    
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
        return res.json();
    })
    .then(data => {
        displayMessages(data);
    })
    .catch(err => {
        console.log(err);
    });
}

function sendMessage(reply) {
    const urlParams = new URLSearchParams(window.location.search);
    const tktID = urlParams.get("id");
    const content = reply;
    const email = authorEmail.value

    fetch ('/msg/send-message', {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ tktID, content, email })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
    })
    .catch(err => {
        console.log(err);
    });
}

function updateTicket(tktStatus){
    const urlParams = new URLSearchParams(window.location.search);
    const tktID = urlParams.get("id");
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
        return res.json();
    })
    .then(data => {
    })
    .catch(err => {
        console.log(err);
    });
}

function appendAdminOptions() {
    var li = document.createElement("li");
    var btn = document.createElement("button");
    btn.classList.add("btn","w-100","text-end","rounded-0","openBtn");
    btn.textContent = "Open Ticket";
    tktOptionList.appendChild(li)
    li.appendChild(btn);
    addEvent(btn)
}

function addEvent(btn){
    btn.addEventListener("click", function(event){
        console.log("btn clicked");
        updateTicket('1');
        location.reload();
    })
}

function displayTicket(ticket) {
    var rowDiv = document.createElement("div");
    var ticketDiv = document.createElement("div");
    var title = document.createElement("p");
    var content = document.createElement("p");
    var building = document.createElement("p");
    var date = document.createElement("p");
    var author = document.createElement("p");

    rowDiv.classList.add("row","mt-2")
    ticketDiv.classList.add("viewTicketContent","border-bottom")
    title.classList.add("ptitle","fw-bold")
    content.classList.add("pcontent")
    building.classList.add("pbuilding","m-0")
    date.classList.add("pdate","m-0")
    author.classList.add("pAuthor","m-0")

    title.textContent = ticket.tktSubj;
    content.textContent = ticket.tktDesc;
    if (ticket.tktBuildCat=='b1') {
        building.textContent = "For: Engineering"
    } else if (ticket.tktBuildCat=='b2') {
        building.textContent = "For: College"
    } else if (ticket.tktBuildCat=='b3') {
        building.textContent = "For: SMC Main"
    } else if (ticket.tktBuildCat=='b4') {
        building.textContent = "For: HS Annex"
    }
    date.textContent = ticket.formatted_time;
    author.textContent = "Author: "+ ticket.tktOwner;
    
    ticketContainer.appendChild(rowDiv)
    rowDiv.appendChild(ticketDiv)
    ticketDiv.appendChild(title)
    ticketDiv.appendChild(content)
    ticketDiv.appendChild(author)
    ticketDiv.appendChild(building)
    ticketDiv.appendChild(date)
}

function displayMessages(data) {
    for (x = 0; x<data.numOfMessages; x++) {
        var rowDiv= document.createElement("div");
        var sender=document.createElement("p");
        var content=document.createElement("p");
        var date=document.createElement("p");
        var userIcon=document.createElement("i");

        rowDiv.classList.add("row","mt-2","mb-2","border-bottom");
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