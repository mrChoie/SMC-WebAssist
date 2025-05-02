const profileName = document.getElementById("userProfileName")
const profileStudId = document.getElementById("userProfileStudId")
const profileDate = document.getElementById("userProfileDateCreated")

const pendingBtn = document.getElementById('pending-toggle');
const resolvedBtn = document.getElementById('resolved-toggle');
const archivedBtn = document.getElementById('archived-toggle');



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

window.onload; {
    // toggleTickets('pending', pendingBtn.checked);
    // toggleTickets('resolved', resolvedBtn.checked);
    // toggleTickets('archived', archivedBtn.checked);
    // const category = 0;
    document.getElementById("ticketsBtn").style.display="none";
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
        return res.json(); // Parse JSON response
    })
    .then(data => {
        // execute when fetching is successful
        // console.log(data)
        displayTickets(data)
        // pendingBtn.addEventListener('click')
        // resolvedBtn.addEventListener('click')
        // archivedBtn.addEventListener('click')
        pendingBtn.click()
        resolvedBtn.click()
        archivedBtn.click()
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

const catDivArr = [null,cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8]

async function displayTickets(tickets) {
    // console.log("all tickets: ",tickets)
    // console.log("number of tickets: ",tickets.numOfTkts)
    const len = tickets.tickets.length

    // console.log("length: ",len)

    for (x = 0; x<9; x++) {
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
            

            if (tickets.tickets[y].tktCategoryID==x){
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

/* <div class="text-end">
					<button 
                    class="btn" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#optionDiv" 
                    aria-expanded="false" 
                    aria-controls="optionDiv">
                    id="optionBtn" 
					</button>
				</div>
				<div class="position-relative">
					<div 
                    class="rounded collapse" 
                    id="optionDiv">
						
					</div>
				</div> */
// Get Btnes


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
    // console.log("toggle pending tickets")
  toggleTickets('pendingBtn', e.target.style.backgroundColor);
//   console.log(e.target.style.backgroundColor)
});

resolvedBtn.addEventListener('click', (e) => {
    // console.log("toggle resolved tickets")
  toggleTickets('resolvedBtn', e.target.style.backgroundColor);
});

archivedBtn.addEventListener('click', (e) => {
    // console.log("toggle archived tickets")
  toggleTickets('archivedBtn', e.target.style.backgroundColor);
});
// var div= document.createElement("div");
// var title=document.createElement("p");
// var id=document.createElement("p");
// var content=document.createElement("p");
// var date=document.createElement("p");

// div.classList.add("container","border","rounded");
// title.textContent = tickets.tickets[x].tktSubj;
// id.textContent = tickets.tickets[x].tktID;
// content.textContent = tickets.tickets[x].tktDesc;
// date.textContent = tickets.tickets[x].tktTimestamp;

// testDiv.appendChild(div)
// testDiv.appendChild(title)
// testDiv.appendChild(id)
// testDiv.appendChild(content)
// testDiv.appendChild(date)