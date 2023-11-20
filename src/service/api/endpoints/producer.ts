import { IUsers } from "@/types/types";
import { API_BASE, API_BASE_PUT } from "../api";

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
    headers: {
      "User-Agent": "frontend",
    },
    body: formData,
    cache: "no-cache",
  });

  return await response;
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
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return (await response.json()) as Array<ResponseGetProducers>;
}

export async function updateProducers(body: BodyPostProducer) {
  const { address, cpf, email, name, password, phone } = body;
  const formData = new FormData();

  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("cpf", cpf);
  formData.append("email", email);
  formData.append("password", password);
  console.log("Data", body);
  const response = await fetch(`${API_BASE_PUT}/producer/`, {
    method: "PUT",
    headers: {
      "User-Agent": "frontend",
    },
    body: formData,
    cache: "no-cache",
  });

  return response.json;
}

export async function getProducer(id: string): Promise<ResponseGetProducers> {
  try {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `${API_BASE_PUT}/producer/${id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result: ResponseGetProducers = await response.json();
    return result;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}
