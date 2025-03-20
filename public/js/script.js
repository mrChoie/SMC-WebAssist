const loggedInDiv = document.getElementById("loggedInDiv")
const loggedOutDiv = document.getElementById("loggedOutDiv")
const profileDropdownBtn = document.getElementById("profileDropdownBtn")
const profileDdContent = document.getElementById("profileDdContent")

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
        // console.log(data);
        if (data.statusCode == '21') {
            // document.cookie = `accessToken=${data.user.username}; path=/; expires=${new Date(Date.now() + 1000*60*60*2).toUTCString()}`
            loggedInDiv.style.display = "flex";
            loggedOutDiv.style.display = "none";
        } else {
            loggedInDiv.style.display = "none";
            loggedOutDiv.style.display = "flex";
        }
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

function signIn(){
    console.log("signIn Funct call")
    if (document.getElementById("userName").value != "") {
        console.log("Signed in!");
    } else {
        console.log("Fill in the username first!");
    }
}

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