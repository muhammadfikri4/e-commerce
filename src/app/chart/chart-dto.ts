export interface ChartDTO {
    id: string
    product: {
        id: string
        name: string
        price: number
        category: {
            id: string
            name: string
        }
    }
total: {
    count: number
    price: number
}
}