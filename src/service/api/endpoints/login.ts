import { API_BASE } from "../api";

export type BodyPostLogin = {
  email: string;
  password: string;
};

export type ReponsePostLogin = {
  access: string;
  refresh: string;
};

export async function postLogin(body: BodyPostLogin): Promise<ReponsePostLogin> {
  const { email, password } = body;

  const formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);

  const response = await fetch(`${API_BASE}/token/`, {
    method: "POST",
    headers: {
      "User-Agent": "frontend",
    },
    body: formData,
    cache: "no-cache",
  });

  return (await response.json()) as ReponsePostLogin;
}
