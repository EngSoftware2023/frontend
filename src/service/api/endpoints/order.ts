import { DataAuth } from "@/service/auth/auth";
import { API_BASE } from "../api";

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
