import ListOrder from "@/components/sections/list-order/list-order";
import Api from "@/service/api/api";
import { ResponseGetOrders } from "@/service/api/endpoints/order";

export default async function PageProducerList() {
  let orders: Array<ResponseGetOrders> = [];

  try {
    orders = await Api.public.getOrders();
  } catch (e) {
    console.error(e);
  }

  return (
    <main>
      <ListOrder orders={orders} />
    </main>
  );
}
