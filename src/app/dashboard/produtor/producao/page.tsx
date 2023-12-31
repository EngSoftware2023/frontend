import { headers } from "next/headers";
import SectionAddProduction from "@/components/sections/add-production/add-production";
import SectionListProduction from "@/components/sections/list-production/list-production";
import Auth from "@/service/auth/auth";
import Api from "@/service/api/api";

export default async function PageProduction() {
  const access_token =
    Auth.getCokieFromHeaderList("auth_access", headers()) ?? "";

  const products = await Api.public.getProducts();
  const productions = await Api.public.getProductions({
    access: access_token,
    refresh: "",
  });

  return (
    <main>
      <SectionAddProduction products={products} />
      <SectionListProduction productions={productions} />
    </main>
  );
}
