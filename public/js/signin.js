const responseDivSuccess = document.getElementById("responseSuccess")
const responseDivInvalidPass = document.getElementById("responseDivInvalidPass")
const responseDivUserNotExist = document.getElementById("responseUserNotExist")
const usernameInput = document.getElementById("userName")
const passwordInput = document.getElementById("userPass")
const signBtn = document.getElementById("signBtn")

signBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault(); // Prevent form submission if needed
    const userName = usernameInput.value;
    const userPass = passwordInput.value;
    login(userName, userPass);
});

passwordInput.addEventListener("keydown", function (event) {
    responseDivInvalidPass.textContent = "";
})
usernameInput.addEventListener("keydown", function (event) {
    responseDivUserNotExist.textContent = "";
    responseDivInvalidPass.textContent = "";
})

function login(userName, userPass) {
    fetch ("/smc-webassist/login", {
        method: "POST",	
        credentials: "include",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, userPass })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json(); // Parse JSON response
    })
    .then(data => {
        console.log(data);
        if (data.statusCode == '11') {
            // document.cookie = `accessToken=${data.user.username}; path=/; expires=${new Date(Date.now() + 1000*60*60*2).toUTCString()}`
            // document.cookie("user", data.user.username)
            // console.log("user", data.user.username)
            // console.log(data)
            // localStorage.setItem("user", JSON.stringify(data.user.username));
            window.location.href = "/smc-webassist/home";
        } else if (data.statusCode == '01') {
            responseDivUserNotExist.textContent = data.message; // Display the result
        } else {
            responseDivInvalidPass.textContent = data.message; // Display the result
        }
    })
    .catch(err => {
        console.log(err);
        // responseDiv.textContent = "Error fetching user.";
    });
    // .then(res => console.log(res))
    // .then(data => (responseDiv.textContent = data))  
}









var showPassIndicator=false;

function showPassIcon(){
  let divBox = document.getElementById("showPassIconDiv");
  let userPass = document.getElementById("userPass");
  if (userPass.value!=""){
    divBox.style.display = "flex";
  } else {
    divBox.style.display = "none";
    let eyeIcon = document.getElementById("showPassIcon");
  }
}

function showHidePass(){
  let eyeIcon = document.getElementById("showPassIcon");
  let opacityIcon = document.getElementById("showPassIconDiv");
  if (showPassIndicator==true){
    showPassText();
    showPassIndicator=false;
    eyeIcon.classList.add("fa-eye-slash");
    eyeIcon.classList.remove("fa-eye");
    opacityIcon.style.opacity = "0.3";
    // console.log("pass hide");
  } else {
    showPassText();
    showPassIndicator=true;
    eyeIcon.classList.add("fa-eye");
    eyeIcon.classList.remove("fa-eye-slash");
    opacityIcon.style.opacity = "0.6";
    // console.log("pass show");
  }
}

function showPassText() {
  var x = document.getElementById("userPass");
  if (x.type === "password") {
    x.type = "text";
    showPassIndicator=true;
  } else {
    x.type = "password";
    showPassIndicator=false;
  }
}