import { ISectionDetail } from "../../models/ISections";
import TableHeader from "./TableHeader";
import TableSectionRow from "./TableSection";

interface CalculationTableProps {
    sections: ISectionDetail[]
}

function CalculationTable(section: CalculationTableProps) {
    return ( 
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