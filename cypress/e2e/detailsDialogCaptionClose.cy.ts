describe('Тестирует закрытие модального окна с описанием ингредиента при клике на кнопку закрытия.', () => {
  before(function() {
    cy.visit('');
  });

  it('после клика на ингредиенте открывает модальное окно, после клика на иконку закрытия модальное окно закрывается', () => {
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