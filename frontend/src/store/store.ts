import { authReducer } from './reducers/Auth';
import { AuthAPI } from './apis/AuthAPI';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UsersAPI } from './apis/UserAPI';
import { ObjectsAPI } from './apis/ObjectsAPI';


const rootReducer = combineReducers({
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    authReducer,
    [UsersAPI.reducerPath]: UsersAPI.reducer,
    [ObjectsAPI.reducerPath]: ObjectsAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                AuthAPI.middleware, 
                UsersAPI.middleware,
                ObjectsAPI.middleware
                ),
            
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']