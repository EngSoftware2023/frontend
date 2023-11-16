"use client";
import style from "./add-production.module.scss";
import ElementFormProduction, {
  DataFormProduction,
} from "@/components/elements/form-production/form-production";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";
import { useState } from "react";

export default function SectionAddProduction() {
  const [form, setForm] = useState<DataFormProduction>({
    product: { value: "", invalid: false, valid: false },
    quantity: { value: null, invalid: false, valid: false },
  });

  const onSubmitForm = async (form: DataFormProduction): Promise<boolean> => {
    const response = await Api.public.postProduction({
      producer: "0123",
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
          products={["Teste1", "Teste2", "Teste3", "Teste4"]}
        />
      </StructContainer>
    </section>
  );
}
