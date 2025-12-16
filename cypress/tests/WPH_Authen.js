const email = "linh.tran@kamora.vn";
const password = "Password123!";
const newPassword = "Password@123";

const selectors = {
  emailInput: ':nth-child(1) > .sc-f3ce7e5b-0 > .text-field',
  passwordInput: ':nth-child(2) > .sc-f3ce7e5b-0 > .text-field',
  submitBtn: '.submit-btn-wrapper > .sc-a54f95ef-0',
  userWrapper: '.user-wrapper',
  agreeCheckbox: '.agree-checkbox > .checkbox',
  orderDocument: 'label#input-document',
};


const login = (email, password) => {
  cy.get(selectors.emailInput).type(email);
  cy.get(selectors.passwordInput).type(password);
  cy.get(selectors.submitBtn).click();
};

describe("Smoke test Authentication", () => {

  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  // SIGN UP
  it("Should allow a new user to sign up", () => {
    cy.visitWithAuth("/#signup");

    cy.get(selectors.emailInput).type(email);
    cy.get(selectors.passwordInput).type(password);
    cy.get(selectors.agreeCheckbox).click();
    cy.get(selectors.submitBtn).click();

    cy.get(selectors.userWrapper).should('be.visible');
    cy.logout();
  });

  // SIGN IN
  it("Should allow a user to sign in", () => {
    cy.visitWithAuth("/#signin");

    login(email, password);

    cy.get(selectors.userWrapper, { timeout: 10000 }).should('be.visible');
    cy.logout();
  });

  // FORGOT PASSWORD
  it("Should allow user to reset password", () => {
    cy.visitWithAuth("/#signin");

    cy.get('.remember-wrapper > :nth-child(2)').click();
    cy.get('.sc-f3ce7e5b-0 > .text-field').type(email);
    cy.get('.sc-3fd007a0-0 > .sc-a54f95ef-0').click();

    cy.pause(); 

    cy.get('.sc-f3ce7e5b-0 > .text-field').type(newPassword);
    cy.get('.sc-3fd007a0-0 > .sc-a54f95ef-0').click();

    cy.get(selectors.submitBtn).should('be.visible');

    login(email, newPassword);

    cy.get(selectors.userWrapper).should('be.visible');
    cy.logout();

    // verify cannot sign up again
    cy.get('.sc-cfb2f529-0 > :nth-child(1)').click();
    cy.get(selectors.emailInput).type(email);
    cy.get(selectors.passwordInput).type(newPassword);
    cy.get(selectors.agreeCheckbox).click();
    cy.get(selectors.submitBtn).click();

    cy.get('.sc-be6961b2-0.kWusza.input-error').should('be.visible');
  });

  // DELETE ACCOUNT
  it("Should allow delete account via delete page", () => {
    cy.visitWithAuth("/delete");

    cy.get('input').type(email);
    cy.get('.action > .sc-a54f95ef-0').click();
    cy.pause();

    cy.visitWithAuth("/#signin");
    login(email, password);

    cy.get('.sc-be6961b2-0').should('be.visible');
  });

  // SIGN UP IN ORDER FORM
  it("Should allow sign up in Order Form", () => {
    cy.visitWithAuth("/");

    cy.get('.right-group-button > .primary__contained').click();
    cy.get('.button-list > .sc-a54f95ef-0').click();
    cy.get('.sc-cfb2f529-0 > :nth-child(1)').click();

    cy.get(selectors.emailInput).type(email);
    cy.get(selectors.passwordInput).type(password);
    cy.get(selectors.agreeCheckbox).click();
    cy.get(selectors.submitBtn).click();

    cy.get(selectors.orderDocument, { timeout: 15000 }).should('be.visible');

    cy.get('.header-button-back').click();
    cy.get('.primary__outlined').click();

    cy.get(selectors.userWrapper).should('be.visible');
  
  });

  // SIGN IN IN ORDER FORM
  it("Should allow sign in in Order Form", () => {
    cy.visitWithAuth("/");

    cy.get('.right-group-button > .primary__contained').click();
    cy.get('.button-list > .sc-a54f95ef-0').click();

    login(email, password);

    cy.get(selectors.orderDocument, { timeout: 15000 }).should('be.visible');

    cy.get('.header-button-back').click();
    cy.get('.primary__outlined').click();

    cy.get(selectors.userWrapper).should('be.visible');
  });

  // DELETE FROM SETTINGS
  it("Should allow deletion from settings", () => {
    cy.visitWithAuth("/#signin");

    login(email, password);
    cy.get(selectors.userWrapper).should('be.visible');

    cy.get('button.avatar-user__btn').click();
    cy.contains('.dropdown-content button', 'Settings').click({ force: true });

    cy.get(':nth-child(2) > .item-wrap').click();
    cy.get('.sc-cfb2f529-0 > :nth-child(2)').click();
    cy.get(selectors.submitBtn).click();

    cy.get('input').type(email);
    cy.get('.action > .sc-a54f95ef-0').click();
    cy.pause();

    cy.visitWithAuth("/#signin");
    login(email, password);

    cy.get('.sc-be6961b2-0').should('be.visible');
  });
});
