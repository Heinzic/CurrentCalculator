import { Outlet, useNavigate } from "react-router-dom";
import { tokenService } from "../services/TokenService"
import { useLoadMyProfileQuery } from "../apis/UserAPI";
import { FC } from "react";

const LoginGuard: FC = () => {
    const access = tokenService.getLocalAccessToken()
    const navigate = useNavigate()
    if (access) {
        const profile = useLoadMyProfileQuery(access)
        if (profile) navigate('/')
    }

    return <Outlet/>
}

export default LoginGuard