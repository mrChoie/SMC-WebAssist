const ul = document.getElementById("feedList");

window.onload = function() {
    document.getElementById("feedbackBtn").style.display="none";

    fetch ('/getFeeds', {
        method: "GET",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        }
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
        displayFeeds(data)
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
}



displayFeeds = (feeds) => {
    console.log(feeds)
    for (x = 0; x<feeds.numOfFeeds; x++) {
        var li = document.createElement("li");
        var rowDiv= document.createElement("div");
        var pDivID= document.createElement("div");
        var pDivTitle= document.createElement("div");
        var pDivDesc= document.createElement("div");
        var pDivDate= document.createElement("div");
        var pID = document.createElement("p");
        var pTitle = document.createElement("p");
        var pPrevDesc = document.createElement("p");
        var pDesc = document.createElement("p");
        var pDate = document.createElement("p");

        li.classList.add("feedListItem")
        rowDiv.classList.add("row","p-1");
        pDivID.classList.add("col-sm-1","text-sm-center")
        pDivTitle.classList.add("col-sm-2")
        pDivDesc.classList.add("col-sm-8")
        pDivDate.classList.add("col-sm-1")
        pID.classList.add("m-0")
        pTitle.classList.add("m-0","fw-bold")
        pPrevDesc.classList.add("m-0","feedPrevDesc","d-flex","closed")
        pDesc.classList.add("m-0","feedDesc","d-none")
        pDate.classList.add("m-0","feedDate")
        
        pID.textContent = feeds.feedbacks[x].feedID;
        pTitle.textContent = feeds.feedbacks[x].feedbackTitle;
        pPrevDesc.textContent = feeds.feedbacks[x].feedbackDesc.substring(0, 60);
        pDesc.textContent = feeds.feedbacks[x].feedbackDesc;
        pDate.textContent = feeds.feedbacks[x].formatted_time;
        // pID.textContent = "idddd";
        // pTitle.textContent = "titleeee";
        // pDesc.textContent = "descccccc";
        // pDate.textContent = "DATEEEE";

        ul.appendChild(li);
        li.appendChild(rowDiv);
        rowDiv.appendChild(pDivID);
        rowDiv.appendChild(pDivTitle);
        rowDiv.appendChild(pDivDesc);
        rowDiv.appendChild(pDivDate);
        pDivID.appendChild(pID);
        pDivTitle.appendChild(pTitle);
        pDivDesc.appendChild(pPrevDesc);
        pDivDesc.appendChild(pDesc);
        pDivDate.appendChild(pDate);

        li.addEventListener("click", function(event) {
            console.log("clicked")
            if (event.target.classList.contains("closed")) {
                event.target.classList.remove("d-flex","closed")
                event.target.classList.add("d-none","opened")
                event.target.nextElementSibling.classList.remove("d-none")
                event.target.nextElementSibling.classList.add("d-flex")
            } 
            else {
                event.target.previousSibling.classList.add("d-flex","closed")
                event.target.previousSibling.classList.remove("d-none","opened")
                event.target.classList.remove("d-flex")
                event.target.classList.add("d-none")
            }
            
        })
    }
}