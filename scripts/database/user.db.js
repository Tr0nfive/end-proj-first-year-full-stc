import { User } from './User_cla.js';  // Import the User class from the User_cla.js file

// Initialize a base array with a default admin user
let base = [
    new User("admin", "admin@ad.com", "123456") // Creates a new User object with default credentials
];

// Retrieve the users array from localStorage, or use the base array if localStorage is empty
export const users = JSON.parse(localStorage.getItem('users')) || base;