import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateObjectMutation } from "../../store/apis/ObjectsAPI";
import { useCreateSectionMutation } from "../../store/apis/SectionAPI";
import { useCreateCalculationMutation } from "../../store/apis/CalculationsAPI";
import { ICalculatingCreate } from "../../store/models/ICalculations";
import { ISectionCreate } from "../../store/models/ISections";
import { useEffect } from "react";

interface CreateObjectProps {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    calculatingData: ICalculatingCreate
}

interface ISectionForm {
    name:'',
    address:'',
    region_coefficient:'CNT',
    area:0
}

function AddSectionModal({active, setActive, calculatingData}: CreateObjectProps) {
    
    const {register, handleSubmit} = useForm<ISectionForm>({mode:'onBlur'})
    const [createCalculation] = useCreateCalculationMutation()
    const [createSection] = useCreateSectionMutation()

    useEffect(() =>{
        
        if(active) {
            // createCalculation(calculatingData)
            console.log('создалось');
        }
        
    }, [active])

    async function createCalculations(data: ICalculatingCreate) {
        return await createCalculation(data)
    }

    async function addSection(session: ISectionCreate, calc: ICalculatingCreate, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        const calculation = (await createCalculation(calc)).data
        await createSection(session)
    }

    const submit: SubmitHandler<ISectionForm> = async (data) => {
        
        setActive(false)
    }
    
    return (
        <div className={active? 'visible fixed z-10' : 'hidden'}>
            <div className="h-[100vh] w-[100vw] fixed bg-[#000000] bg-opacity-40 top-0 left-0 flex items-center justify-center z-10" onClick={() => setActive(false)}>
               <form action="" onClick={(e) => e.stopPropagation()} className="w-[858px] bg-[#D0DADF]" onSubmit={handleSubmit(submit)}>
                    <div className="p-[15px]">
                        <div className="flex flex-col px-[38px] gap-[10px] pt-[41px] bg-[#FFFFFF] rounded-md text-black">
                            <h1 className="text-[32px]">Создание ВРУ</h1>
                            <input type="text" placeholder="Имя ВРУ*" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <input type="text" placeholder="Ограничение мощности" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <div className="flex justify-end gap-[22px] pb-[40px] mt-[41px] items-center text-black">
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setActive(false)
                                }} className="bg-[#D0D4D9] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
                                    Отмена                                
                                </button>
                                <button type="submit" className="bg-[#9AA8B0] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
                                    Сохранить                                
                                </button>
                            </div>
                        </div>
                    </div>
                </form> 
            </div>
            
        </div>
    )
}

export default AddSectionModal;