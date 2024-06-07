export interface ICalculatingCreate {
    costumer?: string
    annotation?: string
    object: number
}

export interface ICalculating extends ICalculatingCreate {
    id?:number
    date: string
    user: number
}