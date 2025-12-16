// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("visitWithAuth", (path) => {
  cy.visit(`https://writersperhour.dev${path}`, {
    auth: {
      username: "kamora",
      password: "12racoons",
    },
  });
});

Cypress.Commands.add("logout", () => {
  cy.get('button.avatar-user__btn').click();

  cy.get('.dropdown-content', { timeout: 10000 }).then($el => {
    if ($el.css('display') === 'none') {
      cy.wait(500);
      cy.get('button.avatar-user__btn').click({ force: true });
    }
  });

  cy.contains('.dropdown-content button', 'Sign Out', { timeout: 10000 })
    .click({ force: true });

  cy.url().should('include', '#signin');
});
Cypress.Commands.add("waitForDropdownOpen", (selector, timeout = 30000) => {
  cy.get(selector, { timeout }).should("be.visible");
});
