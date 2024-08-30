// Function to check if the user exists in the local storage and validate their credentials
export function check_if_user_exist(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the username and password input values
    let username = document.querySelector("#userName-log").value;
    let password = document.querySelector("#password-log").value;
    console.log("username input = " + username);
    console.log("password input = " + password);

    // Retrieve users from local storage or initialize an empty array if no users exist
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let flag_pass = false; // Flag to indicate if the password matches
    let flag_user = false; // Flag to indicate if the user exists

    // Iterate through the list of users to check for matching username and password
    users.forEach(user => {
        console.log("user JSON = " + user.username);
        if (user.username === username) {
            flag_user = true; // User found
        }
        console.log("password JSON = " + user.password);
        if (user.password === password) {
            flag_pass = true; // Password matches
            return; // Exit the loop once password is matched
        }
    });

    // If both username and password are correct, set cookies, update the menu, and redirect to the homepage
    if (flag_user === true && flag_pass === true) {
        set_coockies();
        check_cookies();
        loged_in_menu();
        location.href = "../index.html";
    }

    // Handle errors if the username or password is incorrect
    if (flag_user === false) {
        document.querySelector("#user_error-log").style.visibility = "visible";
        document.querySelector("#user_error-log").innerHTML = "User name not found";
    } else {
        document.querySelector("#user_error-log").style.visibility = "hidden";
        document.querySelector("#user_error-log").innerHTML = "";
    }

    if (flag_pass === false) {
        document.querySelector("#pass_error-log").style.visibility = "visible";
        document.querySelector("#pass_error-log").innerHTML = "Incorect password";
    } else {
        document.querySelector("#pass_error-log").style.visibility = "hidden";
        document.querySelector("#pass_error-log").innerHTML = "";
    }
}

// Function to set cookies for the logged-in user
function set_coockies() {
    let username = document.querySelector('#userName-log').value;
    let password = document.querySelector('#password-log').value;

    // Set cookies with a max-age of 5 minutes, and secure them for HTTPS with Lax SameSite policy
    document.cookie = "Username=" + encodeURIComponent(username) + ";max-age=" + 60 * 5 + ";SameSite=Lax;Secure;path=/";
    document.cookie = "Password=" + encodeURIComponent(password) + ";max-age=" + 60 * 5 + ";SameSite=Lax;Secure;path=/";
    console.log(document.cookie);

    // Store the username and password in local storage for reference
    localStorage.setItem("Username", username);
    localStorage.setItem("Password", password);
}

// Function to check if the cookies match the user data stored in local storage
export function check_cookies() {
    let cookies = document.cookie.split(';'); // Split all cookies into an array
    console.log(cookies);
    let cookieMap = []; // Map to store cookies by name

    // Parse each cookie and store it in the map
    cookies.forEach(cookie => {
        let [name, value] = cookie.split('=').map(c => c.trim());
        cookieMap[name] = decodeURIComponent(value); // Decode cookie values
    });
    console.log(cookieMap);

    // Retrieve stored username and password from local storage
    let username = localStorage.getItem("Username");
    let password = localStorage.getItem("Password");
    console.log("local.Username = " + username);
    console.log("local.password = " + password);

    // Compare the cookies with the stored data and return the result
    if ((cookieMap["Username"] === username) && cookieMap["Password"] === password) {
        console.log("true");
        return true;
    } else {
        console.log("false");
        return false;
    }
}

// Function to update the menu visibility based on the user's login status
export function loged_in_menu() {
    let logd = check_cookies(); // Check if the user is logged in
    let menu_log = document.querySelector("#loged-in"); // Element for the logged-in menu
    let menu_un_log = document.querySelector("#un-login"); // Element for the logged-out menu

    // If the user is logged in, show the logged-in menu and hide the logged-out menu
    if (logd === true) {
        menu_un_log.style.visibility = "hidden";
        menu_log.style.visibility = "visible";
        document.querySelector("#user-id").innerHTML = localStorage.getItem("Username"); // Display the username
    }
    // If the user is not logged in, show the logged-out menu and hide the logged-in menu
    else if (logd === false) {
        menu_un_log.style.visibility = "visible";
        menu_log.style.visibility = "hidden";
    }
}