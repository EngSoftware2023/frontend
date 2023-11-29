import ListOrder from "@/components/sections/list-order/list-order";
import Api from "@/service/api/api";
import { ResponseGetOrders } from "@/service/api/endpoints/order";
import { ResponseGetProducts } from "@/service/api/endpoints/products";

export default async function PageProducerList() {
  let orders: Array<ResponseGetOrders> = [];
  let products: ResponseGetProducts = [];


  try {
    orders = await Api.public.getOrders();
    products = await Api.public.getProducts();
  } catch (e) {
    console.error(e);
  }

  return (
    <main>
      <ListOrder orders={orders} products={products} />
    </main>
  );
}
