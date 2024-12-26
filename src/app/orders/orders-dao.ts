interface ProductList {
  productId: string;
  count: number;
}

export interface OrderDAO {
  estimated: string;
  addressId: string;
  paymentMethodId: string;
  products: ProductList[];
}

export interface OrderRepositoryProps {
    customerId: string
    sendDate: Date
    estimated: string
    addressId: string
    paymentMethodId: string
    totalPrice: number
    courierId: string
    products: ProductList[]
}