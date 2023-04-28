describe('About page', () => {
  it('should have "About us" heading', () => {
    cy.visit('/about');
    cy.get('h2').should('have.text', 'About us');
  });
});
