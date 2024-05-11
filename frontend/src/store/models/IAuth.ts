import { IToken } from "./IToken"

export interface ILogin {
    username: string,
    password: string,
    tokens:IToken
}

export interface IUserRegister {
    username: string,
    email: string,
    first_name?: string,
    last_name?: string,
    password: string,
    password2: string
}

export interface IUser {
    id?: number,
    username: string,
    email?: string,
    first_name?: string,
    last_name?: string,
    license_period?: string,
    date_joined?: string,
    is_admin?: boolean,
    is_staff?: boolean,
    is_active?: boolean,
    is_verified?: boolean
}