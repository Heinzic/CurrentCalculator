import { connect } from "react-redux";
import { IUser } from "../models/IAuth";
import { RootState } from "../store";
import React from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
    isAuth: boolean
    user: IUser
}

function PrivateRoutes ({isAuth, user, }: PrivateRouteProps) {

    return isAuth? <Outlet/>: <Navigate to={'/login'}/>
}

function mapStateToProps(state: RootState){
    return {
        isAuth: state.authReducer.isAuth,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(PrivateRoutes)