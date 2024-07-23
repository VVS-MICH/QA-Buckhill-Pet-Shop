/// <reference types="cypress" />
import LoginPage from "../pageobjects/loginpage";
const loginPage = new LoginPage();
import CustomerPage from "../pageobjects/customerPage";
const customerPage = new CustomerPage();

describe("get user details and log in", () => {
  it("log in as a verified customer and verify customer information", () => {
    cy.getUserLogin(); // getting verified customer to log in with

    cy.get("@VerifiedUserData").then((user) => {
      const custPassword = Cypress.env("custPassword");
      
      cy.loginUser(user.email, custPassword);

      customerPage.openProfile();
      
      const fullName = `${user.first_name} ${user.last_name}`;
      customerPage.verifyUserData("Name", fullName);
      customerPage.verifyUserData("Phone number", user.phone_number);
      customerPage.verifyUserData("Address", user.address);
      customerPage.verifyUserData("Date joined", user.created_at);
      customerPage.verifyUserData("Email", user.email);
      // verifying the user information as gathered from the API requests
    });
  });
});