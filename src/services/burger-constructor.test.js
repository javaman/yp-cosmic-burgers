import reducer, { initialState, drop, deleteItem, deleteBun, replace } from './burger-constructor'


const bun = {
  _id: "_id1",
  name: "name",
  type: "bun",
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
  __v: 6,
  uid : "uid"
};

const item = {
  _id: "_id2",
  name: "name",
  type: "sauce",
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
  __v: 6,
  uid : "uid"
};

const item2 = {
  _id: "_id3",
  name: "name",
  type: "sauce",
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: "image",
  image_mobile: "image_mobile",
  image_large: "image_large",
  __v: 6,
  uid : "uid"
};

test('Конструктор бургера начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
})

test('Конструктор бургера добавление булки', () => {
  expect(reducer(initialState, drop(bun))).toEqual({...initialState, bun: bun})
})

test('Конструктор бургера добавление не булки', () => {
  expect(reducer(initialState, drop(item))).toEqual({...initialState, items: [item]})
})

test('Конструктор бургера удаление булки', () => {
  expect(reducer({...initialState, bun}, deleteBun())).toEqual({...initialState, bun: undefined})
})

test('Конструктор бургера удаление не булки', () => {
  expect(reducer({...initialState, bun, items: [item]}, deleteItem(0))).toEqual({...initialState, bun})
})

test('Конструктор бургера поменять два ингредиента местами', () => {
  expect(reducer({...initialState, bun, items: [item, item2]}, replace({index2: 1, index: 0}))).toEqual({...initialState, bun, items: [item2, item]})
})

