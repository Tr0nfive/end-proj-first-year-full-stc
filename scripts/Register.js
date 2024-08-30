import { users } from "./database/user.db";
import { User } from "./database/User_cla";

export function check_inputs(event) {
    event.preventDefault(); 
    let flag_user = true;  // Flags are used to ensure that all validation checks pass before proceeding
    let flag_email = true;
    let flag_pass = true;

    let user = document.querySelector("#userName").value;  // Get the username input value
    let user_error = document.querySelector("#user_error"); // Get the error message element for the username input
    let email = document.querySelector("#Email").value;    // Get the email input value
    let email_error = document.querySelector("#email_error"); // Get the error message element for the email input
    let pass = document.querySelector("#password").value;   // Get the password input value
    let pass_error = document.querySelector("#pass_error"); // Get the error message element for the password input

    let exist = JSON.parse(localStorage.getItem("users")) || []; // Fetch existing users from local storage to check if the username already exists
    let flag = false;

    // Check if the entered username already exists
    for (let i = 0; i < exist.length; i++) {
        if (exist[i].username === user) {
            flag = true;
        }
    }

    // Validate username: must not exist, contain spaces, or be empty
    if (flag === true) {
        user_error.style.visibility = "visible"; 
        user_error.innerHTML = "User name already exist"; // Note: Cypress may have a bug that prevents this error from showing, but it should work manually
        flag_user = false;                                 
    } else if (user.includes(" ") == true) {
        user_error.style.visibility = "visible";
        user_error.innerHTML = "user name must not have space";
        flag_user = false;
    } else if (user === "") {
        user_error.style.visibility = "visible";
        user_error.innerHTML = "user name cannot be empty";
        flag_user = false;
    } else {
        user_error.style.visibility = "hidden";
        user_error.innerHTML = "";
        flag_user = true;
    }

    // Validate email: must contain '@', '.com', and must not contain spaces
    if (email.includes("@") == false || email.includes(".com") == false || email.includes(" ") == true) { 
        email_error.style.visibility = "visible";
        email_error.innerHTML = "invalid Email Address";
        flag_email = false;
    } else {
        email_error.style.visibility = "hidden";
        email_error.innerHTML = "";
        flag_email = true;
    }

    // Validate password: must be at least 6 characters, must not contain spaces, and must be alphanumeric
    let num_leter = /^[0-9a-zA-Z]*$/;
    if (pass.length < 6) {
        pass_error.style.visibility = "visible";
        pass_error.innerHTML = "Weak Password must have at least 6 characters";
        flag_pass = false;
    } else if (pass.includes(" ")) {
        pass_error.style.visibility = "visible";
        pass_error.innerHTML = "Password must not contains space";
        flag_pass = false;
    } else if (!num_leter.test(pass)) {
        pass_error.style.visibility = "visible";
        pass_error.innerHTML = "invalid password";
        flag_pass = false; 
    } else {
        pass_error.style.visibility = "hidden";
        flag_pass = true;
    }

    // If all validation checks pass, the user is added to the database and redirected to the login page
    if (flag_email && flag_pass && flag_user) {     
        add_user();  // Add the user to the local storage database
        location.href = "./Login.html";  // Redirect to the login page
    }
}

function add_user() {  // Function to add a user to the local storage array using the User class
    let name = document.querySelector("#userName").value;
    let email = document.querySelector("#Email").value;
    let password = document.querySelector("#password").value;

    let user = new User(name, email, password);  // Create a new User object with the provided name, email, and password
    users.push(user);  // Add the new User object to the users array

    localStorage.setItem('users', JSON.stringify(users));  // Save the updated users array back to local storage
    users.forEach(user => { console.log(user); });  // Print all the users saved so far for verification
}