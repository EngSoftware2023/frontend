import { API_BASE, API_BASE_PUT, API_BASE_ROOT } from "../api";
import { DataAuth } from "@/service/auth/auth";

export enum ResponsePostProducer {
  OK = 200,
  ERROR = 400,
}

export type ResponseGetProduction = {
  id: number;
  quantity: number;
  date: string;
  producer: string;
  product: string;
};

export async function getProductions(
  auth: DataAuth
): Promise<Array<ResponseGetProduction>> {
  const response = await fetch(`${API_BASE_ROOT}/production/`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "User-Agent": "frontend",
      Authorization: `Bearer ${auth.access}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) throw "Error get Production";

  return (await response.json()) as Array<ResponseGetProduction>;
}

export async function deteleProduction(id: number) {
  const response = await fetch(`${API_BASE_PUT}/production/${id}`, {
    method: "DELETE",
    cache: "no-cache",
    mode: "no-cors",
    headers: {
      "User-Agent": "frontend",
    },
    redirect: "follow",
  });
}
export type BodyPostProdcution = {
  producer: string;
  product: string;
  quantity: number;
};

export async function postProduction(auth: DataAuth, body: BodyPostProdcution) {
  const { producer, product, quantity } = body;

  const formData = new FormData();

  formData.append("producer", producer);
  formData.append("product", product);
  formData.append("quantity", String(quantity));

  console.log(formData);

  const response = await fetch(`${API_BASE}/production/`, {
    method: "POST",
    headers: {
      "User-Agent": "frontend",
      Authorization: `Bearer ${auth.access}`,
    },
    body: formData,
    cache: "no-cache",
  });

  if (!response.ok) throw "Error post Production";

  return await response.json();
}
