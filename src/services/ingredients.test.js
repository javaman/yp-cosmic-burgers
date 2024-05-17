import reducer from './ingredients'

test('Ингредиенты  начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(
    { ingredients: [], loading: false, loadingFailed: false }
  )
})


