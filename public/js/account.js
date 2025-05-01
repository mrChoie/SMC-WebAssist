const profileName = document.getElementById("userProfileName")
const profileStudId = document.getElementById("userProfileStudId")
const profileDate = document.getElementById("userProfileDateCreated")

const ticketDiv = document.getElementById("ticketContainer")
const ticketTitle = document.getElementById("ticketTitle")
const ticketId = document.getElementById("ticketId")
const ticketContent = document.getElementById("ticketContent")
const ticketDate = document.getElementById("ticketDateCreated")

const logoutBtn = document.getElementById("logoutBtn")

const testDiv = document.getElementById("testDiv")

window.onload; {

    const category = 0;

    fetch ('/getInfo', {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ category })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        // execute when fetching is successful
        // console.log(data)
        document.getElementById("profileBtn").style.display="none";
        profileName.textContent=data.user.username
        profileStudId.textContent=data.user.stud_id
        profileDate.textContent="Joined since "+ data.user.formatted_time
        displayTickets(data)
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

logoutBtn.addEventListener("click", function(event) {
    event.preventDefault()
    window.location.href = "/smc-webassist/logout";
})

// const ticketDiv
// const ticketTitle
// const ticketId
// const ticketContent
// const ticketDate

function displayTickets(tickets) {
    // console.log(tickets)
    for (x = 0; x<tickets.numOfTkts; x++) {

        var rowDiv= document.createElement("div");
        var colDivContent= document.createElement("div");
        var colDivLink= document.createElement("div");
        var colDivLink= document.createElement("div");
        var title=document.createElement("p");
        var id=document.createElement("p");
        var content=document.createElement("p");
        var date=document.createElement("p");
        var link=document.createElement("a");
        var btn=document.createElement("i");

        if (tickets.tickets[x].tktStatus==1) {
            // rowDiv.classList.add("row","bg-light","animate","AccTktpending");
            // colDivContent.classList.add("col-10","ticketContent","AccTktpending");
            colDivLink.classList.add("col-2","ticketLink","text-center","AccTktpending");
        } else if (tickets.tickets[x].tktStatus==2){
            // rowDiv.classList.add("row","bg-light","animate","AccTktarchived");
            // colDivContent.classList.add("col-10","ticketContent","AccTktarchived");
            colDivLink.classList.add("col-2","ticketLink","text-center","AccTktarchived");
        } else if (tickets.tickets[x].tktStatus==3) {
            // rowDiv.classList.add("row","bg-light","animate","AccTktresolved");
            // colDivContent.classList.add("col-10","ticketContent","AccTktresolved");
            colDivLink.classList.add("col-2","ticketLink","text-center","AccTktresolved");
        }
        rowDiv.classList.add("row","bg-light","animate");
        colDivContent.classList.add("col-10","ticketContent");
        colDivLink.classList.add("col-2","ticketLink","text-center");
        title.classList.add("ptitle")
        id.classList.add("pid")
        content.classList.add("pcontent")
        date.classList.add("pdate")
        btn.classList.add("fa-solid","fa-circle-chevron-right")
        link.href = "/smc-webassist/view-ticket/ticket?id="+tickets.tickets[x].tktID;
        

        title.textContent = tickets.tickets[x].tktSubj;
        id.textContent = "Ticket ID: "+ tickets.tickets[x].tktID;
        content.textContent = tickets.tickets[x].tktDesc.substring(0, 170) + ". . .";
        date.textContent = tickets.tickets[x].formatted_time;
        // btn.textContent = "Open";

        ticketDiv.appendChild(rowDiv)

        rowDiv.appendChild(colDivContent)
        colDivContent.appendChild(title)
        colDivContent.appendChild(id)
        colDivContent.appendChild(content)
        colDivContent.appendChild(date)

        rowDiv.appendChild(colDivLink)
        colDivLink.appendChild(link)
        link.appendChild(btn)
    }
}

// var div= document.createElement("div");
// var title=document.createElement("p");
// var id=document.createElement("p");
// var content=document.createElement("p");
// var date=document.createElement("p");

// div.classList.add("container","border","border-dark","rounded");
// title.textContent = tickets.tickets[x].tktSubj;
// id.textContent = tickets.tickets[x].tktID;
// content.textContent = tickets.tickets[x].tktDesc;
// date.textContent = tickets.tickets[x].tktTimestamp;

// testDiv.appendChild(div)
// testDiv.appendChild(title)
// testDiv.appendChild(id)
// testDiv.appendChild(content)
// testDiv.appendChild(date)