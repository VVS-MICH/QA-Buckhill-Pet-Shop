class AdminPage {
  navigateSidebar(destination) {
    cy.get(".v-navigation-drawer__content")
      .find('[class="v-list-item-title"]')
      .contains(destination)
      .click();
  }

  selectProductField(title, selection) {
    cy.get('[class="product-card"]')
      .find('[class="v-input__control"]')
      .contains(title)
      .click({ force: true });
    cy.get('[class="v-overlay__content v-select__content"]')
      .find('[ class="v-list-item-title"]')
      .contains(selection)
      .click();
  }

  verifyProductField(title, selection) {
    cy.get('[class="product-card"]')
      .find('[class="v-input__control"]')
      .contains(title)
      .parent()
      .should("contain", selection);
  }

  enterProductField(title, selection) {
    cy.get('[class="product-card"]')
      .find('[class="v-input__control"]')
      .contains(title)
      .next()
      .type(selection, { force: true });
  }
  
  hitButton(title) {
    cy.get('[class="v-btn__content"]').contains(title).click();
  }
  
}

export default AdminPage;
