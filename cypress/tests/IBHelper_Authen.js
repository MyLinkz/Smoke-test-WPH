describe("Smoke Test - Authentication", () => {
  const email = `linh.tran@kamora.vn`;
  const password = "123456";
  const newPassword = "Password@123";
  function visit(path) {
  cy.visit(`https://ibhelper.dev${path}`, {
    auth: {
      username: "kamora",
      password: "12racoons"
    }
  });
}

  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("Should allow a new user to sign up", () => {
    visit("/signup");

    // Accept cookie
    cy.get(".btn-cookie button").click();

    // Enter email
    cy.get(".text-field").type(email);

    // Click Next
    cy.get("form button").click();

    // Enter password
    cy.get(".text-field").type(password);
    cy.get('.sc-2c9ea91b-0').click();

    // Click Next
    cy.get("button.sc-6fe1cc8-0").click();

    // Verify account created
    cy.get(".thank-btn", { timeout: 10000 }).should("exist");
  });

  it("Should allow a new user to sign in", () => {
    visit("/signin");

    cy.get(".btn-cookie button").click();

    cy.get(".text-field").type(email);
    cy.get("form button").click();

    cy.get(".text-field.has-end-icon").type(password);
    cy.get(".button-show").click();

    cy.get(".author img", { timeout: 10000 }).should("be.visible");
  });


  it("Should allow user to access Forgot Password flow", () => {
    visit("/signin");

    cy.get(".btn-cookie button").click();

    cy.get(".text-field").type(email);
    cy.get("form button").click();

    // Click Forgot password?
    cy.contains("Forgot Password?").click();

    // Pause if you want to debug
    cy.pause();

    // New password
    cy.get('[name="password"]').type(newPassword);
    cy.get('.sc-6fe1cc8-0').click();
    cy.get('.content').click();

    // Reset success message
    cy.get(".sc-526e59-0").should("be.visible");

    // Login with new password
    cy.get(".text-field").type(email);
    cy.get("button.sc-6fe1cc8-0").click();
    cy.get(".text-field").type(newPassword);
    cy.get("button.sc-6fe1cc8-0").click();
    cy.get('a > img').click();

    cy.get(".author img", { timeout: 10000 }).should("be.visible");
  });

  it("Should allow deletion from URL", () => {
    visit("/delete");
    cy.get(".btn-cookie button").click();
    cy.get(".text-field").type(email);
    cy.get('.action > .sc-6fe1cc8-0').click();
    cy.pause();
    cy.get('.laptop-screen').click();
    cy.get(".text-field").type(email);
    cy.get("form button").click();

    cy.get(".text-field.has-end-icon").type(password);
    cy.get(".button-show").click();
    // cy.get('.sc-ec626a29-0').should(be.visible);
  });

  it("Should allow user to sign up from Order form", () => {
    visit("/order");
    cy.get(".btn-cookie button").click();
    cy.get('.button-list > .sc-6fe1cc8-0').click();
    // cy.get('.slide-content > .sc-526e59-0').should(be.visible);
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('form > .sc-6fe1cc8-0').click();
    //Kiem tra 
    // cy.get('.title').should(be.visible);
    cy.get('a > img').click();
    cy.get(".author img", { timeout: 10000 }).should("be.visible");
  });
  it("Should allow user to sign in from Order form", () => {
    visit("/order");
    cy.get(".btn-cookie button").click();
    cy.get('.button-list > .sc-6fe1cc8-0').click();
    cy.get('.content-header > :nth-child(2)').click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get(':nth-child(4) > .sc-6fe1cc8-0').click();
    cy.get('a > img').click();
    cy.get(".author img", { timeout: 10000 }).should("be.visible");
  });
  it("Should allow user to FGPW from Order form", () => {
    visit("/order");
    cy.get(".btn-cookie button").click();
    cy.get('.button-list > .sc-6fe1cc8-0').click();
    cy.get('.content-header > :nth-child(2)').click();
    cy.get('[name="email"]').type(email);
    cy.get('.forgot-pass').click();
    cy.pause();
    cy.get('[name="password"]').type(newPassword);
    cy.get('.form > .sc-6fe1cc8-0').click();
    cy.get('[name="password"]').type(newPassword);
    cy.get(':nth-child(4) > .sc-6fe1cc8-0').click();
    cy.get('a > img').click();
    cy.get(".author img", { timeout: 10000 }).should("be.visible");
  });

  it("Should allow DELETE from Settings", () => {
    visit("/signin");

    cy.get(".btn-cookie button").click();

    cy.get(".text-field").type(email);
    cy.get("form button").click();

    cy.get(".text-field.has-end-icon", { timeout: 10000 }).type(password);
    cy.get(".button-show").click();

    cy.get(".author img", { timeout: 10000 }).should("be.visible");
    cy.get('.author > img').click();
    cy.get('.dropdown > :nth-child(2) > p').click();
    cy.get('.nav > :nth-child(4)').click();
    cy.contains("Proceed").click();

    cy.url().should("include", "/delete");

    cy.get(".text-field").type(email);
    cy.get('.action > .sc-6fe1cc8-0').click();
    cy.pause();
    cy.get('.laptop-screen').click();
    cy.get("form button").click();
    cy.get(".text-field.has-end-icon").type(password);
    cy.get(".button-show").click();
    cy.contains("Invalid email or password").should("be.visible");
  });
});
