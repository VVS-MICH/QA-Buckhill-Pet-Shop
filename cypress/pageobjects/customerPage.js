class CustomerPage {
  verifyUserData(title, userDetail) {
    cy.get('[class="settings"]')
      .find('[class="settings__user-details"]')
      .children()
      .contains(title)
      .next()
      .should("have.text", userDetail);
  }

  openProfile() {
    cy.get('[class="v-toolbar__content"]')
      .find('[class="v-img__img v-img__img--cover"]')
      .click(); //click on the user profile image
  }

  enterCheckoutField(title, selection) {
    cy.get('[class="v-window__container"]')
      .find('[class="v-input__control"]')
      .contains(title)
      .next()
      .type(selection, { force: true });
  }

  addProPageItemToCart() {
    cy.get(".v-btn__content")
      .contains("Cart")
      .invoke("text") //getting the cart count before adding items to the cart
      .then((cartCounter) => {
        const initialCartCount = parseInt(cartCounter.match(/\d+/)[0]); //extracting the count it self
        cy.contains("add to cart").click(); //adding item to cart
        cy.get(".v-btn__content")
          .contains("Cart")
          .invoke("text") //getting the cart count after adding items to the cart
          .should((text) => {
            const newCartCount = parseInt(text.match(/\d+/)[0]); //extracting the count it self
            expect(newCartCount).to.eq(initialCartCount + 1); //verifying that the count is accurate
          });
      });
  }

  verifyShippingName(title, selection) {
    cy.contains("Shipping address")
      .parent()
      .parent()
      .contains(title)
      .next()
      .should("have.text", selection);
  }

  verifyShippingDetails(title, selection) {
    cy.contains("Shipping address")
      .parent()
      .parent()
      .contains(title)
      .should("contain.text", selection);
  }


}

export default CustomerPage;
