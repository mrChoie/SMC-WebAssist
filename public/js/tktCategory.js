const tkOwner2 = document.getElementById("ticketStudName2")
const tkOwnerID2 = document.getElementById("ticketIdNum2")
const tkOwner = document.getElementById("ticketStudName")
const tkOwnerdbid = document.getElementById("ticketIdNum")
const tkSubj = document.getElementById("ticketSubj")
const tkDesc = document.getElementById("ticketDesc")
const categoryTitle = document.getElementById("categoryTitle")
const ticketFile = document.getElementById("ticketFile")
const categoryID = document.getElementById("categoryID")
const noticePar = document.getElementById("noticeParent")
const succBtn = document.getElementById("successBtn")
const blurDiv = document.getElementById("ticketBodyContent1")

window.onload; {

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    fetch ('/getInfo', {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ category })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        console.log(data)
        tkOwner2.value = data.user.username;
        tkOwnerID2.value = data.user.stud_id;
        tkOwner.value = data.user.username;
        tkOwnerdbid.value = data.user.stud_id;
        categoryTitle.textContent = data.categoryTitle.categoryTitle 
        categoryID.value = data.categoryTitle.categoryId
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}

function clearFields(){
    window.location.href = "/smc-webassist/category";
}

function submitTicket() {
    
    const tktOwner = tkOwner.value;
    const tktOwnerDBid = tkOwnerdbid.value;
    const tktSubj = tkSubj.value;
    const tktDesc = tkDesc.value;
    const tktFile = ticketFile.file;
    const categoryId = categoryID.value;

    fetch ("/smc-webassist/ticket/submit", {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({categoryId, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile})
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        // console.log(data)
        if (data.statusCode == '40') {
            // do function
            // console.log(data.message)
            noticePar.style.display="flex"
            blurDiv.style.zIndex= '-1'
            blurDiv.style.filter ="blur(1px)"
            
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
            submitTicket()
        }
        form.classList.add('was-validated')
        }, false)
    })
})()