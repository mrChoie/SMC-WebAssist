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
    // console.log("fetching user using token: ",token)

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
        // execute when fetching is successful
        // console.log(data)
        if (data.statusCode=='01') {
            
            // fetchStatus.classList.add("bg-success")
            
            fetchStatus.textContent = data.message
            userNameText.textContent = data.user.username
        } else {
            window.location.href = "/smc-webassist/signin";
            // fetchStatus.classList.add("bg-danger")
            // fetchStatus.textContent = data.message
            // window.location.href = "/smc-webassist/signin";
        }
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
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

// resetBtn.addEventListener("submit", function (event) {
//     event.preventDefault()
//     updateUser()
// })

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
            // execute when fetching is successful
            // console.log(data)
            forgotPassDiv.style.display = "flex"
            forgotPassParentDiv.style.display = "flex"

            setTimeout(()=>{
                window.location.href = "/smc-webassist/signin";
            },2000)
        })
        .catch(err => {
            console.log(err);
            // responseDiv.textContent = "Error fetching user.";
        });
    } else {
        // passForm.classList.remove("was-validated")
        // userPassInput.validity.valid = false
        // userPassConfirmInput.validity.valid = false
        // userPassInput.checkValidity()
        // userPassConfirmInput.checkValidity()
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
                // if (userPassInput.value==userPassConfirmInput.value){
                //     event.preventDefault()
                //     passForm.classList.remove("was-validated")
                    
                // } else {
                //     event.preventDefault()
                //     updateUser()
                // }
                event.preventDefault()
                updateUser()
            }
            form.classList.add('was-validated')
        }, false)
        })
    })
()