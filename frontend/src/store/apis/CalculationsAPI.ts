import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { ICalculatingCreate, ICalculating, ICalculatingDetail } from "../models/ICalculations"

const url = 'calculations'

export const CalculationsAPI = createApi({
    reducerPath: 'CalculationsAPI',
    baseQuery: customFetchBase,
    tagTypes:['Calculations'],
    endpoints: (builder) => ({
        createCalculation: builder.mutation<ICalculating, ICalculatingCreate>({
            query: (calc) => ({
                url:`${url}/create/`,
                method: 'POST',
                body: calc
            })
        }),
        getCalculationsList: builder.query<ICalculating[], void>({
            query: () => ({
                url:`${url}/list/`
            })
        }),
        getCalculationDetail: builder.query<ICalculatingDetail, string>({
            query: (id) => ({
                url:`${url}/detail/${id}`,
            }),
            providesTags: ['Calculations']
        })
    })
    }
)

export const {
    useCreateCalculationMutation,
    useGetCalculationsListQuery,
    useGetCalculationDetailQuery
} = CalculationsAPI
