
window.onload; {
    const urlParams = new URLSearchParams(window.location.search);
    const tktID = urlParams.get("id");

    fetch ('/smc-webassist/view-ticket/ticket/'+tktID, {
        method: "GET",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        // body: JSON.stringify({ tktID })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        console.log(data)
        // window.location.href = "/smc-webassist/view-ticket/ticket/"+data.ticket.tktID;
        history.replaceState({}, '', "/smc-webassist/view-ticket/ticket/"+data.ticket.tktID);
        // tkOwner2.value = data.user.username;
        // tkOwnerID2.value = data.user.stud_id;
        // tkOwner.value = data.user.username;
        // tkOwnerdbid.value = data.user.stud_id;
        // categoryTitle.textContent = data.categoryTitle.categoryTitle 
        // categoryID.value = data.categoryTitle.categoryId
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}