import { ISectionDetail } from "../../store/models/ISections";
import TableHeader from "./TableHeader";

interface CalculationTableProps {
    sections: ISectionDetail[]
}

function CalculationTable(section: CalculationTableProps) {
    return ( 
        <div className="mx-auto w-[100%] table border-spacing-y-[3px]">
            <TableHeader/>
            <div className="table-row text-center rounded-md align-middle h-[40px]">
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-l-md"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className="border-r-black border-r px-[5px] table-cell align-middle bg-[#EBEBEB]"></div>
                <div className=" px-[5px] table-cell align-middle bg-[#EBEBEB] rounded-r-md"></div>
            </div> 
        </div>
    );
}

export default CalculationTable;