import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { IUser } from "../models/IAuth"


const url = 'users'

export const UsersAPI = createApi({
    reducerPath:'UsersAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        loadMyProfile: build.query<IUser, string>({
            query: (access) => ({
                url: `${url}/me/`,
                headers: {'Bearer' : `${access}`}
           }) 
        }),
    })
})

export const {
    useLoadMyProfileQuery
} = UsersAPI