/// <reference types="cypress" />

import { format, prepareLocalStorage } from "../support/utils";
context('Dev Finance', () => {
    beforeEach(() => {
        cy.visit('https://tiagolopes-maratonadiscover.netlify.app/', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win);
            }
        });
    });

    it('Cadastrar entradas', () => {
        cy.addTransaction("Teste automatizado!", 1000.50, "27/05/2021");
        cy.get('#swal2-title').should("have.text", "Transação salva com sucesso!");
    });

    it('Campos obrigatórios', () => {
        cy.addTransaction();
        cy.get('#swal2-content')
            .should("have.text", "Por favor, preencha o(s) campo(s): Descrição, Valor, Data.");
        cy.get('button.swal2-confirm').click();
        cy.get('.actions > .button').click();

        cy.addTransaction("Descrição");
        cy.get('#swal2-content')
            .should("have.text", "Por favor, preencha o(s) campo(s): Valor, Data.");
        cy.get('button.swal2-confirm').click();
        cy.get('.actions > .button').click();

        cy.addTransaction("Descrição", 250.99);
        cy.get('#swal2-content')
            .should("have.text", "Por favor, preencha o(s) campo(s): Data.");
        cy.get('button.swal2-confirm').click();
    });

    it('Cadastrar saídas', () => {
        cy.addTransaction("Teste negativo!", -1000.50, "26/05/2021");
        cy.get('#swal2-title').should("have.text", "Transação salva com sucesso!");
    });

    it('Remover entradas e saídas', () => {
        cy.get('#data-table tbody tr').should("have.length", 4);

        cy.get("td.description")
            .contains('Notebook')
            .parent()
            .find("img[onclick*=remove]")
            .click();

        cy.get('button.swal2-confirm').click();
        cy.get('button.swal2-confirm').click();

        cy.get("td.description")
            .contains('Website')
            .siblings()
            .children("img[onclick*=remove]")
            .click();

        cy.get('button.swal2-confirm').click();
        cy.get('button.swal2-confirm').click();

        cy.get('#data-table tbody tr').should("have.length", 2);
    });

    it('Validar saldo com várias transações', () => {
        let incomes = 0;
        let expenses = 0;

        cy.get('#data-table tbody tr')
            .each(($el) => {
                cy.get($el).find("td.income, td.expense").invoke('text').then(text => {
                    if (text.includes("-")) {
                        expenses += format(text);
                    } else {
                        incomes += format(text);
                    }
                });
            });
        cy.get('#incomeDisplay').invoke("text").then(text => {
            let formattedIncomeDisplay = format(text);
            expect(formattedIncomeDisplay).to.eq(incomes);
        });

        cy.get('#expenseDisplay').invoke("text").then(text => {
            let formattedExpenseDisplay = -format(text);
            expect(formattedExpenseDisplay).to.eq(expenses);
        });

        cy.get('#totalDisplay').invoke("text").then(text => {
            let formattedTotalDisplay = format(text);
            let total = incomes + expenses;
            expect(formattedTotalDisplay).to.eq(total);
        });
    });

    it('Editar entradas e saídas', () => {
        cy.editTransaction("Website", "App", 1800.55, "10/05/2021");
        cy.get('#swal2-title').should("have.text", "Edição realizada com sucesso!");
    });
});