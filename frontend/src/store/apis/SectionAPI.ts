import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { ISection, ISectionCreate } from "../models/ISections"

const url = '/sections'

export const SectionsAPI = createApi({
    reducerPath:'SectionAPI',
    baseQuery: customFetchBase,
    endpoints:(builder) => ({
        createSection: builder.mutation<ISection, ISectionCreate>({
            query: (data) => ({
                url:`${url}/create/`,
                method: 'POST',
                body: data
            })
        })
    }),
})

export const {
    useCreateSectionMutation
} = SectionsAPI