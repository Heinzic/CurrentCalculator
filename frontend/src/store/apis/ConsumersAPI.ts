import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { IConsumer, IConsumerCreate, IConsumerType } from "../models/IConsumers"

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
            invalidatesTags: ['Calculations']
        })
    }),
})

export const {
    useGetConsumerTypesQuery,
    useCreateConsumerMutation
} = ConsumersAPI