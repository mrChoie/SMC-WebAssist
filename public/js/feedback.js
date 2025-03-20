const feedbackTitle = document.getElementById("feedbackTitle")
const feedbackDesc = document.getElementById("feedbackDesc")
const feedbackFile = document.getElementById("feedbackFile")
const feedbackBtn = document.getElementById("feedbackBtn")
const noticePar = document.getElementById("noticeParent")
const succBtn = document.getElementById("successBtn")
const blurDiv2 = document.getElementById("feedbackContent1")

function clearFields(){
    location.reload();
}

function submitFeedback() {
    const title = feedbackTitle.value;
    const desc = feedbackDesc.value;
    const file = feedbackFile.value;
    fetch ("/smc-webassist/submit/feedback", {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, desc, file})
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        // console.log(data)
        if (data.statusCode == '30') {
            // do function
            // console.log(data.message)
            noticePar.style.display="flex"
            
        }
    })
    .catch(err => {
        console.error("Fetch error:", err);
    });
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
        } else {
            // Call function if all fields are valid
            event.preventDefault()
            submitFeedback()
        }
        form.classList.add('was-validated')
        }, false)
    })
})()