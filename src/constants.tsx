import BurgerItem from './types/burger-types';

export const DOMAIN = "norma.nomoreparties.space";
export const BASE_URL = `https://${DOMAIN}/api`; 
export const API_URL = BASE_URL + "/ingredients";
export const SUBMIT_URL = BASE_URL + "/orders";
export const FEED_URL = `wss://${DOMAIN}/orders`;

export const BUN: BurgerItem = {
  "_id": "643d69a5c3f7b9001cfa093c",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
};