const userPassInput = document.getElementById("userPass")
const userPassConfirmInput = document.getElementById("userPassConfirm")
const userNameText = document.getElementById("userNameText")
const fetchStatus = document.getElementById("fetchStatus")
const resetBtn = document.getElementById("resetBtn")

const forgotPassParentDiv = document.getElementById("forgotPassParentDiv")
const forgotPassDiv = document.getElementById("forgotPassDiv")
const passMismatchNotice = document.getElementById("passMismatchNotice")

const passForm = document.getElementById("passForm")

window.onload; {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    fetch ('/getInfoByToken/Token', {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        if (data.statusCode=='01') {
            fetchStatus.textContent = data.message
            userNameText.textContent = data.user.username
        } else {
            window.location.href = "/smc-webassist/signin";
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function showPass() {
    if (userPass.type === "password") {
      userPassInput.type = "text";
      userPassConfirmInput.type = "text";
    } else {
      userPassInput.type = "password";
      userPassConfirmInput.type = "password";
    }
}

function updateUser(){
    const userPass = userPassInput.value
    const userPassConfirm = userPassConfirmInput.value

    if (userPass==userPassConfirm){
        fetch ('/updateUser/update-password', {
            method: "POST",	
            credentials: "include",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ userPass })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json(); // Parse JSON response
        })
        .then(data => {
            forgotPassDiv.style.display = "flex"
            forgotPassParentDiv.style.display = "flex"

            setTimeout(()=>{
                window.location.href = "/smc-webassist/signin";
            },2000)
        })
        .catch(err => {
            console.log(err);
        });
    } else {
        passForm.classList.remove("was-validated")
        userPassInput.value = ""
        userPassConfirmInput.value = ""
        console.log(userPassInput.checkValidity())
        console.log(userPassConfirmInput.checkValidity())
        userPassInput.value = userPass
        userPassConfirmInput.value = userPassConfirm
        console.log(userPass, userPassConfirm)

        userPassInput.classList.add("border-danger",)
        userPassConfirmInput.classList.add("border-danger")
        passMismatchNotice.style.display = "flex"
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
                updateUser()
            }
            form.classList.add('was-validated')
        }, false)
        })
    })
()