import { NavLink, useNavigate } from "react-router-dom"
import UnloggedHeader from "../base/UnloggedHeader"
import Footer from "../base/Footer"
import { IUserRegister } from "../../store/models/IAuth"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRegisterUserMutation } from "../../store/apis/AuthAPI"

interface IRegisterForm extends IUserRegister {}

function Register() {

    const {register, handleSubmit, reset } = useForm<IRegisterForm>()
    const [registerUser, {}] = useRegisterUserMutation()
    const navigate = useNavigate()

    const submit: SubmitHandler<IRegisterForm> = data => {
        registerUser(data)
        reset()
        navigate('/')
    }

    return (
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <UnloggedHeader  
                title="Вход"
                link="/"
            />
            <div className="max-w-[850px] w-[850px] mx-auto flex-grow flex-shrink">
                <h1 className="text-[32px] ml-[53px] mt-[56px]">
                    Регистрация
                </h1>
                <div className="max-w-[820px] bg-[#D0DADF] mt-[20px] rounded-md border-[2px] border-[#454F55] mx-auto">
                    <div className="p-[15px]">
                        <form onSubmit={handleSubmit(submit)} className="flex flex-col px-[38px] gap-[10px] pt-[41px] bg-[#FFFFFF] rounded-md">
                            <input {...register('username', {required: true})} type="text" placeholder="Логин*" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <input {...register('first_name')} type="text" placeholder="Имя" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <input {...register('last_name')} type="text" placeholder="Фамилия" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <input {...register('password', {required:true})} type="password" placeholder="Пароль*" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <input {...register('password2', {required: true})} type="password" placeholder="Повторите пароль*" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <input {...register('email', {required: true})} type="email" placeholder="Электронная почта*" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <div className="flex justify-between pb-[40px] mt-[41px] items-center">
                                <span className="text-[#454F55]">
                                    Есть аккаунт? <NavLink to={'/'} className="underline text-black">Вход</NavLink>  
                                </span>
                                <button type="submit" className="bg-[#9AA8B0] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
                                    Зарегистрироваться
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Register