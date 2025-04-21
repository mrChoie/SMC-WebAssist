const nameInput = document.getElementById("userName")
const idInput = document.getElementById("userStudId")
const passInput = document.getElementById("userPass")
const responseDiv = document.getElementById("responseUserIsExist")
// const passConfirmInput = document.getElementById("passConfirm")
const eyeIcon = document.getElementById("showPassIcon")
const showPassIconDiv = document.getElementById("showPassIconDiv")
const noticePar = document.getElementById("noticeParent")
const proceedBtn = document.getElementById("proceedBtn")
const createAccBtn = document.getElementById("createAccBtn")
var showPassIndicator=false;

nameInput.addEventListener("keydown", function (event) {
    nameInput.classList.remove("border-danger")
    responseDiv.textContent = "";
})

proceedBtn.addEventListener("click", function (event) {
    window.location.href = "/smc-webassist/signin";
})

function openNotice(){
    noticePar.style.display="flex"
    createAccBtn.setAttribute('disabled','1');
    nameInput.setAttribute('disabled','1');
    idInput.setAttribute('disabled','1');
    passInput.setAttribute('disabled','1');
}

function submitCreateAccReq(){
    const userName = nameInput.value
    const userStudId = idInput.value
    const userPass = passInput.value
    const userLevel = getSignUpLevel()
    fetch ("/smc-webassist/register", {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, userStudId, userPass, userLevel})
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        // do function
        // console.log(data)
        if (data.statusCode=='50') {
            // console.log(data)
            noticePar.style.display="flex"
            createAccBtn.setAttribute('disabled','1');
            nameInput.setAttribute('disabled','1');
            idInput.setAttribute('disabled','1');
            passInput.setAttribute('disabled','1');
            // loadsignin()
            // window.location.href = "/smc-webassist/signin";
            // console.log(data.message, data.statusCode)
            // responseDiv.textContent = data.message;
        } else {
            // console.log(data)
            // nameInput.checkValidity
            // form.classList.add('was-validated')
            var form = document.querySelector('.needs-validation')
            
            form.classList.remove('was-validated')
            // form.classList.add('was-validated')
            nameInput.classList.add("border-danger")
            responseDiv.textContent = data.message;
            console.log(form)
        }
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
    // .then(res => console.log(res))
    // .then(data => (responseDiv.textContent = data))  
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
        // console.log("pass hide");
    } else {
        showPassText();
        showPassIndicator=true;
        eyeIcon.classList.add("fa-eye");
        eyeIcon.classList.remove("fa-eye-slash");
        showPassIconDiv.style.opacity = "0.6";
        // console.log("pass show");
    }
}

function showPassText() {
    if (passInput.type === "password") {
        passInput.type = "text";
        // passConfirmInput.type = "text";
        showPassIndicator=true;
    } else {
        passInput.type = "password";
        // passConfirmInput.type = "password";
        showPassIndicator=false;
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)

        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            // console.log("form object value: ",forms)
            } else {
                event.preventDefault()
                submitCreateAccReq()
            }
            form.classList.add('was-validated')
        }, false)
        })
    })
()