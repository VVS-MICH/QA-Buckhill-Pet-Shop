/// <reference types="cypress" />
import AdminPage from "../pageobjects/adminPage";
const adminPage = new AdminPage();

describe("Admin Add Products", () => {
  it("Admin is able to add new product successfully", () => {
    cy.generateNewCustomer();

    cy.get("@newCustomer").then((newCustomer) => {
      const adminEmail = Cypress.env("adminEmail");
      const adminPassword = Cypress.env("adminPassword");

      cy.loginAdmin(adminEmail, adminPassword); //logging in as admin
      adminPage.navigateSidebar("Customers"); //using the side bar to navigate to the Customers page
      cy.contains("add new customer").click(); //clicking on add new customer
      adminPage.enterCustomerField("First Name", newCustomer.custFName);
      adminPage.enterCustomerField("Last Name", newCustomer.custLName);
      adminPage.enterCustomerField("Email", newCustomer.Email);
      adminPage.enterCustomerField("Phone Number", newCustomer.custPhone);
      adminPage.enterCustomerField("Location", newCustomer.custLocation);
      adminPage.enterCustomerField("Password", newCustomer.custPassword);
      adminPage.enterCustomerField(
        "Confirm Password",
        newCustomer.custPassword
      ); //adding new customer details
      adminPage.hitButton("Add new customer");
      cy.get('[class="customer-card"]')
        .find('[class="cursor-pointer"]')
        .click(); ///closing the customer card
      const fullName = `${newCustomer.custFName} ${newCustomer.custLName}`;
      adminPage.verifyNewCustomerData(fullName, 0); // Verifying name of newly added customer on the table
      adminPage.verifyNewCustomerData(newCustomer.Email, 1); // Verifying email of newly added customer on the table
      adminPage.verifyNewCustomerData(newCustomer.custPhone, 2); // Verifying phone of newly added customer on the table
      adminPage.verifyNewCustomerData(newCustomer.custLocation, 3); // Verifying location of newly added customer on the table
    });
  });
});
