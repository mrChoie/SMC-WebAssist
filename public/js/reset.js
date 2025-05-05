const userPass = document.getElementById("userPass")
const userPassConfirm = document.getElementById("userPassConfirm")
const userNameText = document.getElementById("userNameText")

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
        console.log(data)
        if (data.statusCode=='00') {
            window.location.href = "/smc-webassist/signin";
        } else {
            userNameText.textContent = data.user.username
        }
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

function showPass() {
    if (userPass.type === "password") {
      userPass.type = "text";
      userPassConfirm.type = "text";
    } else {
      userPass.type = "password";
      userPassConfirm.type = "password";
    }
}

function updateUser(){
    const newPass = userPass.value
    const newPassConfirm = userPassConfirm.value

    if (userPass==userPassConfirm){
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
                event.preventDefault()
                updateUser()
            }
            form.classList.add('was-validated')
        }, false)
        })
    })
()