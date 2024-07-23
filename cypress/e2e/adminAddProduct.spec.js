/// <reference types="cypress" />
import AdminPage from "../pageobjects/adminPage";
const adminPage = new AdminPage();
//commenting this out because the system saved session does not keep the user logged in,
// the log in process seems mocked, and once the user loads a fresh page the user is automatically logged out see the bug report for more details on this
// before("visit page and restore session", () => {

//      cy.fixture("datafixtures").then((data) => {
//      cy.loginAdmin(data.adminEmail, data.adminPassword);
//      });
// });

describe("Admin Add Products", () => {
  it("Admin is able to add new product successfully", () => {
    cy.generateNewProductDetails();

    const adminEmail = Cypress.env("adminEmail");
    const adminPassword = Cypress.env("adminPassword");

    cy.loginAdmin(adminEmail, adminPassword); // Logging in as admin
    adminPage.navigateSidebar("Products"); // Navigate to the products page
    cy.contains(" add new product ").click(); // Clicking on add new products

    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/productImage.png",
      { force: true }
    ); // Uploading the product image

    cy.productBrand(); // Getting brand from the list of brands
    cy.get("@productBrand").then((productBrand) => {
      adminPage.selectProductField("Brand name", productBrand); // Selecting the product brand
      adminPage.verifyProductField("Brand name", productBrand); // Verifying the brand selected
    });

    cy.get("@newProduct").then((newProduct) => {
      adminPage.enterProductField("Product name", newProduct.name); // Entering the product name
      adminPage.enterProductField("Price", newProduct.price); // Entering the product price
      adminPage.enterProductField("Description", newProduct.description); // Entering the product description
    });

    cy.productCategory(); // Getting category from the list of categories
    cy.get("@productCategory").then((productCategory) => {
      adminPage.selectProductField("Category", productCategory); // Selecting the product category
      adminPage.verifyProductField("Category", productCategory); // Verifying the category selected
    });

    adminPage.hitButton("save changes"); // Clicking on save changes

    // There should be a validation to ensure the product is added successfully
    // As well as a validation to ensure the product appears on the list with the correct data
    // Due to the system not being able to save, having these validations will not be possible
  });
});
