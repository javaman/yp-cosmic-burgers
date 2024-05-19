import reducer, { initialState, setRestoreStep, setResetEmail, setNewPassword, login, setLoginEmail, setLoginPassword, logout } from './auth'
import { setupStore } from './store';
import fetchMock from 'jest-fetch-mock';
import { BASE_URL } from '../constants';
import { log } from 'console';

fetchMock.enableMocks();


test('Аутентификация/Авторизация редюсер начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
})

/*

export const { setNewPasswordToken, setRegisterEmail, setRegisterPassword, 
               setRegisterLogin, setLoginEmail, setLoginPassword, setLoginState, setName, setEmail,
               requestResetToken, sendNewPassword, register, logout, getProfile, updateProfile}

*/
describe("Аутентификация. Тест кейсы без обращения ко внешнему сервису.", () => {
  test('Сохранение состояния о шаге восстановления пароля', () => {
    const step = "token-sent";
    expect(reducer(initialState, setRestoreStep(step))).toEqual({ ...initialState, restoreStep: step });
  })

  test('Сохранение состояния email для восстановления', () => {
    const email = "dev@null.to";
    expect(reducer(initialState, setResetEmail(email))).toEqual({ ...initialState, resetEmail: email });
  })

  test('Сохранение состояния новый пароль', () => {
    const newPassword = "iddqd";
    expect(reducer(initialState, setNewPassword(newPassword))).toEqual({ ...initialState, newPassword: newPassword });
  })
})


describe('Аутентификация. Тест кейсы с обращением ко внешнему сервису.', () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });


  test('should post data fulfilled', async () => {

    const email = "dev@null.to";
    const password = "password";
    const accessToken = "accessToken";
    const refreshToken = "refreshToken";

    fetch.mockResponseOnce(JSON.stringify({
      accessToken,
      refreshToken
    }));

    const store = setupStore();
    const initialStoreState =  JSON.parse(JSON.stringify(store.getState()));

    store.dispatch(setLoginEmail(email));
    store.dispatch(setLoginPassword(password));
    await store.dispatch(login());

    expect(fetchMock.mock.lastCall[0]).toBe(BASE_URL + "/auth/login");
    const requestBody = JSON.parse(fetchMock.mock.lastCall[1].body);

    expect(requestBody.email).toBe(email);
    expect(requestBody.password).toBe(password);

    expect(fetchMock.mock.lastCall[1].method).toBe("POST");

    expect(store.getState()).toStrictEqual(
      {
        ...initialStoreState,
        auth: {
          ...initialStoreState.auth,
          accessToken,
          refreshToken,
          loginEmail: email,
          loginPassword: password,
          loginState: "ok"
        }
      });
  });

}); 