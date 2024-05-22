import reducer from './modals'
import { initialState, showOrder, closeModal, showIngredient, showOrderInfo } from './modals'

const ingredient = {
  _id: "_id",
  name: "name",
  type: "type",
  proteins: 12,
  fat: 15,
  carbohydrates: 16,
  calories: 17,
  price: 18,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
  __v: 123
};

const order = {
  _id : "_id",
  ingredients: ["123"],
  status: "done",
  name: "name",
  createdAt: Date(),
  updatedAt: Date(),
  number: 1
};

test('Модальные окна - начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
});

test('Модальные окна видимость заказа', () => {
  expect(reducer(initialState, showOrder())).toEqual({...initialState, orderVisible: true});
});

test('Модальные закрыть модальные окна', () => {
  expect(reducer({...initialState, orderVisible: true, itemVisible: true, orderInfoVisible: true}, closeModal())).toEqual(initialState);
});

test('Показать модальное окно с ингредиентом', () => {
  expect(reducer(initialState, showIngredient(ingredient))).toEqual({...initialState, itemVisible: true, ingredient});
});

test('Показать модальное окно с заказом', () => {
  expect(reducer(initialState, showOrderInfo(order))).toEqual({...initialState, orderInfoVisible: true, order: order});
});