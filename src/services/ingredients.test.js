import reducer from './ingredients'
import { initialState } from './ingredients'

test('Ингредиенты  начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
})


