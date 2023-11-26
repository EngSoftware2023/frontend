import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

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

function removeAuthWithRedirect(routerInstance: AppRouterInstance) {
  Cookie.remove("auth_access");
  Cookie.remove("auth_refresh");
  routerInstance.replace("/auth/login");
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

function getAuthWithRedirect(routerInstance: AppRouterInstance): DataAuth {
  const auth_access = Cookie.get("auth_access");
  const auth_refresh = Cookie.get("auth_refresh");

  if (!auth_access || !auth_refresh) {
    routerInstance.replace("/auth/login");
    return { access: "", refresh: "" };
  }

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

function getDataFromToken(token: string): Payload {
  return jwtDecode<Payload>(token);
}

function getCokieFromHeaderList(
  targetCookie: string,
  headerList: ReadonlyHeaders
) {
  return headerList
    .get("cookie")
    ?.split(";")
    .filter((cookie) => cookie.trim().split("=").at(0) === targetCookie)
    .at(0)
    ?.split("=")
    .at(1);
}

const Auth = {
  setAuth,
  getAuth,
  getAuthWithRedirect,
  removeAuth,
  removeAuthWithRedirect,
  getCorrectRedirect,
  isTokenExpired,
  getDataFromToken,
  getCokieFromHeaderList,
};

export default Auth;
