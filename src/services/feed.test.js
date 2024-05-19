import reducer from './feed'
import { initialState } from './feed'

test('Лента заказов начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
})


