import StructProductManager from "@/components/structs/product-manager/product-manager";
import Api from "@/service/api/api";

export default async function PageProducts() {
  const products = await Api.public.getProducts();

  return (
    <main>
      <StructProductManager initProducts={products} />
    </main>
  );
}
