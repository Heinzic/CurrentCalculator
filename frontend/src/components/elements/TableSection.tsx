import { ISectionDetail } from "../../store/models/ISections";
import TableConsumers from "./TableConsumers";

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