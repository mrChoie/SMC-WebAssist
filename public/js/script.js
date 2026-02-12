const loggedInDiv = document.getElementById("loggedInDiv")
const signUpDiv = document.getElementById("signUpDiv")
const loggedOutDiv = document.getElementById("loggedOutDiv")
const profileDropdownBtn = document.getElementById("profileDropdownBtn")
const profileDdContent = document.getElementById("profileDdContent")
const adminIcon = document.getElementById("navAdminIcon")
const userIcon = document.getElementById("navUserIcon")
const adminBtn = document.getElementById("adminBtn")
const logoutBtn = document.getElementById("logoutBtn")

window.onload; {
    fetch ('/checkCookie', {
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
        // 20 = not logged in, display sign-in div
        // 21 = logged in, display profile div
        if (data.statusCode == 21) { // logged in
            if (data.lvl==4||data.lvl==5||data.lvl==6||data.lvl==7||data.lvl==8){
                adminBtn.style.display="flex";
                profileBtn.style.display="flex";
                loggedInDiv.style.display = "flex";
                adminIcon.style.display="flex";
            } else {
            profileBtn.style.display="flex";
            loggedInDiv.style.display = "flex";
            userIcon.style.display="flex";
            }
            console.log("[script.js:39] User is logged in. Cookies:", data.cookies);
        } else {
            loggedInDiv.style.display = "none";
            signUpDiv.style.display = "flex";
            loggedOutDiv.style.display = "flex";
            console.log("[script.js:44] User is not logged in.");
        }
    })
    .catch(err => {
        console.log(err);
    });
}

const ticketsBtn = document.getElementById("ticketsBtn")
const feedbackBtn = document.getElementById("feedbackBtn")
const profileBtn = document.getElementById("profileBtn")

profileBtn.addEventListener("click", function (event){
    event.preventDefault();
    window.location.href = "/smc-webassist/account"
})

ticketsBtn.addEventListener("click", function (event){
    event.preventDefault();
    window.location.href = "/smc-webassist/admin/view-tickets"
})

feedbackBtn.addEventListener("click", function (event){
    event.preventDefault();
    window.location.href = "/smc-webassist/admin/view-feedback"
})

logoutBtn.addEventListener("click", function(event) {
    event.preventDefault()

    if (confirm("Confirm logout?")) {
        window.location.href = "/smc-webassist/logout";
    }
})

function openLogin() {
    let element = document.getElementById("modalContainer");
    element.style.display = "flex";
};

function closeLogin(){
    let element = document.getElementById("modalContainer");
    let accNavBarElement = document.getElementById("accNavBarBtn");
    accNavBarElement.removeAttribute("disabled");
    element.style.display = "none";
}

function toggleInvalidNotice(page){

    let ticket = document.getElementById("ticketInvalidNotice");
    let feedbackNotice = document.getElementById("feedbackInvalidNotice");

    if (page == 'ticket') {
        if (document.getElementById("ticketStudName").value != "" &&
        document.getElementById("ticketIdNum").value != "" &&
        document.getElementById("ticketSubj").value != "" &&
        document.getElementById("ticketDesc").value != "" ){
        ticket.style.display = "none"; 
        } else {
        ticket.style.display = "flex";
        }
    } else {
        if (document.getElementById("feedbackTitle").value != "" &&
        document.getElementById("feedbackDesc").value != "" ){
        feedbackNotice.style.display = "none";
        } else {
        feedbackNotice.style.display = "flex";
        }
    }
}