import reducer from './feed'

test('Лента заказов начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(
    { orders: [], total: 0, totalToday: 0, wsConnected: false }
  )
})


