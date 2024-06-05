import { Outlet, useNavigate } from "react-router-dom";
import { useLoadMyProfileQuery } from "../apis/UserAPI";
import { FC, useEffect } from "react";

export const LoginGuard:FC = () => {
    let profile = useLoadMyProfileQuery()
    const navigate = useNavigate()
    useEffect(() => {
        if(!profile.isSuccess && !profile.isLoading)
        {
            console.log(profile);
            
            navigate('/login')
            
        }
            
    }, [profile.isLoading])
    return <Outlet/>
}