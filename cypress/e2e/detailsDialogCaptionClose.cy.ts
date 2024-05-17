describe('Тест для спринта', () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('Тестирование перетаскивания', () => {
    cy.get('[data-cy="item"]').first().as('someItem');
    cy.get("@someItem").click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get("@modal").should("have.length", 1);
    cy.get("@modal").should("be.visible");

    cy.get('[data-cy="close-modal"]').as('closeModal');
    cy.get("@closeModal").click();

    cy.get("@modal").should("have.length", 0);
  }); 
})