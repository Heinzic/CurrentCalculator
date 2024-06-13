import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

const url = 'inputs'

export const InputsAPI = createApi({
    reducerPath: 'InputsApi',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getInputsList: builder.query<void, number>({
            query: (id) => ({
                url: `${url}/list/${id}`
            })
        })
    })
})

export const {
    useGetInputsListQuery
} = InputsAPI