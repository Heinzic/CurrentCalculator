import { useState } from "react";
import Footer from "../base/Footer";
import Header from "../base/Header";
import CalculationTable from "../elements/CalculationTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateCalculation() {

    const [objectOpen, setObjectOpen] = useState(false)
    const [startDate, setStartDate] = useState<Date | null>(null);
    const objectOptions = [
        'Обьект 1',
        'Object 2',
        'Обьект 3',
    ]

    function handleClick(e: React.MouseEvent<HTMLButtonElement>, option: boolean, setOption: React.Dispatch<React.SetStateAction<boolean>>) {
        e.preventDefault()
        setOption(!option)
    }

    return ( 
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <div className="max-w-[1740px] w-[100%] mx-auto mt-[20px] flex-grow h-[1000px] flex flex-col gap-[14px]">
                <h1 className="my-0 ">Создание расчета мощности</h1>
                <div className="flex gap-[24px] ">
                    <button className="bg-[#9AA8B0] px-[50px] py-[8px] rounded-md">
                        Сохранить
                    </button>
                    <button className="bg-[#D0D4D9] px-[40px] rounded-md">
                        Назад
                    </button>
                </div>
                <div className="flex flex-row gap-[17px]">
                    <div className="">
                        <button className="flex items-center text-[20px] gap-[8px] ml-auto bg-[#EBEBEB] rounded-md px-[7px] w-[510px] justify-between"
                        onClick={(e) => handleClick(e, objectOpen, setObjectOpen)}>
                            <div className="py-[8px] px-[22px] text-left text-[#454F55]">Объект</div>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="26" height="26" rx="7" transform="matrix(-1 0 0 1 26 0)" fill="#9AA8B0"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4599 8.55275C21.9053 8.99809 21.9053 9.72012 21.4599 10.1655L13.719 17.9064C13.4947 18.1307 13.2002 18.242 12.9062 18.2404C12.6122 18.242 12.3177 18.1307 12.0934 17.9064L4.35243 10.1655C3.90709 9.72012 3.90709 8.99809 4.35243 8.55275C4.79776 8.10742 5.51979 8.10742 5.96513 8.55275L12.9062 15.4938L19.8472 8.55275C20.2926 8.10742 21.0146 8.10742 21.4599 8.55275Z" fill="white"/>
                            </svg>
                        </button>
                        <ul className={objectOpen? "z-10 absolute min-w-[500px] mt-[8px] mx-auto" : 'z-10 absolute min-w-[267px] mt-[8px] mx-auto invisible'}>
                            <div className="relative p-[20px] bg-white">
                                {objectOptions.map(e => (
                                <li className="flex text-[16px]" key={e}>
                                    <label htmlFor={e} className="select-none grow">{e}</label>
                                    <input type="checkbox" id={e} className="w-[19px]" />
                                </li> 
                                ))}
                            </div>
                        </ul>
                    </div>
                    <div className="">
                    <DatePicker
                        showIcon
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        icon={
                            <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="26" height="26" rx="7" transform="matrix(-1 0 0 1 26.8887 0)" fill="#9AA8B0"/>
                                <rect width="2.2807" height="13.2281" rx="1.14035" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 23.1553 9.35938)" fill="white"/>
                                <rect x="4.43457" y="9.35938" width="2.2807" height="13.2281" rx="1.14035" transform="rotate(-45 4.43457 9.35938)" fill="white"/>
                            </svg>

                        }
                        placeholderText="Дата"
                        className="bg-[#EBEBEB] rounded-md w-[510px]"
                    />
                    </div>
                </div>
                <div className="flex flex-row gap-[17px]">
                    <div className="">
                        <input type="text" placeholder="Заказчик" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                    </div>
                    <div className="">
                        <input type="text" placeholder="Примечание" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                    </div>
                </div>
                <div className="flex flex-row gap-[17px] justify-between">
                    <div className="flex gap-[19px]">
                        <button className="bg-[#D0D4D9] px-[40px] py-[8px] rounded-md">
                            Добавить потребителя
                        </button>
                        <button className="bg-[#D0D4D9] px-[40px] rounded-md">
                            Добавить ВРУ
                        </button>
                        <button className="bg-[#D0D4D9] px-[40px] rounded-md">
                            Распеределить по ВРУ
                        </button>
                    </div>
                    <div className="">
                        <button className="bg-[#D0D4D9] px-[40px] py-[8px] rounded-md">
                            Предварительный просмотр
                        </button>
                    </div>
                </div>
                <CalculationTable/>
            </div>
            <Footer/>
        </div>
    );
}

export default CreateCalculation;