import { NavLink } from "react-router-dom"
import UnloggedHeader from "../base/UnloggedHeader"
import Footer from "../base/Footer"
import Header from "../base/Header"

function Profile() {
    return (
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <div className="max-w-[850px] w-[850px] mx-auto flex-grow flex-shrink">
                <h1 className="text-[32px] ml-[53px] mt-[56px]">
                    Профиль
                </h1>
                <div className="max-w-[820px] bg-[#D0DADF] mt-[20px] rounded-md border-[2px] border-[#454F55] mx-auto">
                    <div className="p-[15px]">
                        <div className="flex flex-col px-[38px] gap-[30px] pt-[41px] bg-[#FFFFFF] rounded-md">
                            <div className="text-[24px] font-bold">
                                Иван Иванов
                            </div>
                            <div className="">
                                Почта: aaaaa@aaa
                            </div>
                            <div className="">
                                Лицензия: 1241511 от 10.01.2024
                            </div>
                            <div className="flex pb-[40px] mt-[41px] items-center gap-[90px]">
                                <div className="flex gap-[20px]">
                                    <NavLink to={'/'} className="bg-[#D0D4D9] px-[18px] py-[10px] rounded-md text-center border-[1px] hover:border-gray-700">
                                        Сменить пароль                              
                                    </NavLink>
                                    <NavLink to={'/'} className="bg-[#D0D4D9] px-[18px] py-[10px] rounded-md text-center border-[1px] hover:border-gray-700 w-[190px]">
                                        Редактировать                              
                                    </NavLink>
                                </div>
                                <NavLink to={'/login'} className="bg-[#9AA8B0] px-[18px] py-[10px] rounded-md flex-grow max-w-[220px] text-center border-[1px] hover:border-gray-700">
                                    Выйти из аккаунта                                
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

export default Profile