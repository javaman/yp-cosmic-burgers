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

    cy.get("@modal").find('[data-cy="details-icon"]').as("image");
    cy.get("@modal").find('[data-cy="details-name"]').as("name");

    cy.get("@image").invoke("attr", "src").should("not.be.empty");    
    cy.get("@name").invoke("text").should("not.be.empty");    

    
  }); 
})