import { ISectionDetail } from "../../store/models/ISections";

interface TableSectionRowProps {
    section: ISectionDetail
}

function TableSection({section}: TableSectionRowProps) {
    return (
        <>
            <div className="table-row text-center h-[45px]">
                <td colSpan={6} className="table-cell bg-[#D0DADF] align-middle rounded-md">
                    <div className="flex justify-around">
                        <span className="">
                        ВРУ: {section.name}
                        </span>
                        <span className="">
                            Ограничение мощности по вводу: {section.power_limit} кВТ
                        </span>
                    </div>
                </td>
                <div className="table-cell bg-[#D0DADF] align-middle"></div>
            </div>
            <div className="table-row text-center rounded-md align-middle h-[40px]">
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-l-md"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className=" px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-r-md"></div>
            </div> 
        </>
        
    )
}

export default TableSection;