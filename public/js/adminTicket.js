const profileName = document.getElementById("userProfileName")
const profileStudId = document.getElementById("userProfileStudId")
const profileDate = document.getElementById("userProfileDateCreated")

const cat1 = document.getElementById("ticketCategory1")
const cat2 = document.getElementById("ticketCategory2")
const cat3 = document.getElementById("ticketCategory3")
const cat4 = document.getElementById("ticketCategory4")
const cat5 = document.getElementById("ticketCategory5")
const cat6 = document.getElementById("ticketCategory6")
const cat7 = document.getElementById("ticketCategory7")

const ticketTitle = document.getElementById("ticketTitle")
const ticketId = document.getElementById("ticketId")
const ticketContent = document.getElementById("ticketContent")
const ticketDate = document.getElementById("ticketDateCreated")

const testDiv = document.getElementById("testDiv")

window.onload; {

    const category = 0;

    fetch ('/getTickets', {
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
        displayTickets(data)
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

// const ticketDiv
// const ticketTitle
// const ticketId
// const ticketContent
// const ticketDate

const catDivArr = [null,cat1, cat2, cat3, cat4, cat5, cat6, cat7]

async function displayTickets(tickets) {
    // console.log("all tickets: ",tickets)
    // console.log("number of tickets: ",tickets.numOfTkts)
    const len = tickets.length

    for (x = 0; x<8; x++) {
        // console.log("x: ",x)

        for (y=0; y<len;y++) {
            // console.log("y: ",y)
            // console.log("length: ",len)

            var div= document.createElement("div");
            var title=document.createElement("p");
            var id=document.createElement("p");
            var content=document.createElement("p");
            var date=document.createElement("p");
            var owner=document.createElement("p");

            if (tickets[y].tktStatus==1) {
                div.classList.add("pending","container","border","border-dark","rounded","animate","mt-2");
            } else {
                div.classList.add("resolved","container","border","border-dark","rounded","animate","mt-2");
            }
            title.classList.add("ptitle")
            id.classList.add("pid")
            content.classList.add("pcontent")
            date.classList.add("pdate")
            owner.classList.add("pdate")

            if (tickets[y].tktCategoryID==x){
                owner.textContent = tickets[y].tktOwner;
                title.textContent = tickets[y].tktSubj;
                id.textContent = "Ticket ID: "+ tickets[y].tktID;
                content.textContent = tickets[y].tktDesc.substring(0, 80) + ". . .";
                date.textContent = tickets[y].tktTimestamp;
            } else {
                continue
            }
            
            catDivArr[x].appendChild(div)
            div.appendChild(title)
            div.appendChild(id)
            div.appendChild(content)
            div.appendChild(date)

        }
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