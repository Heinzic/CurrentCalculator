export interface ISectionCreate {
    name: string
    power_limit?: number
    calculating: number
}

export interface ISection extends ISectionCreate {
    id: number
}