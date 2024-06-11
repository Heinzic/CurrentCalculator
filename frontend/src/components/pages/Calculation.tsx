import React, { useEffect, useState } from "react";
import Footer from "../base/Footer";
import Header from "../base/Header";
import CalculationTable from "../elements/CalculationTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useGetCalculationDetailQuery } from "../../store/apis/CalculationsAPI";
import AddSectionModal from "../elements/AddSectionModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface ICalculationsForm {
    costumer: string
    annotation: string
}

function Calculation() {

    const {id} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()

    if (id === undefined || !id) {
        navigate ('/')
        return
    } 
    const {data, isError} = useGetCalculationDetailQuery(id)

    useEffect(() =>{
        getData(id)
    }, [])

    if (data === undefined && isError ) {
        return (<>Ошибка</>)
    }
        
    const [objectOpen, setObjectOpen] = useState(false)
    const [sectionModalActive, setSectionModalActive] = useState(state)
    
    const {register} = useForm<ICalculationsForm>({mode:"onBlur"})

    function handleClick(e: React.MouseEvent<HTMLButtonElement>, option: boolean, setOption: React.Dispatch<React.SetStateAction<boolean>>) {
        e.preventDefault()
        setOption(!option)
    }
    
    async function getData(id: string) {
        const response = await useGetCalculationDetailQuery(id)
        return response
    }
    
    return (data) && ( 
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <form className="max-w-[1740px] w-[100%] mx-auto mt-[20px] flex-grow h-[1000px] flex flex-col gap-[14px]">
                <h1 className="my-0 ">Создание расчета мощности</h1>
                <div className="flex gap-[24px] ">
                    <button className="bg-[#9AA8B0] px-[50px] py-[8px] rounded-md" onClick={(e) => handleClick(e, sectionModalActive, setSectionModalActive)}>
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
                            <div className="py-[8px] px-[15px] text-left text-[#454F55]">{data.object? data.object.name : 'Объект'}</div>
                        </button>
                    </div>
                    <div className="">
                    <DatePicker
                        selected={data.date}
                        onChange={() => {}}
                        className="bg-[#EBEBEB] rounded-md w-[510px]"
                    />
                    </div>
                </div>
                <div className="flex flex-row gap-[17px]">
                    <div className="">
                        <input {...register('costumer')} type="text" placeholder={data?.costumer} value={data?.costumer? data.costumer : ''} className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                    </div>
                    <div className="">
                        <input {...register('annotation')} type="text" placeholder={data?.annotation} value={data?.annotation? data.annotation : ''} className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                    </div>
                </div>
                <div className="flex flex-row gap-[17px] justify-between">
                    <div className="flex gap-[19px]">
                        <button className="bg-[#D0D4D9] px-[40px] py-[8px] rounded-md disabled:bg-slate-200">
                            Добавить потребителя
                        </button>
                        <button className="bg-[#D0D4D9] px-[40px] rounded-md" type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            setSectionModalActive(!sectionModalActive)
                        }}
                        >
                            Добавить ВРУ
                        </button>
                        <button className="bg-[#D0D4D9] px-[40px] rounded-md disabled:bg-slate-200">
                            Распеределить по ВРУ
                        </button>
                    </div>
                    <div className="">
                        <button className="bg-[#D0D4D9] px-[40px] py-[8px] rounded-md">
                            Предварительный просмотр
                        </button>
                    </div>
                </div>
                <div className="">
                    <CalculationTable
                    sections={data.sections}
                    />
                </div>
                
                <AddSectionModal 
                active={sectionModalActive} 
                setActive={setSectionModalActive} 
                id={Number(id)}
                />
            </form>
            <Footer/>
        </div>
    );
}

export default Calculation;