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

Cypress.Commands.add("generateNewCustomer", () => {
 cy.fixture("datafixtures").then((data) => {
      const newCustomer = {
        custFName: faker.name.firstName(),
        custLName: faker.name.lastName(),
        Email: faker.internet.email(),
        custPhone: faker.phone.phoneNumber(),
        custLocation: faker.address.city(),
        custPassword: faker.internet.password(),
      };
  
      cy.wrap(newCustomer).as("newCustomer");
    //   Wrapping the new customer data for usage in the tests
    });
  });


  Cypress.Commands.add("getUserLogin", () => {
    const adminEmail = Cypress.env("adminEmail");
    const adminPassword = Cypress.env("adminPassword");
  
    cy.request({
        method: "POST",
        url: `${Cypress.config('baseUrl')}/api/v1/admin/login`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
            email: adminEmail ,
          password: adminPassword
        }
        , //using api calls to log in as Admin
    }).then((response) => {
      const token = response.body.data.token;
  
      // Extracting the authentication token to be reused in fetching users
      cy.request({
        method: "GET",
        url: `${Cypress.config('baseUrl')}/api/v1/admin/user-listing`,
        headers: {
          Authorization: `Bearer ${token}`, // Reusing the bearer token for authorization
        },
      }).then((response) => {
        const VerifiedUsers = response.body.data.filter(
          (user) => user.email_verified_at !== null
        ); // We want to get only users with verified emails, as unverified users produce a login error
        if (VerifiedUsers.length > 0) {
          const VerifiedUserData = VerifiedUsers[0];
          cy.wrap(VerifiedUserData).as("VerifiedUserData"); // Wrapping the first verified user information to be reused
        } else {
          cy.log("No users with verified emails found");
        }
      });
    });
  });

  Cypress.Commands.add("loginUser", (email, password) => {
    cy.visit("/"); //visit home
  
    loginPage.btnLogin(); //click on log in
    loginPage.enterLoginField("Email", email); 
    loginPage.enterLoginField("Password", password);  //entering user credentials
    loginPage.submitLogin();//clicking on the submit button
    //verifying that the user is logged in by seeing the log out button
    cy.get("button").contains("LOGOUT").should("exist").should("be.visible");
  });


Cypress.Commands.add('generateShippingDetails', () => {
    const shippingDetails = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      addressLine1: faker.address.streetAddress(),
      addressLine2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country()
    };
    
    return shippingDetails;
  });

  Cypress.Commands.add('generatePaymentDetails', () => {
    const paymentDetails = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      addressLine1: faker.address.streetAddress(),
      addressLine2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country()
    };
    
    return paymentDetails;
  });

  Cypress.Commands.add('generateCardDetails', () => {
    const cardDetails = {
      cardNumber: faker.finance.creditCardNumber(),
      expiry: faker.date.future().toISOString().slice(0, 7).replace('-', '/'), // Format: MM/YY
      cvv: faker.finance.creditCardCVV()
    };
  
    return cardDetails;
  });