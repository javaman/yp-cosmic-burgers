import reducer from './burger-constructor'
import { initialState } from './burger-constructor'

test('Конструктор бургера начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
})


