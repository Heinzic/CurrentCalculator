import { authReducer } from './reducers/Auth';
import { AuthAPI } from './apis/AuthAPI';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UsersAPI } from './apis/UserAPI';
import { ObjectsAPI } from './apis/ObjectsAPI';
import { CalculationsAPI } from './apis/CalculationsAPI';
import { SectionsAPI } from './apis/SectionAPI';
import { ConsumersAPI } from './apis/ConsumersAPI';


const rootReducer = combineReducers({
    authReducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [UsersAPI.reducerPath]: UsersAPI.reducer,
    [ObjectsAPI.reducerPath]: ObjectsAPI.reducer,
    [CalculationsAPI.reducerPath]: CalculationsAPI.reducer,
    [SectionsAPI.reducerPath]: SectionsAPI.reducer,
    [ConsumersAPI.reducerPath]: ConsumersAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                AuthAPI.middleware, 
                UsersAPI.middleware,
                ObjectsAPI.middleware,
                CalculationsAPI.middleware,
                SectionsAPI.middleware,
                ConsumersAPI.middleware
                ),
            
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']