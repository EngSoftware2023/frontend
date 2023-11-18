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

export type ResponseGetProducers = {
  cpf: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  productions: Array<string>;
};

export async function getProducers() {
  const response = await fetch(`${API_BASE}/producer/`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return (await response.json()) as Array<ResponseGetProducers>;
}

export type ResponseGetProduction= {
    quantity: string,
    status: string,
    producer: string,
    product: string
};

export async function getProduction() {
  const response = await fetch(`${API_BASE}/production/`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return (await response.json()) as Array<ResponseGetProduction>;
}

