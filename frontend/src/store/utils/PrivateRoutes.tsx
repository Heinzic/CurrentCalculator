import { connect } from "react-redux";
import { IUser } from "../models/IAuth";
import { RootState } from "../store";
import React, { useEffect } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useLoadMyProfileQuery } from "../apis/UserAPI";
import { tokenService } from "../services/TokenService";

interface PrivateRouteProps {
    isAuth: boolean
    user: IUser
}

function PrivateRoutes ({isAuth, user, }: PrivateRouteProps) {
    
    return isAuth? <Outlet/>: <Navigate to={'/login'}/>
}



// useEffect(() =>{
// let profile
// if (access)
//     profile = loadProfile(access)
// if (profile != undefined) return navigate('/')
// }, [])

function mapStateToProps(state: RootState){
    return {
        isAuth: state.authReducer.isAuth,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(PrivateRoutes)