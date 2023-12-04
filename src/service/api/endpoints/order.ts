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
export type TypeOrder = {
  id: number,
  name: string;
  products: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
};
export type TypeOrderUpdate = {
  id: number,
  name: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
};

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

export async function updateOrders(body: {
  id: number
  name: string, products: {
    name: string;
    quantity: number;
    price: number;
  }[]
}, auth: DataAuth) {
  const { name, products, id } = body;
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("name", name);
  formData.append('products', JSON.stringify(products));
  console.log('Data', formData)
  const response = await fetch(`${API_BASE}/order/`, {
    method: "PUT",
    headers: {
      "User-Agent": "frontend",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.access}`,
    },
    body: JSON.stringify({
      id: id,
      name: name,
      products: products
    }),
    cache: "no-cache",
    mode: 'cors'
  });

  return response.json;
}

export async function deleteOrder(body: {
  id: number
}, auth: DataAuth) {
  const { id } = body;
  const formData = new FormData();
  formData.append("id", id.toString());
  const response = await fetch(`${API_BASE}/order/`, {
    method: "DELETE",
    headers: {
      "User-Agent": "frontend",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.access}`,
    },
    body: JSON.stringify({
      id: id,
    }),
    cache: "no-cache",
    mode: 'cors'
  });

  return response.json;
}