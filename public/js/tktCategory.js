const tkOwner2 = document.getElementById("ticketStudName2")
const tkOwnerID2 = document.getElementById("ticketIdNum2")
const tkOwner = document.getElementById("ticketStudName")
const tkOwnerdbid = document.getElementById("ticketIdNum")
const tkSubj = document.getElementById("ticketSubj")
const tkDesc = document.getElementById("ticketDesc")
const categoryTitle = document.getElementById("categoryTitle")
const ticketFile = document.getElementById("ticketFile")
const buildCat = document.getElementById("buildCat")
const inqCat = document.getElementById("inqCat")
const noticePar = document.getElementById("noticeParent")
const succBtn = document.getElementById("successBtn")
const blurDiv = document.getElementById("ticketBodyContent1")
const submitBtn = document.getElementById("submitBtn")
const tosCheckBox = document.getElementById("tosCheckBox")

window.onload; {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const building = urlParams.get("building");

    fetch ('/getInfo/category', {
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
        tkOwner2.value = data.user.student_name;
        tkOwnerID2.value = data.user.stud_id;
        tkOwner.value = data.user.student_name;
        tkOwnerdbid.value = data.user.stud_id;
        categoryTitle.textContent = data.categoryTitle.categoryTitle 
        inqCat.value = category
        buildCat.value = building
    })
    .catch(err => {
        console.log(err);
    });
}

function clearFields(){
    window.location.href = "/smc-webassist/account";
}

tosCheckBox.addEventListener("click", function(e) {
    if (e.target.checked) {
        submitBtn.classList.remove("disabled")
    } else {
        submitBtn.classList.add("disabled")
    }
})

function submitTicket() {
    
    const tktOwner = tkOwner.value;
    const tktOwnerDBid = tkOwnerdbid.value;
    const tktSubj = tkSubj.value;
    const tktDesc = tkDesc.value;
    const tktFile = ticketFile.file;
    const inqCat = document.getElementById("inqCat").value;
    const buildCat = document.getElementById("buildCat").value;

    fetch ("/smc-webassist/ticket/submit", {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({inqCat, buildCat, tktOwner, tktOwnerDBid, tktSubj, tktDesc, tktFile})
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        if (data.statusCode == '40') {
            tkSubj.setAttribute('disabled','1');
            tkDesc.setAttribute('disabled','1');
            ticketFile.setAttribute('disabled','1');
            noticePar.style.display="flex"
            blurDiv.style.zIndex= '-1'
        }
    })
    .catch(err => {
        console.error("Fetch error:", err);
    });
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
            submitTicket()
        }
        form.classList.add('was-validated')
        }, false)
    })
})()