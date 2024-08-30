import { check_inputs } from "./Register.js";  // Import function to validate registration inputs
import { loged_in_menu, check_if_user_exist, check_cookies } from "./Login.js";  // Import functions for logged-in menu, user existence check, and cookie validation

// Execute loged_in_menu() when the window loads
window.onload = loged_in_menu();

/* 
  Registration Page Logic:
  - If the current URL contains "Register", it checks if the user is already logged in using cookies.
  - If the user is logged in, an alert is displayed and the user is redirected to the homepage.
  - If not logged in, it adds an event listener to the register button to validate inputs upon submission.
*/
if (document.URL.includes("Register") == true) {
    if (check_cookies() == true) {
        alert("You can't enter the register page if you are logged in. Redirecting to home base.");
        location.href = "../index.html";  // Redirect to the homepage
    }

    // Add event listener for the registration submission button
    document.querySelector("#register_sub").addEventListener('click', check_inputs);
}

/* 
  Login Page Logic:
  - If the current URL contains "Login", it checks if the user is already logged in using cookies.
  - If the user is logged in, an alert is displayed and the user is redirected to the homepage.
  - If not logged in, it adds an event listener to the login button to check if the user exists upon submission.
*/
if (document.URL.includes("Login")) {
    if (check_cookies() == true) {
        alert("You can't enter the login page if you are logged in. Redirecting to home base.");
        location.href = "../index.html";  // Redirect to the homepage
    }

    // Add event listener for the login submission button
    document.querySelector("#login_sub").addEventListener('click', check_if_user_exist);
}

// Add event listener for the logout button
document.querySelector("#logout").addEventListener('click', Logout);

/* 
  Logout Function:
  - This function clears the user's cookies for "Username" and "Password".
  - It effectively logs the user out by deleting their session data stored in cookies.
*/
function Logout() {
    // Remove cookies for "Username" and "Password" by setting their expiration dates to the past
    document.cookie = "Username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure;path=/";
    document.cookie = "Password=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure;path=/";
}

if(document.URL.includes("Banner")){
  if (check_cookies() == false) {
    alert("You can't enter the Banner Editor page if you are un-signup. Please signup or login.");
    location.href = "./Register.html";  // Redirect to the Register
}
}
if(document.URL.includes("Marketing")){
  if (check_cookies() == false) {
    alert("You can't enter the Marketing page if you are un-signup. Please signup or login.");
    location.href = "./Register.html";  // Redirect to the Register
}
}