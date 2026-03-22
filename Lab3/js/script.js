// Event Listeners
document.querySelector("#zip").addEventListener("input", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#pwd").addEventListener("focus", suggestPassword);
document.querySelector("#signupForm").addEventListener("submit", validateForm);

loadStates();

async function loadStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();
    console.log("States API data:", data);
    let stateSelect = document.querySelector("#state");

    stateSelect.innerHTML = "<option value=''>Select State</option>";
    data.forEach(state => {
        stateSelect.innerHTML += `<option value="${state.usps.toLowerCase()}">${state.state}</option>`;
    });
}

async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let zipError = document.querySelector("#zipError");

    if (zipCode.length !== 5) {
        zipError.innerHTML = "";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#lat").innerHTML = "";
        document.querySelector("#lon").innerHTML = "";
        return;
    }

    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("Zip API data:", data);

    if (!data.city) {
        zipError.innerHTML = "Zip code not found";
    } else {
        zipError.innerHTML = "";
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#lat").innerHTML = data.latitude;
        document.querySelector("#lon").innerHTML = data.longitude;
    }
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("County API data:", data);

    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option>Select County</option>";
    data.forEach(item => {
        countyList.innerHTML += `<option>${item.county}</option>`;
    });
}

async function checkUsername() {
    let username = document.querySelector("#username").value.trim();
    let usernameError = document.querySelector("#usernameError");
    if (username === "") {
        usernameError.innerHTML = "";
        return;
    }

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("Username API data:", data);

    let isAvailable = data.available === true || 
                    data.usernameAvailable === true || 
                    data.available === "true";

    if (isAvailable) {
        usernameError.innerHTML = "Username available!";
        usernameError.className = "feedback-slot text-success-custom";
    } else {
        usernameError.innerHTML = "Username taken";
        usernameError.className = "feedback-slot text-error-custom";
    }
} 

function suggestPassword() {
    let suggestion = Math.random().toString(36).slice(-8);
    document.querySelector("#suggestedPwd").innerHTML =
        `Suggested: <strong>${suggestion}</strong>`;

    document.querySelector("#pwd").removeEventListener("focus", suggestPassword);
}

async function validateForm(e) {
    let isValid = true;
    
    let password = document.querySelector("#pwd").value;
    let passwordAgain = document.querySelector("#pwdAgain").value;
    let passwordError = document.querySelector("#passwordError");
    passwordError.innerHTML = "";

    if (password.length < 6) { 
        isValid = false;
        passwordError.innerHTML = "Password must be at least 6 characters.<br>";
    }

    if (password !== passwordAgain) {
        isValid = false;
        passwordError.innerHTML += "Passwords do not match!";
    }

    let username = document.querySelector("#username").value.trim();
    let usernameError = document.querySelector("#usernameError");

    if (username === "") {
        isValid = false;
        usernameError.innerHTML = "Username is required";
        usernameError.className = "feedback-slot text-error-custom";
    } else {
        let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            let isAvailable = data.available === true || data.usernameAvailable === true || data.available === "true";

            if (!isAvailable) {
                isValid = false;
                usernameError.innerHTML = "Username taken - please choose another";
                usernameError.className = "feedback-slot text-error-custom";
            }
        } catch (error) {
            console.error("Validation error:", error);
        }
    }

    if (!isValid) {
        e.preventDefault();
    }
}