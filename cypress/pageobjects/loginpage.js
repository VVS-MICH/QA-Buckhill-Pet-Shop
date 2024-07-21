class LoginPage {
  enterLoginField(title, selection) {
    cy.get('[class="login__form elevation-2"]')
      .find('[class="v-input__control"]')
      .contains(title)
      .next()
      .type(selection, { force: true });
  }

  submitLogin() {
    cy.get("button").contains("Log in").click({ force: true });
  }

  btnLogin() {
    cy.get("button").contains("LOGIN").click({ force: true });
  }
}

export default LoginPage;
