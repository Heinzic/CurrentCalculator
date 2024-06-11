import { ISectionDetail } from "../../store/models/ISections";
import TableHeader from "./TableHeader";
import TableSectionRow from "./TableSection";

interface CalculationTableProps {
    sections: ISectionDetail[]
}

function CalculationTable(section: CalculationTableProps) {
    return ( 
        // <>
        //     <div className="grid mx-auto grow gap-[3px]">
        //         <div className="flex text-center">
        //             <div className="border-r-black border-r px-[5px] flex items-center bg-[#9AA8B0] rounded-l-md grow justify-around flex-col">
        //                    №                     
        //             </div>
        //             <div className="border-r-black border-r px-[5px] align-middle bg-[#9AA8B0] flex items-center grow justify-around">Пользовательское наименование</div>
        //             <div className="border-r-black border-r px-[5px] align-middle bg-[#9AA8B0] flex items-center grow justify-around">Тип потребителя</div>
        //             <div className="border-r-black border-r px-[5px] align-middle bg-[#9AA8B0] flex items-center grow justify-around">Количество единиц измерения</div>
        //             <div className="border-r-black border-r px-[5px] align-middle bg-[#9AA8B0] flex items-center grow justify-around">Расчетная нагрузка</div>
        //             <div className=" px-[5px] align-middle bg-[#9AA8B0] rounded-r-md ">
        //                 <div className="">
        //                     Коэффициенты
        //                 </div>
        //                 Уст. м. на ед; Уст. м; Кп.к; Кс; Кн.м; Cosj; Tgj
        //             </div>
        //         </div>
        //         <div className="bg-[#9AA8B0]">
        //             aaa
        //         </div>
        //         <div className="grid grid-cols-6 text-center">
        //             <div className="border-r-black border-r px-[5px] flex items-center bg-[#9AA8B0] rounded-l-md grow justify-around flex-col">
        //                    1                     
        //             </div>
        //             <div className="border-r-black border-r px-[5px] align-middle bg-[#9AA8B0] flex items-center grow justify-around">1</div>
        //             <div className="border-r-black border-r px-[5px] align-middle bg-[#9AA8B0] flex items-center grow justify-around">1</div>
        //             <div className="border-r-black border-r px-[5px] align-middle bg-[#9AA8B0] flex items-center grow justify-around">1</div>
        //             <div className="border-r-black border-r px-[5px] align-middle bg-[#9AA8B0] flex items-center grow justify-around">1</div>
        //             <div className=" px-[5px] align-middle bg-[#9AA8B0] rounded-r-md ">
        //                 <div className="">
        //                     Коэффициенты
        //                 </div>
        //                 Уст. м. на ед; Уст. м; Кп.к; Кс; Кн.м; Cosj; Tgj
        //             </div>
        //         </div>
        //     </div>
        // </>
        <div className="mx-auto w-[100%] table border-spacing-y-[3px]">
            <TableHeader/>
            {section.sections.map(e => (
                <TableSectionRow
                section={e}
                />
            ))}
            
        </div>
    );
}

export default CalculationTable;