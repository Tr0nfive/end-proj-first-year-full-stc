describe('login ', () => { 

    beforeEach( ()=>{

        cy.clearAllLocalStorage()
        cy.visit("http://localhost:5173/Pages/Register.html");
        cy.get("#userName").type("GiaBuster");
        cy.get("#Email").type("hello@hello.com");
        cy.get("#password").type("123456");
        cy.get("#register_sub").click();
        // cy.visit("http://localhost:5173/Pages/Login.html");

    })
    
        
    it("login user name faild and password faild",()=>{
        cy.get("#userName-log").should("be.visible").type("giaBuster");
        cy.get("#password-log").should("be.visible").type("123459");
        cy.get("#login_sub").click();
        cy.get("#user_error-log").should("be.visible").and("have.text","User name not found");
        cy.get("#pass_error-log").should("be.visible").and("have.text","Incorect password");

    })
    it("login user name faild",()=>{
        cy.get("#userName-log").should("be.visible").type("giaBuster");
        cy.get("#password-log").should("be.visible").type("123456");
        cy.get("#login_sub").click();
        cy.get("#user_error-log").should("be.visible").and("have.text","User name not found");
        cy.get("#pass_error-log").should("be.hidden").and("have.text","");
    })
    it("login password faild",()=>{
        cy.get("#userName-log").should("be.visible").type("GiaBuster");
        cy.get("#password-log").should("be.visible").type("123459");
        cy.get("#login_sub").click();
        cy.get("#user_error-log").should("be.hidden").and("have.text","");
        cy.get("#pass_error-log").should("be.visible").and("have.text","Incorect password");

    })



})