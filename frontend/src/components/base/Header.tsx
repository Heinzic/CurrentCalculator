import { NavLink } from "react-router-dom"
import { RootState } from "../../store/store"
import { connect } from "react-redux"
import { useState } from "react"
import CreateObjectModal from "../elements/CreateObjectModal"

interface HeaderProps {
    first_name: string
    last_name: string
}

function Header({first_name, last_name}: HeaderProps) {

    const [modalActive, setModalActive] = useState(false)

    return (
        <>
            <header className="bg-[#454F55] py-2 text-white">
                <div className="flex flex-row justify-between mx-[90px]">
                    <div className="flex flex-row justify-between gap-[20px]">
                        <NavLink to={'/'} className="hover:text-[#97989A]">
                            Все расчеты
                        </NavLink>
                        <svg width="1" height="33" viewBox="0 0 1 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.5" x2="0.5" y2="33" stroke="white"/>
                        </svg>
                        <NavLink to={'/createCalculation'} className="hover:text-[#97989A]">
                            Создать расчет
                        </NavLink>
                        <svg width="1" height="33" viewBox="0 0 1 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.5" x2="0.5" y2="33" stroke="white"/>
                        </svg>
                        <button className="hover:text-[#97989A]" onClick={() => setModalActive(!modalActive)}>
                            Создать обьект 
                        </button>
                    </div>
                    <NavLink to={'/profile'} className="flex flex-row gap-[15px] hover:text-[#97989A]">
                        <div className="">
                            {first_name}
                        </div>
                        <div className="">
                            {last_name}
                        </div>
                        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="17.7693" cy="10.1508" rx="11.9538" ry="10.1508" fill="#FBFAFA"/>
                            <path d="M36.1846 35.6661C22.9385 35.6661 28.0844 35.6661 18.0923 35.6661C8.1002 35.6661 10.3385 35.6661 0 35.6661C0 27.1812 8.1002 20.3027 18.0923 20.3027C28.0844 20.3027 36.1846 27.1812 36.1846 35.6661Z" fill="#FBFAFA"/>
                        </svg>
                    </NavLink>
                    <CreateObjectModal active={modalActive} setActive={setModalActive} />
                </div>
            </header>
        </>
    )
}

function mapStateToProps (state: RootState) {
    return {
        first_name: state.authReducer.user.first_name,
        last_name: state.authReducer.user.last_name
    }
}
    

export default connect(mapStateToProps)(Header)