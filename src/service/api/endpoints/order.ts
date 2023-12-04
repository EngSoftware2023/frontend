import { DataAuth } from "@/service/auth/auth";
import { API_BASE, API_BASE_ROOT } from "../api";

export type BodyPostOrder = {
  name: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
};

export async function postOrder(auth: DataAuth, body: BodyPostOrder) {
  const res = await fetch(`${API_BASE}/order/`, {
    method: "POST",
    headers: {
      "User-Agent": "frontend",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.access}`,
    },
    body: JSON.stringify(body),
  });

  console.log(JSON.stringify(body));

  if (!res.ok) throw "Error post order";

  return res.statusText;
}

export type DataGetOrders = Array<{
  id: number;
  name: string;
  date: string;
  total: number;
  status: string;
  products: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
}>;

export async function getOrders(auth: DataAuth) {
  const res = await fetch(`${API_BASE_ROOT}/order/`, {
    method: "GET",
    headers: {
      "User-Agent": "frontend",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.access}`,
    },
  });

  if (!res.ok) throw "Error get order";

  return (await res.json()) as DataGetOrders;
}

export async function updateOrders(body: BodyPostOrder) {
  const {name,products} = body;
  const formData = new FormData();

  formData.append("name", name);
  formData.append('products', JSON.stringify(products));
  console.log('Data', body)
  const response = await fetch(`${API_BASE_ROOT}/order/`, {
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