describe('Register for std dises', () => { 
    
    beforeEach(()=>{
        cy.visit("http://localhost:5173/Pages/Register.html");
    })
    it("null in email and pass user name pass hew,nums,spac",()=>{
        cy.get("#userName").type("הנדסאי123!!!");
        cy.get("#Email").type("");
        cy.get("password").type("");
        cy.get("#register_sub").click();
        cy.get("#user_error").should("be.hidden").and("have.text","");
        cy.get("#email_error").should("be.visible").and("have.text","invalid Email Address");
        cy.get("#pass_error").shuold("be.visible").and("have.text","Weak Password must have at least 6 characters");

    })
    it("null in email and pass user name pass hew,nums,spac",()=>{
        cy.get("#userName").type("הנדסאי!!!");
        cy.get("#Email").type("awdujnadwiklawl@hello.com");
        cy.get("password").type("A1");
        cy.get("#register_sub").click();
        cy.get("#user_error").should("be.hidden").and("have.text","");
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").shuold("be.visible").and("have.text","Weak Password must have at least 6 characters");

    })
    it("user good email good pass weak",()=>{

            cy.get("#userName").type("Eng!@#777");
            cy.get("#Email").type("+@hello.com");
            cy.get("password").type("A");
            cy.get("#register_sub").click();
            cy.get("#user_error").should("be.hidden").and("have.text","");
            cy.get("#email_error").should("be.hidden").and("have.text","");
            cy.get("#pass_error").shuold("be.visible").and("have.text","Weak Password must have at least 6 characters");
    })

    it("again",()=>{

        cy.get("#userName").type("הנדסאי123");
        cy.get("#Email").type("hhhhh@hello.com");
        cy.get("password").type("א");
        cy.get("#register_sub").click();
        cy.get("#user_error").should("be.hidden").and("have.text","");
        cy.get("#email_error").should("be.hidden").and("have.text","");
        cy.get("#pass_error").shuold("be.visible").and("have.text","Weak Password must have at least 6 characters");
    })

    it("user good email and pass baaaad",()=>{
    
        cy.get("#userName").type("eng123");
        cy.get("#Email").type("i am@hello.com");
        cy.get("password").type("!");
        cy.get("#register_sub").click();
        cy.get("#user_error").should("be.hidden").and("have.text","");
        cy.get("#email_error").should("be.visible").and("have.text","invalid Email Address");
        cy.get("#pass_error").shuold("be.visible").and("have.text","Weak Password must have at least 6 characters");    
    })   
    
    
})