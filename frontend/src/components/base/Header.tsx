import { NavLink } from "react-router-dom"

function Header() {
    return (
        <>
            <header className="bg-[#454F55] py-2 text-white">
                <div className="flex flex-row justify-between mx-[90px]">
                    <div className="flex flex-row justify-between gap-[20px]">
                        <NavLink to={'/main'} className="hover:text-[#97989A]">
                            Все расчеты
                        </NavLink>
                        <svg width="1" height="33" viewBox="0 0 1 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.5" x2="0.5" y2="33" stroke="white"/>
                        </svg>
                        <NavLink to={'/'} className="hover:text-[#97989A]">
                            Создать расчет
                        </NavLink>
                        <svg width="1" height="33" viewBox="0 0 1 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.5" x2="0.5" y2="33" stroke="white"/>
                        </svg>
                        <NavLink to={'/'} className="hover:text-[#97989A]">
                            Создать обьект 
                        </NavLink>
                    </div>
                    <NavLink to={'/profile'} className="flex flex-row gap-[15px] hover:text-[#97989A]">
                        Иван Иванов
                        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="17.7693" cy="10.1508" rx="11.9538" ry="10.1508" fill="#FBFAFA"/>
                            <path d="M36.1846 35.6661C22.9385 35.6661 28.0844 35.6661 18.0923 35.6661C8.1002 35.6661 10.3385 35.6661 0 35.6661C0 27.1812 8.1002 20.3027 18.0923 20.3027C28.0844 20.3027 36.1846 27.1812 36.1846 35.6661Z" fill="#FBFAFA"/>
                        </svg>
                    </NavLink>
                </div>
            </header>
        </>
    )
}

export default Header