describe('Тест для спринта', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('Тестирование перетаскивания', () => {
    cy.get('[data-cy="item"]').first().as('someItem');
    cy.get('[data-cy="dropTarget"]').first().as('anotherItem');
    cy.get("@someItem").trigger("dragstart");
    cy.get("@anotherItem").trigger("drop");

    cy.get('[data-cy="droppedItem"]').as('droppedSomeItem');
    cy.get("@droppedSomeItem").should('have.length', 2);
  }); 
})