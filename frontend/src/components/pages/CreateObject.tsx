import { SubmitHandler, useForm } from "react-hook-form";
import { tokenService } from "../../store/services/TokenService";
import { useCreateObjectMutation } from "../../store/apis/ObjectsAPI";

interface CreateObjectProps {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

interface IObjectForm {
    name:'',
    address:'',
    region_coefficient:'CNT',
    area:0
}

function CreateObject({active, setActive}: CreateObjectProps) {
    
    const {register, handleSubmit} = useForm<IObjectForm>({mode:'onBlur'})
    const [createObject] = useCreateObjectMutation()

    const submit: SubmitHandler<IObjectForm> = async (data) => {
        createObject(data)
        setActive(false)
    }
    
    return (
        <div className={active? 'visible fixed' : 'hidden'}>
            <div className="h-[100vh] w-[100vw] fixed bg-[#000000] bg-opacity-40 top-0 left-0 flex items-center justify-center z-10" onClick={() => setActive(false)}>
               <form action="" onClick={(e) => e.stopPropagation()} className="w-[858px] bg-[#D0DADF]" onSubmit={handleSubmit(submit)}>
                    <div className="p-[15px]">
                        <div className="flex flex-col px-[38px] gap-[10px] pt-[41px] bg-[#FFFFFF] rounded-md text-black">
                            <h1 className="text-[32px]">Создание объекта</h1>
                            <input {...register('name', {required:true})} type="text" placeholder="Наименование объекта*" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <input {...register('address')} type="text" placeholder="Адрес" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <input {...register('area')} type="number" placeholder="Общая площадь объекта" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <select {...register('region_coefficient', {required:true})} className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]">
                                <option value="CNT">Центральный округ Поправочный коэффициент 1.0</option>
                                <option value="OTH">Не центральный округ Поправочный коэффициент 0.91</option>
                            </select>
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

export default CreateObject;