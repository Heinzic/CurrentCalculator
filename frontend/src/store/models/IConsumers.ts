export interface IConsumer {
    id?: number
    section: number
    input?: number
    name: string
    type: number
    type_name?: string
    volume?: string
    power_per_unit?: string
    total_capacity?: string
    coefficient_regional?: string
    coefficient_demand?: string
    coefficient_maximum_mismatch?: string
    cos?: string
    tg?: string
    pp?: string
    qp?: string
    sp?: string
    result_current?: string
}

export interface IConsumerType {
    id?: number
    name: string
    special?: string
    unit_measurement: string
    default_power_per_unit: string
    default_cos: string
}

export interface IConsumerCreate{
    section?: number
    // input?: number
    name:string
    type: number
    volume?: string
    power_per_unit?: string
    coefficient_demand?: string
}