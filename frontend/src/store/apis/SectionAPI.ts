import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { ISection, ISectionCreate } from "../../models/ISections"
import { CalculationsAPI } from "./CalculationsAPI"

const url = 'sections'

export const SectionsAPI = createApi({
    reducerPath:'SectionAPI',
    baseQuery: customFetchBase,
    endpoints:(builder) => ({
        createSection: builder.mutation<ISection, ISectionCreate>({
            query: (data) => ({
                url:`${url}/create/`,
                method: 'POST',
                body: data
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled
                dispatch(CalculationsAPI.util.invalidateTags(['Calculations']))
            },
        })
    }),
})

export const {
    useCreateSectionMutation
} = SectionsAPI