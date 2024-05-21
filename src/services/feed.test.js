import reducer, { connectFeedAction, disconnectFeedAction } from './feed'
import { initialState } from './feed'
import { setupStore } from './store';
import WS from "jest-websocket-mock";
import { log } from 'console';

const order = {
  _id : "_id",
  ingredients: ["123"],
  status: "done",
  name: "name",
  createdAt: Date(),
  updatedAt: Date(),
  number: 1
};

describe("Лента заказов. Тест кейсы без обращения ко внешнему сервису.", () => {
  test('Лента заказов начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  });
});

describe("Лента заказов. Взаимодействие через веб сокет.", () => {

  afterEach(() => {
    WS.clean();
  });

  test('Соединение вебсокетом и получинеи ленты заказов', async () => {
    const url = "ws://localhost:1234";
    const store = setupStore();
    const server = new WS(url);

    const initialStoreState = JSON.parse(JSON.stringify(store.getState()))

    store.dispatch(connectFeedAction(url))

    await server.connected

    server.send(JSON.stringify({
      success: true,
      orders: [order],
      total: 100,
      totalToday: 10
    }));
    
    expect(store.getState()).toStrictEqual({...initialStoreState, feed: {...initialStoreState.feed, total: 100, totalToday: 10, wsConnected: true, orders: [{...order, uid: store.getState().feed.orders[0].uid}]}});

    server.close();
  })

  test('Закрытие вебсокета', async () => {
    const url = "ws://localhost:1234";
    const store = setupStore();
    const server = new WS(url);

    const initialStoreState = JSON.parse(JSON.stringify(store.getState()))

    store.dispatch(connectFeedAction(url))

    await server.connected
   
    expect(store.getState()).toStrictEqual({...initialStoreState, feed: {...initialStoreState.feed, wsConnected: true}});

    store.dispatch(disconnectFeedAction());

    await server.closed

    expect(store.getState()).toStrictEqual({...initialStoreState, feed: {...initialStoreState.feed, wsConnected: false}});

    server.close();
  })

});