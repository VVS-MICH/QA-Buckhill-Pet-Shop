import LoginPage from "../pageobjects/loginpage";
const loginPage = new LoginPage();
const faker = require("faker");

Cypress.Commands.add("swapWorkingEndpoints", () => {
  cy.intercept("**/api/v1/**", (req) => {
    req.url = req.url.replace(
      "/its.pet-shop.buckhill.dev",
      "/pet-shop.buckhill.com.hr"
    );
    req.continue();
  }).as("loginRequest");
});

Cypress.Commands.add("loginAdmin", (email, password) => {
  //cy.session([email,password], () => {
  //commenting this out  because the system saved session does not keep the user logged in,
  // the log in process seems mocked, see the bug report for more details on this
  cy.visit("/login");

  loginPage.enterLoginField("Email", email);
  loginPage.enterLoginField("Password", password);
  loginPage.submitLogin();
  //verifying that the user is logged in and in the dashboard
  cy.get("button").contains("LOGOUT").should("exist").should("be.visible");
  cy.contains("Dashboard").should("exist").should("be.visible"); //verifying the user is in the dashboard
  cy.url().should("equal", "https://pet-shop.buckhill.com.hr/dashboard");
  //   },
  //   { cacheAcrossSpecs: true }
  // );
});

Cypress.Commands.add("generateNewProductDetails", () => {
  const newProduct = {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
  };

  // Wrapping the new product data for usage in the tests
  cy.wrap(newProduct).as("newProduct");
});

Cypress.Commands.add("productCategory", () => {
  cy.request("GET", "https://pet-shop.buckhill.com.hr/api/v1/categories").then(
    (response) => {
      const categories = response.body.data;
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const productCategory = randomCategory.title;
      cy.wrap(productCategory).as("productCategory");
    }
  );
});

Cypress.Commands.add("productBrand", () => {
  cy.request("GET", "/api/v1/brands").then((response) => {
    const brands = response.body.data;
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    const productBrand = randomBrand.title;
    cy.wrap(productBrand).as("productBrand");
  });
});
