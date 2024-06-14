import { IConsumer } from "./IConsumers"
import { IInputPowerDetail } from "./IInputs"

export interface ISectionCreate {
    name: string
    power_limit?: number
    calculating: number
}

export interface ISection extends ISectionCreate {
    id?: number
}

export interface ISectionDetail extends ISection {
    inputs: IInputPowerDetail[]
    consumers: IConsumer[]
}