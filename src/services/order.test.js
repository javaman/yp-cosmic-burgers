import reducer, { initialState, submitOrder, fetchOrder } from './order'
import fetchMock from 'jest-fetch-mock';
import { setupStore } from './store';
import { SUBMIT_URL } from '../constants';

fetchMock.enableMocks();

const bun = {
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

const ingredient = {
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

describe("Заказы. Тест кейсы без обращения ко внешнему сервису.", () => {
  test('Заказ начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })
});

describe("Заказы. Тест кейсы с обращениек ко внешнему сервису.", () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Отправка заказа', async () => {
    const orderNumber = 40474;
    fetch.mockResponseOnce(JSON.stringify({
      "success": true,
      "name": "Space флюоресцентный бургер",
      "order": {
        "ingredients": [
          {
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
          },
          {
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
          },
          {
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
          }
        ],
        "_id": "664c89c197ede0001d06b8f4",
        "owner": {
          "name": "Maksima",
          "email": "kmv1200@yandex.ru",
          "createdAt": "2024-05-01T11:56:01.101Z",
          "updatedAt": "2024-05-20T15:37:29.776Z"
        },
        "status": "done",
        "name": "Space флюоресцентный бургер",
        "createdAt": "2024-05-21T11:47:13.236Z",
        "updatedAt": "2024-05-21T11:47:13.619Z",
        "number": orderNumber,
        "price": 2056
      }
    }));
    const store = setupStore();

    const initialStoreState = JSON.parse(JSON.stringify(store.getState()));

    await store.dispatch(submitOrder({ bun, items: [ingredient] }));

    expect(fetchMock.mock.lastCall[0]).toBe(SUBMIT_URL);
    expect(fetchMock.mock.lastCall[1].method).toBe("POST");
    const parsedRequestBody = JSON.parse(fetchMock.mock.lastCall[1].body);
    expect(parsedRequestBody).toStrictEqual({ ingredients: ["643d69a5c3f7b9001cfa0941", "643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093c"] });

    expect(store.getState()).toStrictEqual({ ...initialStoreState, modals: { ...initialStoreState.modals, orderVisible: true }, order: { ...initialStoreState.order, orderNumber: 40474 } });
  });

  test('Получение информации о заказе', async () => {
    const order = {
      "_id": "664c8de097ede0001d06b8ff",
      "ingredients": [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093d"
      ],
      "owner": "664a198697ede0001d06b53c",
      "status": "done",
      "name": "Флюоресцентный люминесцентный био-марсианский бургер",
      "createdAt": "2024-05-21T12:04:48.413Z",
      "updatedAt": "2024-05-21T12:04:48.807Z",
      "number": 40476,
      "__v": 0
    }
    fetch.mockResponseOnce(JSON.stringify({
      "success": true,
      "orders": [
        order
      ]
    }));
    const store = setupStore();
    const initialStoreState = JSON.parse(JSON.stringify(store.getState()));
    await store.dispatch(fetchOrder(40476));
    expect(fetchMock.mock.lastCall[0]).toBe("https://norma.nomoreparties.space/api/orders/40476");
    expect(store.getState()).toStrictEqual({...initialStoreState, order: {...initialStoreState.order, order: order}});
  });
});
