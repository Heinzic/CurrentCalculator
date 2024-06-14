import { useForm } from "react-hook-form";
import { useCreateSectionMutation } from "../../store/apis/SectionAPI";

interface CreateObjectProps {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    id: number
}

interface ISectionForm {
    name:'',
    power_limit?: number,
    calculating: number
}

function AddSectionModal({active, setActive, id}: CreateObjectProps) {
    
    const {register, watch, formState} = useForm<ISectionForm>({mode:'onBlur'})
    const watchAll = watch()
    const [createSection] = useCreateSectionMutation()

    const handleAdd = async () => {
        await createSection({name:watchAll.name, power_limit:watchAll.power_limit, calculating:id})
    }
    
    return (
        <div className={active? 'visible fixed z-10' : 'hidden'}>
            <div className="h-[100vh] w-[100vw] fixed bg-[#000000] bg-opacity-40 top-0 left-0 flex items-center justify-center z-10" onClick={() => setActive(false)}>
               <form action="" onClick={(e) => e.stopPropagation()} className="w-[858px] bg-[#D0DADF]" >
                    <div className="p-[15px]">
                        <div className="flex flex-col px-[38px] gap-[10px] pt-[41px] bg-[#FFFFFF] rounded-md text-black">
                            <h1 className="text-[32px]">Создание ВРУ</h1>
                            <input {...register('name', {required: true})} type="text" placeholder="Имя ВРУ*" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <input {...register('power_limit', {required: true})} type="number" placeholder="Ограничение мощности" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <div className="flex justify-end gap-[22px] pb-[40px] mt-[41px] items-center text-black">
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setActive(false)
                                }} className="bg-[#D0D4D9] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
                                    Отмена                                
                                </button>
                                <button type="submit" onClick={handleAdd} disabled={!formState.isDirty || !formState.isValid} className="bg-[#9AA8B0] disabled:bg-[#bce4f0] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
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