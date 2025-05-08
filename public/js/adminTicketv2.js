const engUL = document.getElementById("engiTicketList");
const collUL = document.getElementById("collTicketList");
const mainUL = document.getElementById("mainTicketList");
const annexUL = document.getElementById("annexTicketList");
const engiContainer = document.getElementById("engiContainer")
const collContainer = document.getElementById("collContainer")
const smcmainContainer = document.getElementById("smcmainContainer")
const annexContainer = document.getElementById("annexContainer")

const containerArr = [engiContainer, collContainer, smcmainContainer, annexContainer]
const ulArr = [engUL, collUL, mainUL, annexUL]

window.onload = function() {
    // document.getElementById("ticketBtn").style.display="none";

    fetch ('/getTickets', {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        }
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
        displayTickets(data)
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}



displayTickets = (tickets) => {
    // console.log(tickets)
    for (x = 0; x<tickets.numOfTkts; x++) {
        
        var li = document.createElement("li");
        var rowDiv= document.createElement("div");
        var pDivID= document.createElement("div");
        var pDivTitle= document.createElement("div");
        var pDivDesc= document.createElement("div");
        var pDivCat = document.createElement("div");
        var pDivStatus= document.createElement("div");
        var pDivAuthor= document.createElement("div");
        var pDivDate= document.createElement("div");
        var pID = document.createElement("p");
        var pTitle = document.createElement("p");
        var pPrevDesc = document.createElement("p");
        var pCat = document.createElement("p");
        var pStatus = document.createElement("p");
        var pAuthor = document.createElement("p");
        var pDate = document.createElement("p");
        var link = document.createElement("a");

        li.classList.add("ticketListItem")
        rowDiv.classList.add("row","p-1","align-items-center")
        pDivID.classList.add("col-sm-1","text-sm-center")
        pDivTitle.classList.add("col-sm-2")
        pDivDesc.classList.add("col-sm-4")
        pDivCat.classList.add("col-sm-1")
        pDivStatus.classList.add("col-sm-1","d-flex","text-sm-center")
        pDivAuthor.classList.add("col-sm-2")
        pDivDate.classList.add("col-sm-1")
        pID.classList.add("m-0")
        pTitle.classList.add("m-0")
        pPrevDesc.classList.add("m-0","ticketPrevDesc")
        // pDesc.classList.add("m-0","ticketDesc","d-none")
        pCat.classList.add("m-0","ticketCategory")
        pStatus.classList.add("m-0","ticketStatus")
        pAuthor.classList.add("m-0","ticketAuthor")
        pDate.classList.add("m-0","ticketDate")
        link.classList.add("ticketLink")
        
        pID.textContent = tickets.tickets[x].tktID;
        pTitle.textContent = tickets.tickets[x].tktSubj;
        pPrevDesc.textContent = tickets.tickets[x].tktDesc.substring(0, 50)+"... (read more)";
        // pDesc.textContent = tickets.tickets[x].tktDesc;
        pCat.textContent = tickets.tickets[x].categoryTitle
        if (tickets.tickets[x].tktStatus=='1'){
            pStatus.textContent = "Pending";
            pStatus.classList.add("pending","flex-fill");
        } else if (tickets.tickets[x].tktStatus=='2') {
            pStatus.textContent = "Archived";
            pStatus.classList.add("archived","flex-fill");
        } else if (tickets.tickets[x].tktStatus=='3') {
            pStatus.textContent = "Resolved";
            pStatus.classList.add("resolved","flex-fill");
        }
        pAuthor.textContent = tickets.tickets[x].tktOwner;
        pDate.textContent = tickets.tickets[x].formatted_time;
        link.href = "/smc-webassist/view-ticket/ticket?id="+tickets.tickets[x].tktID;
        if (tickets.tickets[x].tktBuildCat=='b1') {
            ulArr[0].appendChild(li);
        } else if (tickets.tickets[x].tktBuildCat=='b2') {
            ulArr[1].appendChild(li);
        } else if (tickets.tickets[x].tktBuildCat=='b3') {
            ulArr[2].appendChild(li);
        } else if (tickets.tickets[x].tktBuildCat=='b4') {
            ulArr[3].appendChild(li);
        }
        
        li.appendChild(rowDiv);
        rowDiv.appendChild(pDivID);
        rowDiv.appendChild(pDivTitle);
        rowDiv.appendChild(pDivDesc);
        rowDiv.appendChild(pDivCat);
        rowDiv.appendChild(pDivStatus);
        rowDiv.appendChild(pDivAuthor);
        rowDiv.appendChild(pDivDate);
        pDivID.appendChild(pID);
        pDivTitle.appendChild(pTitle);
        pDivDesc.appendChild(link)
        link.appendChild(pPrevDesc);
        // pDivDesc.appendChild(pDesc);
        pDivCat.appendChild(pCat);
        pDivStatus.appendChild(pStatus);
        pDivAuthor.appendChild(pAuthor);
        pDivDate.appendChild(pDate);
    }
}