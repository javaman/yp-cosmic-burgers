import reducer from './modals'
import { initialState } from './modals'

test('Модальные окна', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
})


