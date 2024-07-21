class CustomerPage {
 

    verifyUserData(title, userDetail) {
      cy.get('[class="settings"]')
        .find('[class="settings__user-details"]')
        .children()
        .contains(title)
        .next()
        .should("have.text", userDetail)
    }
    
    openProfile() {
      cy.get('[class="v-toolbar__content"]')
      .find('[class="v-img__img v-img__img--cover"]')
      .click(); //click on the user profile image
    }
  
  
  }
  
  export default CustomerPage;
  