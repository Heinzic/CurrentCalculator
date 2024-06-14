import { useForm } from "react-hook-form";
import { useCreateConsumerMutation, useGetConsumerTypesQuery } from "../../store/apis/ConsumersAPI";
import { ISectionDetail } from "../../models/ISections";

interface CreateObjectProps {
    active: boolean
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    sections: ISectionDetail[]
}

interface IConsumerForm {
    name:'',
    type:number,
    volume?: string,
    power_per_unit?: string,
    coefficient_demand?: string,
    section:number
}

function AddConsumerModal({active, setActive, sections}: CreateObjectProps) {
    
    const {register, watch, reset, formState} = useForm<IConsumerForm>({mode:'onBlur', })
    const watchAll = watch()
    const types = useGetConsumerTypesQuery()
    const [createConsumer] = useCreateConsumerMutation()

    async function handleSubmit() {
        await createConsumer({
            name: watchAll.name,
            type: watchAll.type? watchAll.type: 1,
            section: watchAll.section,
            coefficient_demand:watchAll.coefficient_demand? watchAll.coefficient_demand: undefined,
            power_per_unit:watchAll.power_per_unit? watchAll.power_per_unit: undefined,
            volume:watchAll.volume? watchAll.volume: '1'
        })
        reset()
        setActive(!active)
    }
    
    
    return (
        <div className={active? 'visible fixed z-10' : 'hidden'}>
            <div className="h-[100vh] w-[100vw] fixed bg-[#000000] bg-opacity-40 top-0 left-0 flex items-center justify-center z-10" onClick={() => setActive(false)}>
               <form action="" onClick={(e) => e.stopPropagation()} className="w-[858px] bg-[#D0DADF]">
                    <div className="p-[15px]">
                        <div className="flex flex-col px-[38px] gap-[10px] pt-[41px] bg-[#FFFFFF] rounded-md text-black">
                            <h1 className="text-[32px]">Создание потребителя</h1>
                            <input {...register('name', {required: true})} type="text" placeholder="Имя потребителя*" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <select {...register('type')} className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl">
                                {types.data?.map(e => (
                                    <option value={e.id}>{e.name}</option>
                                ))}
                            </select>
                            <select {...register('section')} className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl">
                                {sections.map(e => (
                                    <option value={e.id}>{e.name}</option>
                                ))}
                            </select>
                            <input {...register('volume')} type="number" placeholder="Количество" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <input {...register('power_per_unit')} type="number" placeholder="Мощность на единицу" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <input {...register('coefficient_demand')} type="number" placeholder="Коэф. спроса" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <div className="flex justify-end gap-[22px] pb-[40px] mt-[41px] items-center text-black">
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setActive(false)
                                }} className="bg-[#D0D4D9] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
                                    Отмена                                
                                </button>
                                <button type="button" disabled={!formState.isDirty || !formState.isValid} onClick={handleSubmit} className="bg-[#9AA8B0] disabled:bg-[#bce4f0] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
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

export default AddConsumerModal;