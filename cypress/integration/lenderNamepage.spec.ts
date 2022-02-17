context('Home Page', () => {
  beforeEach(() => {
    const host = Cypress.config()['host'];
    cy.visit('http://localhost:3000/naboo-bank');
  });
  it('should render title Naboo Bank', () => {
    cy.get('.lenderName').should('have.text', 'Naboo Bank');
  });

  it('Submit form for validation', () => {
    cy.get('[id="first_name"]').type('Sarath');
    cy.get('[id="last_name"]').type('N');
    cy.get('div.MuiSelect-root').first().type('{downarrow}{enter}');
    cy.get('#submitform').click();
    // cy.get('[id="contractor"]').check(true);
  });
});
