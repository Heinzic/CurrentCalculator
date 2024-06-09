import { IConsumer } from './IConsumers';
export interface IInputPower {
    id?: number
    section: number
    cos?: string
    tg?: string
    pp?: string
    qp?: string
    sp?: string
    result_current?: string
}

export interface IInputPowerDetail extends IInputPower {
    consumers: IConsumer[]
}