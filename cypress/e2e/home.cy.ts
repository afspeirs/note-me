describe('Homepage', () => {
  it('should load the homepage successfully', () => {
    cy.visit('/');
    cy.get('h1').contains('NoteMe').should('exist');
  });
});
