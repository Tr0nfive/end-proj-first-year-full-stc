describe('Login to the cdc', () => { 

    beforeEach(()=>{
        cy.visit("http://localhost:5173/Pages/Register.html");

    })

    it("user not found no pass",()=>{
        cy.visit("http://localhost:5173/Pages/Login.html");
        cy.get("#userName-log").type("#skibidi");
        cy.get("#password-log")
        cy.get("#login_sub").click();
        cy.get("#user_error-log").should("be.visible").and("have.text","User name not found");
        cy.get("#pass_error-log").should("be.visible").and("have.text","Incorect password");
    })
    it("user found incro pass",()=>{
        cy.get("#userName").type("Eng!@#777");
        cy.get("#Email").type("hello@hello.com");
        cy.get("#password").type("123456");
        cy.get("#register_sub").click();
        cy.get("#userName-log").type("Eng!@#777");
        cy.get("#password-log").type("לשלשלשל");
        cy.get("#login_sub").click();
        cy.get("#user_error-log").should("be.hidden").and("have.text","");
        cy.get("#pass_error-log").should("be.visible").and("have.text","Incorect password");

    })
    it("all good",()=>{
        cy.get("#userName").type("eng123");
        cy.get("#Email").type("hello@hello.com");
        cy.get("#password").type("123456");
        cy.get("#register_sub").click();
        cy.get("#userName-log").type("eng123");
        cy.get("#password-log").type("123456");
        cy.get("#login_sub").click();
        cy.get("#user_error-log").should("be.hidden").and("have.text","");
        cy.get("#pass_error-log").should("be.hidden").and("have.text","");

    })
    it("user nothing pass !",()=>{
        cy.get("#userName").type("Eng!@#777");
        cy.get("#Email").type("hello@hello.com");
        cy.get("#password").type("123456");
        cy.get("#register_sub").click();
        cy.get("#userName-log")
        cy.get("#password-log").type("!");
        cy.get("#login_sub").click();
        cy.get("#user_error-log").should("be.visible").and("have.text","User name not found");
        cy.get("#pass_error-log").should("be.visible").and("have.text","Incorect password");
        
    })
    it(" צ and pas not pass ",()=>{
        cy.get("#userName").type("צ");
        cy.get("#Email").type("hello@hello.com");
        cy.get("#password").type("123456");
        cy.get("#register_sub").click();
        cy.get("#userName-log").type("צ");
        cy.get("#password-log").type("Pas 1");
        cy.get("#login_sub").click();
        cy.get("#user_error-log").should("be.hidden").and("have.text","");
        cy.get("#pass_error-log").should("be.visible").and("have.text","Incorect password");

    })

 })