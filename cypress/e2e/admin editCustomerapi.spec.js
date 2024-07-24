/// <reference types="cypress" />

describe("Edit Customer", () => {
    let adminToken;
    let userId;
    let custEmail;
    const custPassword = Cypress.env("custPassword");
  
    before(() => {
      // Generating the tokens and getting the user to be edited
      cy.getUserLogin();
  
      cy.fixture("datafixtures").then((data) => {
        adminToken = data.tokens.adminToken; // Getting the admin token from the fixture file
        userId = data.VerifiedUserData.uuid; // Getting the user UUID from the fixture
        custEmail = data.VerifiedUserData.email; // Getting the user email from the fixture
      });
    });
  
    it("Admin should be able to edit a customer successfully(using endpoints)", () => {
      cy.generateNewCustomer().then((newCustomer) => {
        // Generating the new customer details
  
        cy.request({
          // Calling the endpoint that will edit the user data
          method: "PUT",
          url: `${Cypress.config("baseUrl")}/api/v1/admin/user-edit/${userId}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRF-TOKEN": "",
            Authorization: `Bearer ${adminToken}`,
          },
          body: {
            // Adding body items that should be edited
            is_marketing: 1,
            last_name: newCustomer.custLName,
            address: newCustomer.custLocation,
            avatar: "",
            password_confirmation: custPassword,
            first_name: newCustomer.custFName,
            phone_number: newCustomer.custPhone,
            password: custPassword,
            email: custEmail,
          },
          form: true, // Indicates that the request body should be sent as form-urlencoded
        }).then((response) => {
          expect(response.status).to.eq(200); // Checking that the response status is 200
          cy.log("Customer edited successfully");
  
          // Verifications to ensure the data sent matches the data received
          const responseBody = response.body.data;
  
          expect(responseBody.uuid).to.eq(userId);
          expect(responseBody.first_name).to.eq(newCustomer.custFName);
          expect(responseBody.last_name).to.eq(newCustomer.custLName);
          expect(responseBody.email).to.eq(custEmail);
          expect(responseBody.address).to.eq(newCustomer.custLocation);
          expect(responseBody.phone_number).to.eq(newCustomer.custPhone);
          expect(responseBody.is_marketing).to.eq(1);
          //Verifying the rensponse data matches what was sent to be edited
      });
    });
  });
});