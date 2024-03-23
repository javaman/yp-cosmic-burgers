import { createSlice, createAsyncThunk, createListenerMiddleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { BASE_UR, BASE_URL } from '../constants';


const initialState = {

    resetEmail: '',

    newPassword: '',
    newPasswordToken: '',

    registerLogin: '',
    registerEmail: '',
    registerPassword: '',

    accessToken: Cookies.get('access-token'),
    refreshToken: localStorage.getItem("refresh-token"),

    loginEmail: '',
    loginPassword: '',
    loginState: "",
    loginError: "",

    email: '',
    name: '',

    restoreStep: ''
}

export const requestResetToken = createAsyncThunk(
    'token/request',
    async (action, thunkApi) => {
        const res = await fetch(BASE_URL + "/password-reset", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: thunkApi.getState().auth.resetEmail
            })        
        }).then(response => {
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
        })});
        return res;
    },
);

export const sendNewPassword = createAsyncThunk(
    'password/new',
    async (action, thunkApi) => {
        const res = await fetch(BASE_URL + "/password-reset/reset", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: thunkApi.getState().auth.newPassword,
                token: thunkApi.getState().auth.newPasswordToken
            })        
        }).then(response => {
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
        })});
        return res;
    },
);

export const register = createAsyncThunk(
    "user/register",
    async(action, thunkApi) => {
        const name = thunkApi.getState().auth.registerLogin;
        const email = thunkApi.getState().auth.registerEmail;
        const password = thunkApi.getState().auth.registerPassword;
        const res = await fetch(BASE_URL + "/auth/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                name
            })        
        }).then(response => {
            return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
        })});
        return res;        
    }
);

export const login = createAsyncThunk(
    "user/login",
    async(action, thunkApi) => {
        const email = thunkApi.getState().auth.loginEmail;
        const password = thunkApi.getState().auth.loginPassword;
        const res = await fetch(BASE_URL + "/auth/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })        
        }).then(response => {
            return response.json().then(json => {
                if (response.ok && json.success) {
                    return json;
                } else {
                    return Promise.reject(json);
                }
        })});
        return res;        
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async(action, thunkApi) => {
        const token = localStorage.getItem("refresh-token");
        const res = await fetch(BASE_URL + "/auth/logout", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token
            })        
        }).then(response => {
            return response.json().then(json => {
                if (response.ok && json.success) {
                    return json;
                } else {
                    return Promise.reject(json);
                }
        })});
        localStorage.removeItem("refresh-token");
        Cookies.set("access-token", "");
        return res;        
    }
);

export const getProfile = createAsyncThunk(
    "user/getProfile",
    async(action, thunkApi) => {
        const res = await fetch(BASE_URL + "/auth/user", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': Cookies.get('access-token')
            }                   
        }).then(response => {
            return response.json().then(json => {
                if (response.ok && json.success) {
                    return json;
                } else {
                    return Promise.reject(json);
                }
        })});
        return res;        
    }
);

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async(action, thunkApi) => {
        const res = await fetch(BASE_URL + "/auth/user", {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('access-token')
            },
            body: JSON.stringify({
                name: thunkApi.getState().auth.name,
                email: thunkApi.getState().auth.email,
            })        
        }).then(response => {
            return response.json().then(json => {
                if (response.ok && json.success) {
                    return json;
                } else {
                    return Promise.reject(json);
                }
        })});
        return res;        
    }
);

export const refreshTokenMiddleware = createListenerMiddleware();
refreshTokenMiddleware.startListening({
    predicate: (action, currentState, previousState) => {
        return "user/register/fulfilled" === action.type || "user/login/fulfilled" === action.type;
    },
    effect: async (action, listenerApi) => {
        localStorage.setItem("refresh-token", listenerApi.getState().auth.refreshToken);
        Cookies.set('access-token', listenerApi.getState().auth.accessToken, {expires: 1/96});
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setResetEmail(state, { payload }) {
            state.resetEmail = payload;
        },
        setNewPassword(state, { payload }) {
            state.newPassword = payload;
        },
        setNewPasswordToken(state, { payload }) {
            state.newPasswordToken = payload;
        },
        setRegisterLogin(state, { payload }) {
            state.registerLogin = payload;
        },
        setRegisterPassword(state, { payload }) {
            state.registerPassword = payload;
        },
        setRegisterEmail(state, { payload }) {
            state.registerEmail = payload;
        },
        setLoginEmail(state, { payload }) {
            state.loginEmail = payload;
        },
        setLoginPassword(state, { payload }) {
            state.loginPassword = payload;
        },
        setLoginState(state, { payload }) {
            state.loginState = payload;
        },
        setEmail(state, { payload }) {
            state.email = payload;
        },
        setName(state, { payload }) {
            state.name = payload;
        },
        setRestoreStep(state, { payload }) {
            state.restoreStep = payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(requestResetToken.fulfilled, (state, action) => {
            state.resetEmail = '';
        });
        builder.addCase(sendNewPassword.fulfilled, (state, action) => {
            state.newPassword = '';
            state.newPasswordToken = '';
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        });

        builder.addCase(login.pending, (state, action) => {
            state.loginState = "pending";
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.loginState = "ok";
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.restoreStep = '';
        });

        builder.addCase(login.rejected, (state, action) => {
            state.loginError = action.error.message;
            state.loginState = "error";
        });

        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.email = action.payload.user.email;
            state.name = action.payload.user.name;
        });
    }
});



export const { setRestoreStep, setResetEmail, setNewPassword, setNewPasswordToken, setRegisterEmail, setRegisterPassword, 
               setRegisterLogin, setLoginEmail, setLoginPassword, setLoginState, setName, setEmail } = authSlice.actions;
export default authSlice.reducer;