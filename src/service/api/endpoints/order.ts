import { API_BASE, API_BASE_PUT } from "../api";

export enum ResponsePostOrder {
  OK = 200,
  ERROR = 400,
}

export type BodyPostOrder = {
  id: string;
  name: string;
  date: string;
  total: string;
  status: string;
  products: {quantity:string,product_name:string,price:string}[];
};


export type ResponseGetOrders = {
    id: string;
    name: string;
    date: string;
    total: string;
    status: string;
    products: {quantity:string,product_name:string,price:string}[];
  };

export async function getOrders() {
  const response = await fetch(`${API_BASE_PUT}/order/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return (await response.json()) as Array<ResponseGetOrders>;
}

export async function updateOrders(body: BodyPostOrder) {
  const { id,name,date,total,status,products} = body;
  const formData = new FormData();

  formData.append("name", name);
  formData.append("id", id);
  formData.append("date", date);
  formData.append("total", total);
  formData.append("status", status);
  formData.append('products', JSON.stringify(products));
  console.log('Data', body)
  const response = await fetch(`${API_BASE_PUT}/order/`, {
    method: "PUT",
    headers: {
      "User-Agent": "frontend",
    },
    body: formData,
    cache: "no-cache",
    mode:'cors'
  });

  return response.json;
}