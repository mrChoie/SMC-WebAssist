const nameInput = document.getElementById("userName")
const idInput = document.getElementById("userStudId")
const emailInput = document.getElementById("userEmail")
const passInput = document.getElementById("userPass")
const nameNotice = document.getElementById("nameNotice")
const studIDNotice = document.getElementById("studIDNotice")
const passNotice = document.getElementById("passNotice")
const emailNotice = document.getElementById("emailNotice")
const eyeIcon = document.getElementById("showPassIcon")
const showPassIconDiv = document.getElementById("showPassIconDiv")
const noticePar = document.getElementById("noticeParent")
const proceedBtn = document.getElementById("proceedBtn")
const createAccBtn = document.getElementById("createAccBtn")
var showPassIndicator=false;

nameInput.addEventListener("keydown", function (event) {
    nameInput.classList.remove("border-danger")
    nameNotice.textContent = "";
})
idInput.addEventListener("keydown", function (event) {
    idInput.classList.remove("border-danger")
    studIDNotice.textContent = "";
})
emailInput.addEventListener("keydown", function (event) {
    emailInput.classList.remove("border-danger")
    emailNotice.textContent = "";
})
passInput.addEventListener("keydown", function (event) {
    passInput.classList.remove("border-danger")
    passNotice.textContent = "";
})

proceedBtn.addEventListener("click", function (event) {
    window.location.href = "/smc-webassist/signin";
})

function openNotice(){
    noticePar.style.display="flex"
    createAccBtn.setAttribute('disabled','1');
    nameInput.setAttribute('disabled','1');
    idInput.setAttribute('disabled','1');
    emailInput.setAttribute('disabled','1');
    passInput.setAttribute('disabled','1');
}

function submitCreateAccReq(){
    nameInput.classList.remove("border-danger")
    nameNotice.textContent = "";
    idInput.classList.remove("border-danger")
    studIDNotice.textContent = "";
    emailInput.classList.remove("border-danger")
    emailNotice.textContent = "";
    passInput.classList.remove("border-danger")
    passNotice.textContent = "";

    const userName = nameInput.value
    const userStudId = idInput.value
    const userEmail = emailInput.value
    const userPass = passInput.value
    fetch ("/smc-webassist/register", {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, userStudId, userEmail, userPass})
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        if (data.statusCode=='53') {
            openNotice()
        } else if (data.statusCode=='52') {
            var form = document.querySelector('.needs-validation')
            form.classList.remove('was-validated')
            nameInput.classList.add("border-danger")
            nameNotice.textContent = data.message;
            console.log(form)
        } else {
            var form = document.querySelector('.needs-validation')
            form.classList.remove('was-validated')
            idInput.classList.add("border-danger")
            studIDNotice.textContent = data.message;
            console.log(form)
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function getSignUpLevel(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("level");
}

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
    if (showPassIndicator==true){
        showPassText();
        showPassIndicator=false;
        eyeIcon.classList.add("fa-eye-slash");
        eyeIcon.classList.remove("fa-eye");
        showPassIconDiv.style.opacity = "0.3";
    } else {
        showPassText();
        showPassIndicator=true;
        eyeIcon.classList.add("fa-eye");
        eyeIcon.classList.remove("fa-eye-slash");
        showPassIconDiv.style.opacity = "0.6";
    }
}

function showPassText() {
    if (passInput.type === "password") {
        passInput.type = "text";
        showPassIndicator=true;
    } else {
        passInput.type = "password";
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
                form.classList.remove('was-validated')
                if (nameInput.validity.patternMismatch) {
                    nameInput.classList.add("border-danger")
                    nameNotice.textContent = "Please enter a valid username."
                }
                if (idInput.validity.patternMismatch) {
                    idInput.classList.add("border-danger")
                    studIDNotice.textContent = "Please enter a valid student ID."
                }
                if (emailInput.validity.patternMismatch) {
                    idInput.classList.add("border-danger")
                    emailNotice.textContent = "Please enter a valid email."
                }
                if (passInput.validity.patternMismatch) {
                    passInput.classList.add("border-danger")
                    passNotice.textContent = "Special characters not allowed."
                }
            } else {
                event.preventDefault()
                submitCreateAccReq()
            }
            form.classList.add('was-validated')
        }, false)
        })
    })
()