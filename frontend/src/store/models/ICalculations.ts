import { IObject } from "./IObject"
import { ISectionDetail } from "./ISections"

export interface ICalculatingCreate {
    costumer?: string
    annotation?: string
    object: number
}

export interface ICalculating extends ICalculatingCreate {
    id?:number
    date: Date
    user: number
}

export interface ICalculatingDetail extends Omit<ICalculating, 'object'> {
    object: IObject
    sections: ISectionDetail[]
}