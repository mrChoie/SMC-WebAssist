const profileName = document.getElementById("userProfileName")
const profileStudId = document.getElementById("userProfileStudId")
const profileDate = document.getElementById("userProfileDateCreated")

const pendingBtn = document.getElementById('pending-toggle');
const resolvedBtn = document.getElementById('resolved-toggle');
const archivedBtn = document.getElementById('archived-toggle');

const ticketsBtnv2 = document.getElementById("ticketsBtnv2")

const cat1 = document.getElementById("ticketCategory1")
const cat2 = document.getElementById("ticketCategory2")
const cat3 = document.getElementById("ticketCategory3")
const cat4 = document.getElementById("ticketCategory4")
const cat5 = document.getElementById("ticketCategory5")
const cat6 = document.getElementById("ticketCategory6")
const cat7 = document.getElementById("ticketCategory7")
const cat8 = document.getElementById("ticketCategory8")

const ticketTitle = document.getElementById("ticketTitle")
const ticketId = document.getElementById("ticketId")
const ticketContent = document.getElementById("ticketContent")
const ticketDate = document.getElementById("ticketDateCreated")

const testDiv = document.getElementById("testDiv")

ticketsBtnv2.addEventListener("click", function (event){
    event.preventDefault();
    window.location.href = "/smc-webassist/admin/view-tickets-v2"
})

window.onload; {
    fetch ('/getTickets', {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        // body: JSON.stringify({ category })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        // execute when fetching is successful
        console.log(data)
        displayTickets(data)
        pendingBtn.click()
        resolvedBtn.click()
        archivedBtn.click()
    })
    .catch(err => {
        console.log(err);
    });
}

const catDivArr = [null,cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8]

async function displayTickets(tickets) {
    const len = tickets.tickets.length
    for (x = 0; x<9; x++) {
        for (y=0; y<len;y++) {
            var div= document.createElement("div");
            var title=document.createElement("p");
            var id=document.createElement("p");
            var content=document.createElement("p");
            var date=document.createElement("p");
            var owner=document.createElement("p");
            var link=document.createElement("a");

            if (tickets.tickets[y].tktStatus==1) {
                div.classList.add("collapse","ticket","pending","container","border","rounded","mt-2","p-2");
            } else if (tickets.tickets[y].tktStatus==2){
                div.classList.add("collapse","ticket","archived","container","border","rounded","mt-2","p-2");
            } else if (tickets.tickets[y].tktStatus==3) {
                div.classList.add("collapse","ticket","resolved","container","border","rounded","mt-2","p-2");
            }
            title.classList.add("ptitle")
            id.classList.add("pid")
            content.classList.add("pcontent")
            date.classList.add("pdate")
            owner.classList.add("pdate")
            
            if (tickets.tickets[y].tktInqCat==x){
                owner.textContent = tickets.tickets[y].tktOwner;
                title.textContent = tickets.tickets[y].tktSubj;
                id.textContent = "Ticket ID: "+ tickets.tickets[y].tktID;
                content.textContent = tickets.tickets[y].tktDesc.substring(0, 80) + " . . .";
                date.textContent = tickets.tickets[y].formatted_time;
                link.href = "/smc-webassist/view-ticket/ticket?id="+tickets.tickets[y].tktID;
            } else {
                continue
            }
            
            catDivArr[x].appendChild(link)
            link.appendChild(div)
            div.appendChild(title)
            div.appendChild(id)
            div.appendChild(content)
            div.appendChild(date)

        }
    }
}

// Function to toggle visibility
function toggleTickets(category, bool) {
    const color = "rgb(139, 195, 74)"
  const tickets = document.querySelectorAll(`.${category}`);
  tickets.forEach(ticket => {
    ticket.style.backgroundColor = (bool==color) ? 'lightgrey' :color ;
  });
}

// Add event listeners
pendingBtn.addEventListener('click', (e) => {
  toggleTickets('pendingBtn', e.target.style.backgroundColor);
});

resolvedBtn.addEventListener('click', (e) => {
  toggleTickets('resolvedBtn', e.target.style.backgroundColor);
});

archivedBtn.addEventListener('click', (e) => {
  toggleTickets('archivedBtn', e.target.style.backgroundColor);
});