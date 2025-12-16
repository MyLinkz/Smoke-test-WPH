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
    "/research-paper-writing-service",
    "/thesis-writing-service",
    "/write-my-discussion-post-for-me",
    "/article-review-writing-service",
    "/do-my-powerpoint",
    "/case-study-writing-service",
    "/report-writing-service",
    "/buy-coursework-online",
    "/write-my-speech",
    "/pay-for-essay",
    "/paper-editing-service",
];

//Services
const FOOTER_SERVICES = [
    "/paper-editing-service",
    "/write-my-speech",
    "/write-my-literature-review",
    "/do-my-capstone-project",
    "/do-my-homework",
    "/buy-college-papers",
    "/buy-research-proposal",
    "/do-my-coursework",
    "/reaction-paper",
    "/research-paper-writing-service",
    "/buy-personal-statement",
    "/do-my-powerpoint",
    "/report-writing-service",
    "/article-review-writing-service",
];

//Footer
const FOOTER_COMPANY = [
    "/about",
    "/samples",
    "/prices-and-discounts",
    "/testimonials",
    "/blog",
    "/legal",
    "/contacts",
    "/write-for-us",
];

//Policies
const FOOTER_POLICIES = [
    "/legal/terms",
    "/legal/privacy",
    "/legal/refund",
    "/legal/cookie",
    "/delete",
];

// Direct URL pages
const DIRECT_PAGES = [
    "/ib-writing-service",
    "/ib-writing-service/ia-writing-service",
    "/ib-writing-service/tok-writing-service",
    "/ib-writing-service/tok-writing-service/titles",
];

describe("Smoke Test – All Pages (Refactored)", () => {
    beforeEach(() => {
        cy.viewport(1440, 900);
        cy.visitWithAuth("/");
        cy.get("body").should("be.visible");
    });

    //HOMEPAGE
    it("Homepage loads successfully", () => {
        cy.url().should("eq", "https://writersperhour.dev/");
    });

    //HEADER
    it("Header - How to order", () => {
        clickAndVerify('[title="How to order"]', "/#howtoorder");
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
