const profileName = document.getElementById("userProfileName")
const profileStudId = document.getElementById("userProfileStudId")
const profileDate = document.getElementById("userProfileDateCreated")


window.onload; {

    const category = 0;

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
        // console.log(data)
        profileName.textContent=data.user.username
        profileStudId.textContent=data.user.stud_id
        profileDate.textContent="Joined since "+ data.user.user_timestamp.split('T')
        

    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}