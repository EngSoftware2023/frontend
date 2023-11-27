"use client";

import style from "./add-production.module.scss";
import ElementFormProduction, {
  DataFormProduction,
} from "@/components/elements/form-production/form-production";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";
import { ResponseGetProducts } from "@/service/api/endpoints/products";
import Auth from "@/service/auth/auth";
import { IProduct } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type DataSectionAddProduction = {
  products: IProduct[];
};

export default function SectionAddProduction({
  products,
}: DataSectionAddProduction) {
  const router = useRouter();
  const [form, setForm] = useState<DataFormProduction>({
    product: { value: "", invalid: false, valid: false },
    quantity: { value: null, invalid: false, valid: false },
  });

  const onSubmitForm = async (form: DataFormProduction): Promise<boolean> => {
    console.log(form);

    const auth = Auth.getAuthWithRedirect(router);
    const payload = Auth.getDataFromToken(auth.access);

    console.log(await Api.public.getProductions(auth));

    const response = await Api.public.postProduction(auth, {
      producer: payload.cpf,
      product: form.product.value,
      quantity: form.quantity.value as number,
    });

    console.log(response);

    return false;
  };

  return (
    <section id={style.SectionAddProduction}>
      <StructContainer>
        <h2>Adicionar Produção</h2>
        <hr />
        <ElementFormProduction
          form={form}
          setForm={setForm}
          onSubmitForm={onSubmitForm}
          products={products.map(({ name }) => name)}
        />
      </StructContainer>
    </section>
  );
}
