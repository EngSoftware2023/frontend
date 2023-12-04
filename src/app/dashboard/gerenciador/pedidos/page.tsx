import StructOrder from "@/components/structs/order/order";
import Api from "@/service/api/api";
import Auth from "@/service/auth/auth";
import { headers } from "next/headers";

export default async function PageOrders() {
  const access_token =
    Auth.getCokieFromHeaderList("auth_access", headers()) ?? "";

  const products = await Api.public.getProducts();

  const initialOrder = await Api.private.getOrders({
    access: access_token,
    refresh: "",
  });

  return (
    <main>
      <StructOrder
        products={products.map(({ name }) => name)}
        initialOrders={initialOrder}
      />
    </main>
  );
}
