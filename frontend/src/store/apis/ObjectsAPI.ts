import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { IObject } from "../models/IObject"
import { tokenService } from "../services/TokenService"


const url = 'objects'

export const ObjectsAPI = createApi({
    reducerPath:'ObjectsAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        createObject: build.mutation<IObject, IObject>({
            query: (object) => ({
                url: `${url}/create/`,
                method:'POST',
                headers: {'Bearer' : `${tokenService.getLocalAccessToken()}`},
                body: object
           }) 
        }),
    })
})

export const {
    useCreateObjectMutation
} = ObjectsAPI