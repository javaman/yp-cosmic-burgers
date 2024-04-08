import { createSlice, createAsyncThunk, createListenerMiddleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { BASE_URL } from '../constants';
import { checkResponse } from '../utils/networking';
import { RootState } from './store';

interface IAuthState {
    resetEmail: string;
    newPassword: string;
    newPasswordToken: string;
    registerLogin: string;
    registerEmail: string;
    registerPassword: string;
    accessToken?: string;
    refreshToken: string | null;
    loginEmail: string;
    loginPassword: string;
    loginState: string;
    loginError: string;
    email: string;
    name: string;
    restoreStep: string;
};

const initialState: IAuthState = {

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
    async (_, { getState, dispatch}) => {
        const { auth } = getState() as { auth: IAuthState}
        const res = await fetch(BASE_URL + "/password-reset", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: auth.email
            })        
        }).then(checkResponse);
        return res;
    },
);

export const sendNewPassword = createAsyncThunk(
    'password/new',
    async (_, {getState, dispatch }) => {
        const { auth } = getState() as { auth: IAuthState};
        const res = await fetch(BASE_URL + "/password-reset/reset", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: auth.newPassword,
                token: auth.newPasswordToken
            })        
        }).then(checkResponse);
        return res;
    },
);

export const register = createAsyncThunk(
    "user/register",
    async(_, { getState, dispatch }) => {
        const { auth } = getState() as { auth: IAuthState};
        const name = auth.registerLogin;
        const email = auth.registerEmail;
        const password = auth.registerPassword;
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
        }).then(checkResponse);
        return res;        
    }
);

export const login = createAsyncThunk(
    "user/login",
    async(_, { getState, dispatch }) => {
        const { auth } = getState() as { auth: IAuthState};
        const email = auth.loginEmail;
        const password = auth.loginPassword;
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
        }).then(checkResponse);
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
        }).then(checkResponse);
        localStorage.removeItem("refresh-token");
        Cookies.set("access-token", "");
        return res;        
    }
);

export const getProfile = createAsyncThunk(
    "user/getProfile",
    async() => {
        const res = await fetch(BASE_URL + "/auth/user", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': Cookies.get('access-token') ?? ''
            }                   
        }).then(checkResponse);
        return res;        
    }
);

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async(_, { getState }) => {
        const { auth } = getState() as { auth: IAuthState};
        const res = await fetch(BASE_URL + "/auth/user", {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('access-token') ?? ''
            },
            body: JSON.stringify({
                name: auth.name,
                email: auth.email,
            })        
        }).then(checkResponse);
        return res;        
    }
);

export const refreshTokenMiddleware = createListenerMiddleware();
refreshTokenMiddleware.startListening({
    predicate: (action, currentState, previousState) => {
        return "user/register/fulfilled" === action.type || "user/login/fulfilled" === action.type;
    },
    effect: async (action, { getState }) => {
        const { auth } = getState() as { auth: IAuthState};
        localStorage.setItem("refresh-token", auth.refreshToken ?? '');
        Cookies.set('access-token', auth.accessToken ?? '', {expires: 1/96});
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
            state.loginError = action.error.message ?? "Unknown error";
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
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;