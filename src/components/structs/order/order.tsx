"use client";
import SectionAddOrder from "@/components/sections/add-order/add-order";
import SectionListOrder from "@/components/sections/list-orders/list-orders";
import Api from "@/service/api/api";
import { DataGetOrders } from "@/service/api/endpoints/order";
import Auth from "@/service/auth/auth";
import { IProduct } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type DataStructOrder = {
  products: Array<string>;
  productsMatch: IProduct[];
  initialOrders: DataGetOrders;
};

export default function StructOrder({
  products,
  initialOrders,
  productsMatch
}: DataStructOrder) {
  const router = useRouter();
  const [orders, setOrders] = useState<DataGetOrders>(initialOrders);
  return (
    <>
      <SectionAddOrder
        productsList={products}
        onUpdateOrder={async () => {
          const auth = Auth.getAuthWithRedirect(router);
          setOrders(await Api.private.getOrders(auth));
        }}
      />
      <SectionListOrder orders={orders} products={products} productsMatch={productsMatch} />
    </>
  );
}
