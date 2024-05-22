import reducer, { initialState, setRestoreStep, setResetEmail, setNewPassword, login, setLoginEmail, setLoginPassword, logout, requestResetToken, sendNewPassword, setNewPasswordToken, register, setEmail, setRegisterEmail, setRegisterPassword, setName, setRegisterLogin, getProfile, updateProfile, setLoginState } from './auth'
import { setupStore } from './store';
import fetchMock from 'jest-fetch-mock';
import { BASE_URL } from '../constants';
import Cookies from 'js-cookie';

fetchMock.enableMocks();

describe("Аутентификация. Тест кейсы без обращения ко внешнему сервису.", () => {
  test('Аутентификация/Авторизация редюсер начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('Сохранение состояния о шаге восстановления пароля', () => {
    const step = "token-sent";
    expect(reducer(initialState, setRestoreStep(step))).toEqual({ ...initialState, restoreStep: step });
  });

  test('Сохранение состояния email для восстановления', () => {
    const email = "dev@null.to";
    expect(reducer(initialState, setResetEmail(email))).toEqual({ ...initialState, resetEmail: email });
  });

  test('Сохранение состояния новый пароль', () => {
    const newPassword = "iddqd";
    expect(reducer(initialState, setNewPassword(newPassword))).toEqual({ ...initialState, newPassword: newPassword });
  });

  test('Сохранение токена для нового пароля', () => {
    const newPasswordToken = "iddqd";
    expect(reducer(initialState, setNewPasswordToken(newPasswordToken))).toEqual({ ...initialState, newPasswordToken });
  });

  test('Сохранение email для регистрации', () => {
    const registerEmail = "dev@null.to";
    expect(reducer(initialState, setRegisterEmail(registerEmail))).toEqual({ ...initialState, registerEmail });
  });

  test('Сохранение пароля для регистрации', () => {
    const registerPassword = "password";
    expect(reducer(initialState, setRegisterPassword(registerPassword))).toEqual({ ...initialState, registerPassword });
  });

  test('Сохранение логина для регистрации', () => {
    const registerLogin = "password";
    expect(reducer(initialState, setRegisterLogin(registerLogin))).toEqual({ ...initialState, registerLogin });
  });

  test('Сохранение email для входа', () => {
    const loginEmail = "dev@null.to";
    expect(reducer(initialState, setLoginEmail(loginEmail))).toEqual({ ...initialState, loginEmail });
  });

  test('Сохранение пароля для входа', () => {
    const loginPassword = "password";
    expect(reducer(initialState, setLoginPassword(loginPassword))).toEqual({ ...initialState, loginPassword });
  });

  test('Сохранение шага входа в приложении', () => {
    const loginState = "ok";
    expect(reducer(initialState, setLoginState(loginState))).toEqual({ ...initialState, loginState });
  });

  test('Сохранение имя в профиле', () => {
    const name = "ok";
    expect(reducer(initialState, setName(name))).toEqual({ ...initialState, name });
  });

  test('Сохранение email в профиле', () => {
    const email = "dev@null.to";
    expect(reducer(initialState, setEmail(email))).toEqual({ ...initialState, email });
  });
  
})


