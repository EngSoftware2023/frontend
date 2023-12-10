import SectionListProducts from "@/components/sections/list-products/list-products";
import Api from "@/service/api/api";

export default async function PageProducts() {
  const products = await Api.public.getProducts();

  return (
    <main>
      <SectionListProducts products={products} />
    </main>
  );
}
