import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/IAuth";
import { IToken } from "../models/IToken";
import { AuthAPI } from "../apis/AuthAPI";

interface AuthState {
    user: IUser,
    isAuth: boolean,
    isLoading: boolean,
}

const initialState: AuthState = {
    user: {
        username:'',
        date_joined: '',
        email: '',
        first_name: '',
        id: 0 ,
        is_active: false,
        is_admin: false,
        is_staff: false,
        is_verified: false,
        last_name: '',
        license_period: ''
    },
    isAuth: false,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addMatcher(
            AuthAPI.endpoints.LogInUser.matchFulfilled,
            (state, {payload}) => {
                localStorage.setItem('access', payload.tokens.access)
                localStorage.setItem('refresh', payload.tokens.refresh)
                // state.tokens.access = payload.tokens.access
                // state.tokens.refresh = payload.tokens.refresh
            }
        )
    },
})

export const authReducer = authSlice.reducer