import reducer from './auth'

test('Аутентификация/Авторизация редюсер начальное состояние', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual(
    { "accessToken": undefined, "email": "", "loginEmail": "", "loginError": "", "loginPassword": "", "loginState": "", "name": "", "newPassword": "", "newPasswordToken": "", "refreshToken": null, "registerEmail": "", "registerLogin": "", "registerPassword": "", "resetEmail": "", "restoreStep": "" }
  )
})


