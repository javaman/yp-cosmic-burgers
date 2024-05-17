import reducer from './burger-constructor'

test('Конструктор бургера начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(
    { items: [] }
  )
})


