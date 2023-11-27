import { API_BASE, API_BASE_PUT, API_BASE_ROOT } from "../api";
import Auth, { DataAuth } from "@/service/auth/auth";

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
  const response = await fetch(`${API_BASE}/production/`, {
    method: "GET",
    headers: {
      "User-Agent": "frontend",
      Authorization: `Bearer ${auth.access}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) throw "Error get Production";

  return (await response.json()) as Array<ResponseGetProduction>;
}

export async function deteleProduction(auth: DataAuth, body: { id: number }) {
  console.log("Acesso Body",auth.access)
  const response = await fetch(`${API_BASE_ROOT}/production`, {
    method: "DELETE",
    cache: "no-cache",
    headers: {
      "User-Agent": "frontend",
      "Authorization": `Bearer  ${auth.access}}`
    },
    body: JSON.stringify(body)
  });
  return response.json()
}
export type BodyPostProdcution = {
  producer: string;
  product: string;
  quantity: number;
};

export async function postProduction(auth: DataAuth, body: BodyPostProdcution) {
  const { producer, product, quantity } = body;

  const response = await fetch(`${API_BASE}/production/`, {
    method: "POST",
    headers: {
      "User-Agent": "frontend",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.access}`,
    },
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  return response.json;
}

export type BodyPutProdcution = {
  producer: string;
  product: string;
  quantity: number;
  id: number;
};
export async function updateProduction(body: BodyPutProdcution, auth: DataAuth,) {
  console.log(auth.access)
  const { producer, product, quantity, id } = body;
  console.log(body.id)
  const formData = new FormData();
  formData.append("id", String(id));
  formData.append("producer", producer);
  formData.append("product", product);
  formData.append("quantity", String(quantity));

  console.log(formData);

  const response = await fetch(`${API_BASE}/production/`, {
    method: "PUT",
    headers: {
      "User-Agent": "frontend",
      "Authorization": `Bearer  ${auth.access}`
    },
    body: formData,
    cache: "no-cache",
  });
  if (!response.ok) throw "Error post Production";

  return await response.json();
}
