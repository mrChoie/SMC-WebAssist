const responseDivSuccess = document.getElementById("responseSuccess")
const nameNotice = document.getElementById("nameLoginNotice")
const passNotice = document.getElementById("passLoginNotice")
const usernameInput = document.getElementById("userName")
const passwordInput = document.getElementById("userPass")
const signBtn = document.getElementById("signBtn")

const reqBtnP = document.getElementById("reqBtnP")
const reqBtnLoading = document.getElementById("reqBtnLoading")
const forgotPassBtn = document.getElementById("forgotPassBtn")
const forgotPassParentDiv = document.getElementById("forgotPassParentDiv")
const forgotPassDiv = document.getElementById("forgotPassDiv")
const closeForgotPassBtn = document.getElementById("closeForgotPassBtn")
const reqBtn = document.getElementById("reqBtn")
const forgotPassEmailInput = document.getElementById("forgotPassEmail")
const forgotPassEmailNotice = document.getElementById("forgotPassEmailNotice")

forgotPassBtn.addEventListener("click", function (event) {
    
    forgotPassParentDiv.style.display = "flex"
    
    forgotPassDiv.classList.add("animate")
    forgotPassDiv.style.display = "flex"
})

closeForgotPassBtn.addEventListener("click", function (event) {
    forgotPassParentDiv.style.display = "none"
    forgotPassEmailInput.value = ""
    forgotPassEmailNotice.textContent = ""
    forgotPassEmailNotice.classList.remove("text-success")
    forgotPassEmailNotice.classList.add("text-danger")
    forgotPassEmailInput.removeAttribute('disabled');
    reqBtn.removeAttribute('disabled');
    reqBtnP.style.display = "flex"
    reqBtnLoading.style.display = "none"
})

passwordInput.addEventListener("keydown", function (event) {
    passwordInput.classList.remove("border-danger")
    passNotice.textContent = "";
})
usernameInput.addEventListener("keydown", function (event) {
    usernameInput.classList.remove("border-danger")
    
    nameNotice.textContent = "";
    passNotice.textContent = "";
})

forgotPassEmailInput.addEventListener("keydown", function (event) {
    forgotPassEmailNotice.style.display = "none"
    forgotPassEmailNotice.textContent= ""
})

reqBtn.addEventListener("click", function (event) {
    event.preventDefault()
    var email = forgotPassEmailInput.value
    if (email=="") {
        forgotPassEmailNotice.style.display = "flex"
        forgotPassEmailNotice.textContent= "Type your email"
    } else {
        reqBtnP.style.display = "none"
        reqBtnLoading.style.display = "flex"
        //sendMail(email)
    }
})

function sendMail(email){
    forgotPassEmailInput.setAttribute('disabled','1');
    reqBtn.setAttribute('disabled','1');
    console.log("sending as requested by ",email)
    fetch ("/reqResetPassword/email", {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        console.log(data)
        if (data.statusCode=='00'){
            forgotPassEmailNotice.style.display = "flex";
            forgotPassEmailNotice.textContent = data.message
            forgotPassEmailInput.removeAttribute('disabled');
            reqBtn.removeAttribute('disabled');
        } else {
            forgotPassEmailNotice.style.display = "flex";
            forgotPassEmailNotice.classList.remove("text-danger")
            forgotPassEmailNotice.classList.add("text-success")
            forgotPassEmailNotice.textContent = data.message
        }
        reqBtnP.style.display = "flex"
        reqBtnLoading.style.display = "none"
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

function login() {
    const userName = usernameInput.value;
    const userPass = passwordInput.value;
    console.log("Fetching user...")
    fetch ("/smc-webassist/login", {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, userPass })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        if (data.statusCode == '11') {
            window.location.href = "/smc-webassist/home";
        } else if (data.statusCode == '01') {
            var form = document.querySelector('.needs-validation')
            form.classList.remove('was-validated')
            usernameInput.classList.add("border-danger")
            nameNotice.textContent = data.message; // Display the result
        } else if (data.statusCode == '02') {
            var form = document.querySelector('.needs-validation')
            form.classList.remove('was-validated')
            passwordInput.classList.add("border-danger")
            passNotice.textContent = data.message; // Display the result
        } else {
            var form = document.querySelector('.needs-validation')
            form.classList.remove('was-validated')
            usernameInput.classList.add("border-danger")
            nameNotice.textContent = data.message; // Display the result
        }
    })
    .catch(err => {
        console.log(err);
    });
}

var showPassIndicator=false;

function showPassIcon(){
    let divBox = document.getElementById("showPassIconDiv");
    let userPass = document.getElementById("userPass");
    if (userPass.value!=""){
        divBox.style.display = "flex";
    } else {
        divBox.style.display = "none";
        let eyeIcon = document.getElementById("showPassIcon");
    }
}

function showHidePass(){
    let eyeIcon = document.getElementById("showPassIcon");
    let opacityIcon = document.getElementById("showPassIconDiv");
    if (showPassIndicator==true){
        showPassText();
        showPassIndicator=false;
        eyeIcon.classList.add("fa-eye-slash");
        eyeIcon.classList.remove("fa-eye");
        opacityIcon.style.opacity = "0.3";
    } else {
        showPassText();
        showPassIndicator=true;
        eyeIcon.classList.add("fa-eye");
        eyeIcon.classList.remove("fa-eye-slash");
        opacityIcon.style.opacity = "0.6";
    }
}

function showPassText() {
    var x = document.getElementById("userPass");
    if (x.type === "password") {
        x.type = "text";
        showPassIndicator=true;
    } else {
        x.type = "password";
        showPassIndicator=false;
    }
}

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)

        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            } else {
                event.preventDefault()
                login()
            }
            form.classList.add('was-validated')
        }, false)
        })
    })
()