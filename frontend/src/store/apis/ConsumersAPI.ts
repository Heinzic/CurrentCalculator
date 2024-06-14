import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { IConsumer, IConsumerCreate, IConsumerType } from "../../models/IConsumers"
import { CalculationsAPI } from "./CalculationsAPI"

const url = 'consumers'

export const ConsumersAPI = createApi({
    reducerPath:'ConsumersAPI',
    baseQuery: customFetchBase,
    tagTypes: ['Consumers', 'Calculations'],
    endpoints:(builder) => ({
        getConsumerTypes: builder.query<IConsumerType[], void>({
            query: () => ({
                url:`${url}/types/`
            }),
        }),
        createConsumer: builder.mutation<IConsumer, IConsumerCreate>({
            query: (consumer) => ({
                url:`${url}/create/`,
                method:'POST',
                body: consumer,
                
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled
                dispatch(CalculationsAPI.util.invalidateTags(['Calculations']))
            },
        }),
        deleteConsumer: builder.mutation<void, number>({
            query: (id) => ({
                url:`${url}/${id}`,
                method:'DELETE',
                body: id,
                
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled
                dispatch(CalculationsAPI.util.invalidateTags(['Calculations']))
            },
        })
    }),
})

export const {
    useGetConsumerTypesQuery,
    useCreateConsumerMutation,
    useDeleteConsumerMutation
} = ConsumersAPI