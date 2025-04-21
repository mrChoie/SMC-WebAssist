const loggedInDiv = document.getElementById("loggedInDiv")
const signUpDiv = document.getElementById("signUpDiv")
const loggedOutDiv = document.getElementById("loggedOutDiv")
const profileDropdownBtn = document.getElementById("profileDropdownBtn")
const profileDdContent = document.getElementById("profileDdContent")
const adminBtn = document.getElementById("adminBtn")
const adminIcon = document.getElementById("navAdminIcon")
const userIcon = document.getElementById("navUserIcon")
const tktOptionList = document.getElementById("tktOptionList")
// import responseDiv from "document.getElementById("response")"
// import signBtn from "document.getElementById("signBtn")"
// import ejs from 'ejs'
// import document from '../../views/home.ejs'

window.onload; {
    // 20 = not logged in, display sign-in div
    // 21 = logged in, display profile div
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
        // console.log(tktOptionList)
        // console.log(data.lvl," : ", data.message," : ", data.statusCode," : ", data.cookies)
        if (data.statusCode == 21) { // logged in
            // document.cookie = `accessToken=${data.user.username}; path=/; expires=${new Date(Date.now() + 1000*60*60*2).toUTCString()}`
            if (data.lvl==4){
                adminBtn.style.display="flex";
                loggedInDiv.style.display = "flex";
                adminIcon.style.display="flex";
                appendAdminOptions();
            } else {
            loggedInDiv.style.display = "flex";
            userIcon.style.display="flex";
            }
        } else {
            signUpDiv.style.display = "flex";
            loggedOutDiv.style.display = "flex";
        }
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

function updateTicket(tktStatus){
    console.log("fetching")
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
        location.reload();
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}
// function testFunct(){
//     document.getElementById("signBtn").addEventListener("click", function(){
//         console.log("Button clicked");
//     });
// }

// profileDropdownBtn.addEventListener("click", function(event){
//     profileDdContent.style.display = "flex"
// })

// profileDropdownBtn.addEventListener("mouseleave", function(event){
//     profileDdContent.style.display = "none"
// })

// signBtn.addEventListener("click", function (event) {
//     event.stopPropagation();
//     event.preventDefault(); // Prevent form submission if needed
//     const userName = usernameInput.value;
//     const userPass = passwordInput.value;
//     login(userName, userPass);
// });

function openLogin() {
    //document.getElementById("navBar").style.backgroundColor = "red";

    let element = document.getElementById("modalContainer");
    element.style.display = "flex";
    //let accOptTab = document.getElementById("accOpt");
    //accOptTab.hide.bs.collapse;
    // let accNavBarElement = document.getElementById("accNavBarBtn");
    // accNavBarElement.hasAttribute("disabled");
    
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
// Example starter JavaScript for disabling form submissions if there are invalid fields
// (function () {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll('.needs-validation')
//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms)

//     .forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
//         form.classList.add('was-validated')
//       }, false)
//     })
// })()