"use client";
import SectionAddProduct from "@/components/sections/add-product/add-product";
import SectionListProducts from "@/components/sections/list-products/list-products";
import Api from "@/service/api/api";
import { IProduct } from "@/types/types";
import { useState } from "react";

export type DataStructProductManager = {
  initProducts: Array<IProduct>;
};

export default function StructProductManager({
  initProducts,
}: DataStructProductManager) {
  const [products, setProducts] = useState<Array<IProduct>>(initProducts);

  const updateProducts = () => {
    Api.public
      .getProducts()
      .then((response) => setProducts(response))
      .catch((e) => console.error(e));
  };

  return (
    <>
      <SectionAddProduct onEvent={updateProducts} />
      <SectionListProducts onEvent={updateProducts} products={products} />
    </>
  );
}
