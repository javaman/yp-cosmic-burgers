describe('Тестирование открытия модального окна с описанием ингредиента', () => {
  before(function() {
    cy.visit('');
  });

  it('после клика на ингредиенте открывает модальное окно', () => {
    cy.get('[data-cy="item"]').first().as('someItem');
    cy.get("@someItem").click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get("@modal").should("have.length", 1);
    cy.get("@modal").should("be.visible");
  }); 
})