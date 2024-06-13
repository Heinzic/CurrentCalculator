import { useDeleteConsumerMutation } from "../../store/apis/ConsumersAPI";
import { IConsumer } from "../../store/models/IConsumers";

interface TableConsumersProps extends IConsumer {
    index:number
}

function TableConsumers(consumer : TableConsumersProps) {

    const [deleteConsumer] = useDeleteConsumerMutation()

    async function handleDelete(id: number) {
        await deleteConsumer(id)
    }

    return (
        <>
            <div className="table-row text-center rounded-md align-middle h-[40px] group">
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-l-md">{consumer.index + 1}</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]">{consumer.name}</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]">{consumer.type_name}</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]">{Number(consumer.volume)}</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]">{consumer.result_current} кВТ</div>
                <div className=" px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-r-md">
                    <div className="flex justify-between">
                        <div className="flex justify-center grow gap-[5px]">
                            <b>{Number(consumer.power_per_unit)};</b>
                            <span className="text-[#6E6E6E]"> --кВТ;</span>
                            <b> {Number(consumer.coefficient_regional)};</b>
                            <span className="text-[#6E6E6E]"> {Number(consumer.coefficient_demand)};</span>
                            <b> {Number(consumer.coefficient_maximum_mismatch)};</b>
                            <span className="text-[#6E6E6E]"> {Number(consumer.cos)};</span>
                            <b> {consumer.tg};</b>
                        </div>
                        <button className="invisible group-hover:visible" onClick={() => handleDelete(consumer.id? consumer.id: 0)}>
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.589043 18.8721C-0.196348 19.6487 -0.196348 20.908 0.589043 21.6847C1.37443 22.4614 2.6478 22.4614 3.43319 21.6847L11.2587 13.9459L19.1769 21.7764C19.9623 22.5531 21.2356 22.5531 22.021 21.7764C22.8064 20.9997 22.8064 19.7404 22.021 18.9638L14.1028 11.1333L21.9278 3.39513C22.7132 2.61845 22.7132 1.35919 21.9278 0.582512C21.1424 -0.194171 19.869 -0.19417 19.0836 0.582512L11.2587 8.32071L3.52645 0.674214C2.74106 -0.102469 1.46769 -0.102469 0.682304 0.674214C-0.103086 1.4509 -0.103086 2.71015 0.682304 3.48683L8.41453 11.1333L0.589043 18.8721Z" fill="#9AA8B0"/>
                            </svg>
                        </button>
                    </div>
                    
                </div>
            </div> 
        </>
    );
}

export default TableConsumers;