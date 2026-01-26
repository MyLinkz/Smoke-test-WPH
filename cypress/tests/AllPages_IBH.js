const scrollBottom = () => {
    cy.scrollTo("bottom", { duration: 1000, easing: "linear" });
};

const clickAndVerify = (selector, expectedUrl) => {
    cy.get(selector).should("be.visible").click();
    cy.url().should("include", expectedUrl);
    scrollBottom();
};

const visitAndScroll = (path = "/") => {
    cy.visitWithAuth(path);
    scrollBottom();
};
//Services dropdown
const HEADER_SERVICES = [
    "/buy-a-tok-essay",
    "/buy-ib-ia",
    
];

//Services
const HEADER_COMPANY = [
    "/about",
    "/#testimonials",
];

//Footer
const FOOTER_COMPANY = [
    "/samples",
    "/contacts",
    "/about",
    "#testimonials",
];


//Policies
const FOOTER_POLICIES = [
    "/money-back",
    "/revision",
    "/terms",
    "/delete",
];

describe("Smoke Test – All Pages (Refactored)", () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
        cy.visitWithAuth("/");
        cy.get("body").should("be.visible");
    });

    //HOMEPAGE
    it("Homepage loads successfully", () => {
        cy.url().should("eq", "https://ibhelper.com/");
    });

    //HEADER
    it("Header - How to order", () => {
        clickAndVerify('[title="Writers"]', "/#our-writers");
    });
    it("Header - Samples pages", () => {
        HEADER_SAMPLES.forEach((path) => {
            cy.waitForDropdownOpen(
                `a.dropdown-menu__menu-item[href="${path}"]`,
                60000
            );
            cy.get(`a.dropdown-menu__menu-item[href="${path}"]`)
                .should("be.visible")
                .click();

            cy.url().should("include", path);
            scrollBottom();
        });
    });
    it("Header - Pricing", () => {
        clickAndVerify('[title="Pricing"]', "/prices-and-discounts");
    });

    it("Header - Contacts", () => {
        clickAndVerify('[title="Contacts"]', "/contacts");
    });

    //HEADER SERVICES 
    it("Header - Services pages", () => {
        HEADER_SERVICES.forEach((path) => {
            cy.waitForDropdownOpen(
                `a.dropdown-menu__menu-item[href="${path}"]`,
                60000
            );
            cy.get(`a.dropdown-menu__menu-item[href="${path}"]`)
                .should("be.visible")
                .click();

            cy.url().should("include", path);
            scrollBottom();
        });
    });

    //FOOTER 
    it("Footer - Logo & WPH link", () => {
        scrollBottom();
        clickAndVerify(".wph-logo > a", "/");
        clickAndVerify(".copy-right > a", "/");
    });

    //FOOTER SERVICES
    it("Footer - Services links", () => {
        scrollBottom();

        FOOTER_SERVICES.forEach((path) => {
            cy.get(`a[href="${path}"]`).first().click({ force: true });
            cy.url().should("include", path);
            scrollBottom();
        });
    });

    //FOOTER COMPANY
    it("Footer - Company links", () => {
        scrollBottom();a

        FOOTER_COMPANY.forEach((path) => {
            cy.get(`a[href="${path}"]`).first().click({ force: true });
            cy.url().should("include", path);
            scrollBottom();
        });
    });

    // FOOTER POLICIES 
    it("Footer - Policies links", () => {
        scrollBottom();

        FOOTER_POLICIES.forEach((path) => {
            cy.get(`a[href="${path}"]`).first().click({ force: true });
            cy.url().should("include", path);
            scrollBottom();
        });
    });

    // DIRECT URL
    it("Direct URL pages", () => {
        DIRECT_PAGES.forEach((path) => {
            visitAndScroll(path);
            cy.url().should("include", path);
        });
    });
});
