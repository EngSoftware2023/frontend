export interface IUsers {
    cpf: string,
    name: string,
    address: string,
    phone: string,
    email: string,
    password: string
}
export interface Product {
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  name: string | null;
  date: string;
  total: number;
  status: string;
  products: Product[];
}

export  interface IProduction{
  producer: string,
  product: string,
  quantity: string,
  date: string,
  id: string,
}