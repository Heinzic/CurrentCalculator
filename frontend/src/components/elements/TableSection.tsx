import { ISectionDetail } from "../../models/ISections";
import TableConsumers from "./TableConsumers";
import TableInputs from "./TableInputs";

interface TableSectionRowProps {
    section: ISectionDetail
}

function TableSection({section}: TableSectionRowProps) {
    return (
        <>
            <div className="table-row text-center h-[45px]">
                <td colSpan={6} className="table-cell bg-[#D0DADF] align-middle rounded-md">
                    <div className="flex justify-around">
                        <span className="w-[20%]">
                        ВРУ: {section.name}
                        </span>
                        <span className="w-[30%]">
                            Ограничение мощности по вводу: {section.power_limit} кВТ
                        </span>
                    </div>
                </td>
                <div className="table-cell bg-[#D0DADF] align-middle"></div>
            </div>
            {section.inputs.length>0 && (
                <div className="table-row text-center h-[45px]">
                    <td colSpan={6} className="table-cell bg-[#D0DADF] align-middle rounded-md">
                        <div className="flex justify-around">
                            <span className="w-[20%]">
                            Входы:
                            </span>
                            <span className="w-[30%]">
                                Мощность: {section.inputs[0].result_current} кВТ
                            </span>
                        </div>
                    </td>
                    <div className="table-cell bg-[#D0DADF] align-middle"></div>
                </div>
            )}
            {section.inputs.map((input) => (
                <TableInputs
                {...input}
                />
            ))}
            {section.consumers.map((consumer, index) => (
                <TableConsumers
                {...consumer}
                index={index}
                />
            ))}
        </>
        
    )
}

export default TableSection;