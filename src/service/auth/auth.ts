import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

export type Payload = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  type: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type DataAuth = {
  access: string;
  refresh: string;
};

function setAuth({ access, refresh }: DataAuth) {
  Cookie.set("auth_access", access);
  Cookie.set("auth_refresh", refresh);
}

function removeAuth() {
  Cookie.remove("auth_access");
  Cookie.remove("auth_refresh");
}

function getAuth(): DataAuth | null {
  const auth_access = Cookie.get("auth_access");
  const auth_refresh = Cookie.get("auth_refresh");

  if (!auth_access || !auth_refresh) return null;

  return {
    access: auth_access,
    refresh: auth_refresh,
  };
}

function getCorrectRedirect(token: string): string {
  const userType = jwtDecode<{ type: string }>(token).type;
  return userType === "producer"
    ? "produtor"
    : userType === "admin"
    ? "gerenciador"
    : "";
}

function isTokenExpired(token: string): boolean {
  const { exp } = jwtDecode(token);

  return !!exp && exp < Math.floor(Date.now() / 1000);
}

function getDataFromExpired(token: string): Payload {
  return jwtDecode<Payload>(token);
}

const Auth = {
  setAuth,
  getAuth,
  removeAuth,
  getCorrectRedirect,
  isTokenExpired,
  getDataFromExpired,
};

export default Auth;
