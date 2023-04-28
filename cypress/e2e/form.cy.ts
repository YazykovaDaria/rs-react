describe('Form page', () => {
  beforeEach(() => {
    cy.visit('/form');

    cy.get('[data-testid=add-card-form]').as('form');
    cy.get('#name').as('name');
    cy.get('#date').as('date');
    cy.get('#img').as('img');
    cy.get('#members').as('members');
    cy.get('#pets').as('pets');
    cy.get('#language').as('language');
  });

  it('throws all validation erros', () => {
    cy.get('@form').submit();

    cy.contains('This field is required');
  });
});
