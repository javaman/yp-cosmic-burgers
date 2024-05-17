import reducer from './order'

test('Заказ начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(
    { loading: false, loadingFailed: false, orderNumber: -1 }
  )
})