describe('Аутентификация. Тест кейсы с обращением ко внешнему сервису.', () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });


  test('Логин. Отправка данных и обновление состояния.', async () => {

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

  test('Логаут. Отправка данных и обновление состояния.', async () => {

    const token = "this-is-a-token";
    localStorage.setItem("refresh-token", token);

    fetch.mockResponseOnce(JSON.stringify({
      token,
    }));

    const store = setupStore();
    await store.dispatch(logout());
    
    expect(fetchMock.mock.lastCall[0]).toBe(BASE_URL + "/auth/logout");
    const requestBody = JSON.parse(fetchMock.mock.lastCall[1].body);

    expect(requestBody.token).toBe(token);

    expect(fetchMock.mock.lastCall[1].method).toBe("POST");
    expect(localStorage.getItem("refresh-token")).toBe(null);
  });

  test('Получение токена на сброс пороля.', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      "success" : true,
      "message" : "Reset email sent"
    }));

    const resetEmail = "dev@to.null";
    const store = setupStore();
    const initialStoreState =  JSON.parse(JSON.stringify(store.getState()));
        
    store.dispatch(setResetEmail(resetEmail));
    await store.dispatch(requestResetToken());

    expect(fetchMock.mock.lastCall[0]).toBe(BASE_URL + "/password-reset");
    const requestBody = JSON.parse(fetchMock.mock.lastCall[1].body);
    expect(requestBody.email).toBe(resetEmail);
    expect(fetchMock.mock.lastCall[1].method).toBe("POST");   

    expect(store.getState()).toStrictEqual(initialStoreState);

  });

  test('Новый пароль', async () => {

    fetch.mockResponseOnce(JSON.stringify({
      "success" : true,
      "message" : "Password successfully reset"
    }));

    const token = "c87b75f4-d504-438e-a522-5b15c31ca5aa";
    const password = "newpassword";
    const store = setupStore();
    const initialStoreState =  JSON.parse(JSON.stringify(store.getState()));      

    store.dispatch(setNewPasswordToken(token));
    store.dispatch(setNewPassword(password))
    await store.dispatch(sendNewPassword());

    expect(fetchMock.mock.lastCall[0]).toBe(BASE_URL + "/password-reset/reset");
    const requestBody = JSON.parse(fetchMock.mock.lastCall[1].body);

    expect(requestBody.token).toBe(token);
    expect(requestBody.password).toBe(password);
    expect(fetchMock.mock.lastCall[1].method).toBe("POST");   

    expect(store.getState()).toStrictEqual(initialStoreState);

  });

  test('Регистрация пользователя', async () => {

    const accessToken = "access-token";
    const refreshToken = "refresh-token";
    const email = "dev@null.to";
    const name = "name";
    const password = "password";

    fetch.mockResponseOnce(JSON.stringify({
      accessToken,
      refreshToken,
      user: {
        email,
        name
      }
    }));

    const store = setupStore();
    const initialStoreState =  JSON.parse(JSON.stringify(store.getState()));      

    store.dispatch(setRegisterEmail(email));
    store.dispatch(setRegisterPassword(password));
    store.dispatch(setRegisterLogin(name));    
    await store.dispatch(register());

    expect(fetchMock.mock.lastCall[0]).toBe(BASE_URL + "/auth/register");
    const requestBody = JSON.parse(fetchMock.mock.lastCall[1].body);

    expect(requestBody.email).toBe(email);
    expect(requestBody.name).toBe(name);
    expect(requestBody.password).toBe(password);
    expect(fetchMock.mock.lastCall[1].method).toBe("POST");   

    expect(store.getState()).toStrictEqual({...initialStoreState, auth: {...initialStoreState.auth, accessToken, refreshToken, registerEmail: email, registerLogin: name, registerPassword: password}});

  });

  test('Информация профиля с сервера', async () => {

    const accessToken = "Bearer authroken";
    Cookies.set("access-token", accessToken);
    const email = "dev@null.to";
    const name = "name";

    fetch.mockResponseOnce(JSON.stringify({
      success: true,
      user: {
        email,
        name
      }
    }));

    const store = setupStore();
    const initialStoreState =  JSON.parse(JSON.stringify(store.getState()));      
   
    await store.dispatch(getProfile());

    expect(fetchMock.mock.lastCall[0]).toBe(BASE_URL + "/auth/user");
    expect(fetchMock.mock.lastCall[1].method).toBe("GET");   

    expect(store.getState()).toStrictEqual({...initialStoreState, auth : {...initialStoreState.auth, name: name, email: email}});
  });

  test('Обновление профиля', async () => {

    const accessToken = "Bearer authroken";
    Cookies.set("access-token", accessToken);
    const email = "dev@null.to";
    const name = "name";

    fetch.mockResponseOnce(JSON.stringify({
      success: true,
      user: {
        email,
        name
      }
    }));

    const store = setupStore();
    const initialStoreState =  JSON.parse(JSON.stringify(store.getState()));      
   
    store.dispatch(setEmail(email));
    store.dispatch(setName(name));
    await store.dispatch(updateProfile());

    expect(fetchMock.mock.lastCall[0]).toBe(BASE_URL + "/auth/user");
    expect(fetchMock.mock.lastCall[1].method).toBe("PATCH");   

    expect(store.getState()).toStrictEqual({...initialStoreState, auth : {...initialStoreState.auth, name: name, email: email}});
  });
}); 