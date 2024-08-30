export class User {
    // Properties for the class
    username;
    email;
    password;

    // Constructor method that initializes the properties when a new instance of User is created
    constructor(username, email, password) {
        this.username = username; // Assigns the username parameter to the username property
        this.email = email;       // Assigns the email parameter to the email property
        this.password = password; // Assigns the password parameter to the password property
    }
}