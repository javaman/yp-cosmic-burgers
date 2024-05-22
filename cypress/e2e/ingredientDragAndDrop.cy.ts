describe('Тестирует перетаскивание ингредиента в конструктор', () => {
  before(function() {
    cy.visit('');
  });

  it('после Drag ингредиента и Drop в область конструктора он появляется там', () => {
    cy.get('[data-cy="item"]').first().as('someItem');
    cy.get('[data-cy="dropTarget"]').first().as('anotherItem');
    cy.get("@someItem").trigger("dragstart");
    cy.get("@anotherItem").trigger("drop");

    cy.get('[data-cy="droppedItem"]').as('droppedSomeItem');
    cy.get("@droppedSomeItem").should('have.length', 2);
  }); 
})