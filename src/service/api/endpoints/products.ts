import { API_BASE_ROOT } from "../api";

 type DataProduct = {
  name: string;
  stock: number;
  request: number;
};

export type ResponseGetProducts = Array<DataProduct>;

export async function getProducts(): Promise<ResponseGetProducts> {
  const response = await fetch(`${API_BASE_ROOT}/product/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return await response.json();
}
