import { createApi } from "@reduxjs/toolkit/query/react";
import { ILogin, IUser, IUserRegister } from "../models/IAuth";
import { customFetchBase } from "./customFetchBase";


const url = 'auth'

export const AuthAPI = createApi({
    reducerPath: 'AuthAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        LogInUser: build.mutation<ILogin, {username: string, password: string}>({
            query: (arg) => ({
                url: `${url}/login/`,
                method: 'POST',
                body: arg
            }),
        }),
        LogOutUser: build.mutation<void, string>({
            query: (refresh) => ({
                url:`${url}/logout/`,
                method:'POST',
                body:{refresh: `${refresh}`}
            })
        }),
        RegisterUser: build.mutation<IUser, IUserRegister>({
            query: (user) => ({
                url: `${url}/register/`,
                method: 'POST',
                body: user
            })
        }),
        RefreshToken: build.mutation<string, string>({
            query: (refresh) => (
                {
                    url:`${url}/token/refresh/`,
                    method: 'POST',
                    body:refresh
                }
            )
        })
    })
})

export const {
    useLogInUserMutation,
    useRegisterUserMutation,
    useRefreshTokenMutation,
    useLogOutUserMutation
} = AuthAPI