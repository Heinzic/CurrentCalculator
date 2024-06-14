import { IInputPowerDetail } from "../../models/IInputs";
import TableConsumers from "./TableConsumers";

interface TableConsumersProps extends IInputPowerDetail {
    // index:number
}

function TableInputs(input : TableConsumersProps) {
    return (
        <>
            {input.consumers.map((consumer, index) => (
                    <TableConsumers
                    {...consumer}
                    index={index}
                    />
            ))}
        </>
    );
}

export default TableInputs;