import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
        RegisterUser: build.mutation<IUser, IUserRegister>({
            query: (user) => ({
                url: `${url}/register/`,
                method: 'POST',
                body: user
            })
        })
    })
})

export const {
    useLogInUserMutation,
    useRegisterUserMutation
} = AuthAPI