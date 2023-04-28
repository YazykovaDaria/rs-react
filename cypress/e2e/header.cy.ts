describe('Header', () => {
  it('should routes work correctly and display page name', () => {
    cy.visit('/');
    cy.get('[data-testid="main"]').should('have.length', 1);
    cy.contains(/Main page/i).should('be.visible');

    cy.get('[data-testid="link-about"]').click();
    cy.url().should('include', '/about');
    cy.contains(/About us/i).should('be.visible');
    cy.contains(/About page/i).should('be.visible');

    cy.get('[data-testid="link-form"]').click();
    cy.url().should('include', '/form');
    cy.contains('Add user').should('be.visible');
    cy.contains(/Form page/i).should('be.visible');
  });

  it('should render notFound page when uncorrect router', () => {
    cy.visit('/ab0ut');
    cy.contains(/Sorry, page not found/i).should('be.visible');
  });
});
