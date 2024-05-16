import axios, { AxiosResponse } from "axios";
import { ILogin } from "../models/IAuth";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<ILogin>> {
        return axios.post('')
    }
}