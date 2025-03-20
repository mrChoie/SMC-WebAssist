const logoutbtn  = document.getElementById("logoutBtn")

// logoutbtn.addEventListener("click", function (event) {
//     fetch ("/smc-webassist/logout", {
//         method: "GET",	
//         credentials: "include",
//         headers: {
//         "Content-Type": "application/json"
//         },
//     })
//     .then(res => {
//         if (!res.ok) {
//             throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         window.location.href = "/smc-webassist/home";
//     })
//     .catch(err => {
//         console.log(err);
//         // responseDiv.textContent = "Error fetching user.";
//     });
// })