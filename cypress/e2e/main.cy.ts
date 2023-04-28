describe('Main page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(`[data-testid=card]`).as('cards');
    cy.get('input[type="search"]').as('search');
    cy.get(`[data-testid=search-bar]`).as('form');
  });

  it('render cards', () => {
    cy.get('@cards').should('have.length', 20);
  });

  it('search cards with valid value', () => {
    cy.get('@search').type('for');
    cy.get(`@form`).submit();
    cy.get('@cards').should('have.length', 5);
  });

  it('show error message when invalid search value', () => {
    cy.get('@search').type('arad');
    cy.get('@form').submit();

    cy.contains('Nothing was found for yor request');
  });
});
