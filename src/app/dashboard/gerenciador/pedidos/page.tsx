import SectionAddOrder from "@/components/sections/add-order/add-order";
import Api from "@/service/api/api";

export default async function PageOrders() {
  const products = await Api.public.getProducts();

  return (
    <main>
      <SectionAddOrder productsList={products.map(({ name }) => name)} />
    </main>
  );
}
