import { dateFormatter } from "./utils";

Cypress.Commands.add("addTransaction", (description, amount, date) => {
    let formattedDate = dateFormatter(date);
    cy.get('.button.new').click();
    if (description) cy.get('#description').type(description);
    if (amount) cy.get('#amount').type(amount);
    if (formattedDate) { 
        cy.get('#date').click();
        cy.get(`span[aria-label="${formattedDate}"]`).click();
    } 
    cy.get('#save').contains("Salvar").click();
})

Cypress.Commands.add("editTransaction", (transaction, newDescription="", newAmount=0, newDate="") => {
    cy.get("td.description")
        .contains(transaction)
        .siblings()
        .children("img[onclick*=edit]")
        .click();

    cy.get('#description').invoke("val").then(value => {
        expect(value).to.eql(transaction);
    });

    if (newDescription) cy.get('#description').clear().type(newDescription);
    if (newAmount) cy.get('#amount').clear().type(newAmount);
    if (newDate) {
        let formattedDate = dateFormatter(newDate);
        cy.get('#date').click();
        cy.get(`span[aria-label="${formattedDate}"]`).click();
    }
    cy.get('#save').contains("Salvar").click();
})