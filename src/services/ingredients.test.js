import reducer, { fetchIngredients } from './ingredients'
import { initialState } from './ingredients'
import fetchMock from 'jest-fetch-mock';
import { setupStore } from './store';
import { API_URL } from '../constants';

fetchMock.enableMocks();

const ingredient1 = {
  "_id": "643d69a5c3f7b9001cfa093c",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
};

const ingredient2 = {
  "_id": "643d69a5c3f7b9001cfa0941",
  "name": "Биокотлета из марсианской Магнолии",
  "type": "main",
  "proteins": 420,
  "fat": 142,
  "carbohydrates": 242,
  "calories": 4242,
  "price": 424,
  "image": "https://code.s3.yandex.net/react/code/meat-01.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
  "__v": 0
}



describe("Ингредиенты. Тест кейсы без обращения ко внешнему сервису.", () => {
  test('Ингредиенты  начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })
});

describe("Ингредиенты. Тест кейсы обращением ко внешнему сервису.", () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Получение списка ингредиентов с сервера', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      "success": true,
      "data": [ingredient1, ingredient2]
    }));
    const store = setupStore();

    const initialStoreState = JSON.parse(JSON.stringify(store.getState()));

    await store.dispatch(fetchIngredients());
    
    expect(fetchMock.mock.lastCall[0]).toBe(API_URL);
    expect(store.getState()).toStrictEqual({...initialStoreState, ingredients: {...initialStoreState.ingredients, ingredients: [ingredient1, ingredient2]}})
  })
});