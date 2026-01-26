const email = "linh.tran@kamora.vn";
const password = "Password123!";
const newPassword = "Password@123";

const selectors = {
    emailInput: ':nth-child(1) > .sc-f3ce7e5b-0 > .text-field',
    passwordInput: ':nth-child(2) > .sc-f3ce7e5b-0 > .text-field',
    submitBtn: '.submit-btn-wrapper > .sc-a54f95ef-0',
};

const login = (email, password) => {
    cy.get(selectors.emailInput).type(email);
    cy.get(selectors.passwordInput).type(password);
    cy.get(selectors.submitBtn).click();
};

describe("Smoke Test Settings ", () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
        cy.visitWithAuth("/");
        cy.get("body").should("be.visible");
    });

    // it("Access settings from header", () => {
    //     cy.visitWithAuth("/#signin");
    //     login(email, password);

    //     cy.settings();
    // });

    // it("Access settings from URL", () => {
    //     cy.visitWithAuth("/#signin");
    //     login(email, password);

    //     cy.visitWithAuth("/settings");
    // });

    // it("Change Profile of Settings", () => {
    //     cy.visitWithAuth("/#signin");
    //     login(email, password);
    //     cy.settings();

    //     cy.get('.sc-c97cd784-0 > #input-country').should('be.visible').click();
    //     cy.get('.country > .sc-d3098325-0 > .dropdown-content > .sc-9f7b0c7-0 > .wrapper-list').contains('Vietnam').click();
    //     // cy.get('.sc-c97cd784-0 > #input-country').should('contain', 'Vietnam');

    //     cy.get('.sc-c97cd784-0 > #input-timezone').click();
    //     cy.get('.timezone > .sc-d3098325-0 > .dropdown-content > .sc-9f7b0c7-0 > .wrapper-list').contains('(GMT +08) Hong Kong, Irkutsk, Kuala Lumpur, Singapore').click();
    //     // cy.get('.sc-c97cd784-0 > #input-timezone').should('contain', '(GMT +08) Hong Kong, Irkutsk, Kuala Lumpur, Singapore');
    //     cy.get('[name="fullname"]').should('be.visible').clear().type('Linh Tran');

    //     cy.get('.submit-btn-wrapper > .sc-a54f95ef-0').click();
    //     cy.reload();
    // });
    it("Change Password of Settings", () => {
        cy.visitWithAuth("/#signin");
        login(email, password);
        cy.settings();
        cy.get(':nth-child(2) > .item-wrap').click();

        cy.get(':nth-child(2) > .sc-f3ce7e5b-0 > .text-field').type(newPassword);
        cy.get(':nth-child(3) > .sc-f3ce7e5b-0 > .text-field').type(newPassword);
        cy.get('.submit-btn-wrapper > .sc-a54f95ef-0').click();

        cy.url().should('include', '/#signin');
    });
});

