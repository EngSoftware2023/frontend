import { API_BASE } from "../api";

export async function getProduction() {
  // const formData = new FormData();
  // formData.append("name", name);
  // formData.append("phone", phone);
  // formData.append("address", address);
  // formData.append("cpf", cpf);
  // formData.append("email", email);
  // formData.append("password", password);
  // console.log(formData);
  // const response = await fetch(`${API_BASE}/producer/`, {
  //   method: "POST",
  //   mode: "no-cors",
  //   headers: {
  //     "User-Agent": "frontend",
  //   },
  //   body: formData,
  //   cache: "no-cache",
  // });
  // return response.json;
}

export type BodyPostProdcution = {
  producer: string;
  product: string;
  quantity: number;
};

export async function postProduction(body: BodyPostProdcution) {
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
    },
    body: formData,
    cache: "no-cache",
  });

  return response.json;
}
