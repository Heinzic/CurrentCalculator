import { NavLink } from "react-router-dom"
import UnloggedHeader from "../base/UnloggedHeader"
import Footer from "../base/Footer"

function Register() {
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
                        <div className="flex flex-col px-[38px] gap-[10px] pt-[41px] bg-[#FFFFFF] rounded-md">
                            <input type="text" placeholder="Придумайте логин" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <input type="text" placeholder="Имя Фамилия" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <input type="password" placeholder="Пароль" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <input type="password" placeholder="Повторите пароль" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <input type="email" placeholder="Электронная почта" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <div className="flex justify-between pb-[40px] mt-[41px] items-center">
                                <span className="text-[#454F55]">
                                    Есть аккаунт? <NavLink to={'/'} className="underline text-black">Вход</NavLink>  
                                </span>
                                <NavLink to={'/main'} className="bg-[#9AA8B0] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
                                    Зарегистрироваться                                
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Register