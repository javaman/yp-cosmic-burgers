import reducer from './order'
import { initialState } from './order'

test('Заказ начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
})


