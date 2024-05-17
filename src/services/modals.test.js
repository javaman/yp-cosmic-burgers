import reducer from './modals'

test('Модальные окна', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(
    { itemVisible: false, orderInfoVisible: false, orderVisible: false }
  )
})


