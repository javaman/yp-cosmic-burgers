describe('Тестирует закрытие модального окна с данными о заказе при клике на кнопку закрытия.', () => {
  before(function() {
    cy.visit('login');

    cy.get('[data-cy="login"]').as('login');
    cy.get('[data-cy="password"]').as('password');
    cy.get('[data-cy="submit-wrapper"]').find("button").as('submit');

    cy.get('@login').type("kmv1200@yandex.ru");
    cy.get('@password').type("paparoach");
    cy.get('@submit').type("click");


  });

  it('в конструктор перетаскивается один элемент нажимается кнопка оформить заказ, появляется диалоговое окно, после чего оно закрывается при клике на кнопку закрытия модального окна', () => {
    cy.get('[data-cy="item"]').first().as('someItem');
    cy.get('[data-cy="dropTarget"]').first().as('anotherItem');
    cy.get("@someItem").trigger("dragstart");
    cy.get("@anotherItem").trigger("drop");

    cy.get('[data-cy="order-button"]').as('orderButton');
    cy.get('@orderButton').click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get("@modal").should("have.length", 1);
    cy.get("@modal").should("be.visible");

    cy.get('[data-cy="close-modal"]').as('closeModal');
    cy.get("@closeModal").click();

    cy.get("@modal").should("have.length", 0);
  }); 
})