describe('Main page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`[data-testid=card]`).as('cards');
  });

  it('renders cards', () => {
    cy.get('@cards').should('have.length', 20);
  });
});
