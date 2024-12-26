export interface ProductDTO {
    id: string
    name: string
    description: string | null
    image: string
    price: number
    stock: number
    category: {
        id: string
        name: string
    }
}