import { API_BASE } from "../api";

export enum ResponsePostProducer {
  OK = 200,
  ERROR = 400,
}

export type BodyPostProducer = {
  cpf: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
};

export async function postProducer(body: BodyPostProducer) {
  const { address, cpf, email, name, password, phone } = body;

  const formData = new FormData();

  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("cpf", cpf);
  formData.append("email", email);
  formData.append("password", password);

  const response = await fetch(`${API_BASE}/producer/`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "User-Agent": "frontend",
    },
    body: formData,
    cache: "no-cache",
  });

  return response.json;
}
