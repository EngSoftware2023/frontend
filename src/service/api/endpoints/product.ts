import { IProduct } from "@/types/types";
import { API_BASE_PUT } from "../api";

export enum ResponsePostProducer {
  OK = 200,
  ERROR = 400,
}

export type ResponseGetProduct = {
  stock: string;
  name: string;
  request: string;
};

export async function getProducts() {
  const response = await fetch(`${API_BASE_PUT}/product/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!response.ok) throw "Error on get Products";

  return (await response.json()) as Array<IProduct>;
}

export type BodyPostProduct = {
  name: string;
};

export async function postProduct(body: BodyPostProduct) {
  const response = await fetch(`${API_BASE_PUT}/product/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  if (!response.ok) throw "Error on post product";

  return await response.json();
}
