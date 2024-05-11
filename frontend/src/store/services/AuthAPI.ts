import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin, IUser, IUserRegister } from "../models/IAuth";


export const AuthAPI = createApi({
    reducerPath: 'AuthAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/auth/'
    }),
    endpoints: (build) => ({
        LogInUser: build.mutation<ILogin, {username: string, password: string}>({
            query: (arg) => ({
                url: 'login/',
                method: 'POST',
                body: arg
            }),
        }),
        RegisterUser: build.mutation<IUser, IUserRegister>({
            query: (user) => ({
                url: 'register/',
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