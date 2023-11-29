"use client";
import StructContainer from "@/components/structs/container/container";
import style from "./add-order.module.scss";
import ElementFormOrder, {
  FormOrderFilds,
  useFormOrder,
} from "@/components/elements/form-order/form-order";
import Auth from "@/service/auth/auth";
import { useRouter } from "next/navigation";
import Api from "@/service/api/api";

export type DataSectionAddOrder = {
  productsList: Array<string>;
};

export default function SectionAddOrder({ productsList }: DataSectionAddOrder) {
  const router = useRouter();
  const [form, setForm] = useFormOrder();

  const onSubmit = async (form: FormOrderFilds) => {
    console.log("Olha o formulario", form);

    const auth = Auth.getAuthWithRedirect(router);

    const res = await Api.private.postOrder(auth, {
      name: form.name.value,
      products: form.products.map(({ name, price, quantity }) => {
        return {
          name: name.value,
          price: price.value,
          quantity: quantity.value,
        };
      }),
    });

    console.log(res);
  };

  return (
    <section id={style.SectionAddOrder}>
      <StructContainer>
        <h2>Adicionar Pedido</h2>
        <hr />
        <ElementFormOrder
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          productsList={productsList}
        />
      </StructContainer>
    </section>
  );
}
