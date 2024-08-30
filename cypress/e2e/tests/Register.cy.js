
// import { users } from "./scripts/database/user.db.js";

describe('Register vladitain form', () => { 
    
    beforeEach(()=>{
        cy.visit('http://localhost:5173/pages/Register.html');
        cy.get("#register_link").click();
    })
    it( 'register should be exist' , ()=>{

        
        
        cy.get("#userName").should('be.visible').and('have.attr','placeholder','Username');
        cy.get("#user_error").should("be.hidden").and("have.text","");

        cy.get("#Email").should('be.visible').and('have.attr','placeholder','Email');
        cy.get("#email_error").should("be.hidden").and("have.text","");

        cy.get("#password").should('be.visible').and('have.attr','placeholder','Password');
        cy.get("#pass_error").should("be.hidden").and("have.text","");

        

        cy.get("#register_sub").should('be.visible');
    })  

    //username tests 
    it('register username for _Hello',()=>{

        cy.get("#userName").type("  Hello");
        cy.get("#Email").type("Hello@toYou.com");
        cy.get("#password").type('Pa123456');
        cy.get("#register_sub").click();
        cy.get("#user_error").should("be.visible").and("have.text",'user name must not have space');
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.hidden").and("have.text","");
    })

    it('register username for admin (username already exist in the system)',()=>{

        cy.get("#userName").type("admin");
        cy.get("#Email").type("Hello@toYou.com");
        cy.get("#password").type('Pa123456');
        cy.get("#register_sub").click();
        cy.get("#user_error").should("be.visible").and("have.text",'User name already exist');
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.hidden").and("have.text","");
    })

    //email tests 
    it('register error email',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello.dwa');
        cy.get('#password').type('123456');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.visible").and("have.text","invalid Email Address");

    })
    it('register error email without @',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hellodwa.com');
        cy.get('#password').type('a123456');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.visible").and("have.text","invalid Email Address");
        cy.get("#pass_error").should("be.hidden").and("have.text","");

    })
    it('register error email without .com',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hellodwa@dwaa');
        cy.get('#password').type('123456');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.visible").and("have.text","invalid Email Address");
        cy.get("#pass_error").should("be.hidden").and("have.text","");

    })
    it('register error email with space',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello dwa@dwaa.com');
        cy.get('#password').type('123456');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.visible").and("have.text","invalid Email Address");
        cy.get("#pass_error").should("be.hidden").and("have.text","");

    })

    //passsword tests
    it('register error password for !12356',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello@dwa.com');
        cy.get('#password').type('!123456');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.visible").and("have.text","invalid password");
        

    })
    it('register error password for !Pa4356',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello@dwa.com');
        cy.get('#password').type('!Pa3456');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.visible").and("have.text","invalid password");

    })
    it('register error password for Pa123',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello@dwa.com');
        cy.get('#password').type('Pa123');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.visible").and("have.text","Weak Password must have at least 6 characters");

    })
    it('register error password for #d123',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello@dwa.com');
        cy.get('#password').type('#d123');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.visible").and("have.text","Weak Password must have at least 6 characters");


    })
    it('register error password for Pa 1234',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello@dwa.com');
        cy.get('#password').type('Pa 1234');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.visible").and("have.text","Password must not contains space");


    })
    it('register error password for _Pa1234',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello@dwa.com');
        cy.get('#password').type(' Pa1234');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.visible").and("have.text","Password must not contains space");


    })
    it('register error password for Pa1234_',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hello@dwa.com');
        cy.get('#password').type('Pa1234 ');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.visible").and("have.text","Password must not contains space");

    })
    



    //errors for both the password and the username;
    it('register error password for dwa@1234 and invaild email',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('hellodwa.com');
        cy.get('#password').type('dwa@1234');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.visible").and("have.text","invalid Email Address");
        cy.get("#pass_error").should("be.visible").and("have.text","invalid password");

    })
    it('register complite password for Pa1234 and Hello@toYou.com',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('Hello@toYou.com');
        cy.get('#password').type('Pa1234');
        cy.get('#register_sub').click();
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.hidden").and("have.text","");

    })
    it('checking if user is secsfullly saved in the local storge',()=>{

        cy.get("#userName").type("hello");
        cy.get('#Email').type('Hello@toYou.com');
        cy.get('#password').type('Pa1234');
        cy.get('#register_sub').click();
        cy.get("#user_error").should("be.hidden").and("have.text","");
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").should("be.hidden").and("have.text","");
        cy.window().then((win) => {
            const users = JSON.parse(win.localStorage.getItem('users'));
            const username = users.some(user => user.username === 'hello');
            const email = users.some(user => user.email === 'Hello@toYou.com');
            const password = users.some(user => user.password === 'Pa1234');

            expect(username).to.be.true;
            expect(email).to.be.true;
            expect(password).to.be.true;

        })
    })
})
