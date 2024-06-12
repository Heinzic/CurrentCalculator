import { IConsumer } from "../../store/models/IConsumers";

interface TableConsumersProps extends IConsumer {
    index:number
}

function TableConsumers(consumer : TableConsumersProps) {
    return (
        <>
            <div className="table-row text-center rounded-md align-middle h-[40px]">
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-l-md">{consumer.index + 1}</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]">{consumer.name}</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]">{consumer.type_name}</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]">{Number(consumer.volume)}</div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]">{consumer.result_current} кВТ</div>
                <div className=" px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-r-md">
                    <b>{Number(consumer.power_per_unit)};</b>
                    <span className="text-[#6E6E6E]"> --кВТ;</span>
                    <b> {Number(consumer.coefficient_regional)};</b>
                    <span className="text-[#6E6E6E]"> {Number(consumer.coefficient_demand)};</span>
                    <b> {Number(consumer.coefficient_maximum_mismatch)};</b>
                    <span className="text-[#6E6E6E]"> {Number(consumer.cos)};</span>
                    <b> {consumer.tg};</b>
                </div>
            </div> 
        </>
    );
}

export default TableConsumers;