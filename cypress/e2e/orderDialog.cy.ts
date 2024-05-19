describe('Тест открытия модального окна с данными о заказе при клике по кнопке «Оформить заказ»', () => {
  before(function() {
    cy.visit('login');

    cy.get('[data-cy="login"]').as('login');
    cy.get('[data-cy="password"]').as('password');
    cy.get('[data-cy="submit-wrapper"]').find("button").as('submit');

    cy.get('@login').type("kmv1200@yandex.ru");
    cy.get('@password').type("paparoach");
    cy.get('@submit').type("click");


  });

  it('логин в приложении, после чего формируется минимальный заказ перетаскиванием ингредиента в область конструктора, после клик на кнопку "Оформить заказ" после чего появляется диалоговое окно с деталями заказа', () => {
    cy.get('[data-cy="item"]').first().as('someItem');
    cy.get('[data-cy="dropTarget"]').first().as('anotherItem');
    cy.get("@someItem").trigger("dragstart");
    cy.get("@anotherItem").trigger("drop");

    cy.get('[data-cy="order-button"]').as('orderButton');
    cy.get('@orderButton').click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get("@modal").should("have.length", 1);
    cy.get("@modal").should("be.visible");
  }); 
})