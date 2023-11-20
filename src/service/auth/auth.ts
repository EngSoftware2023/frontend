import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

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

const Auth = {
  setAuth,
  getAuth,
  removeAuth,
  getCorrectRedirect
};

export default Auth;
