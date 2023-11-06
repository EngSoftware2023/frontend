"use client";
import StructContainer from "@/components/structs/container/container";
import style from "./register-producer.module.scss";
import ElementFormRegisterProducer from "@/components/elements/form-register-producer/form-register-producer";

export default function SectionRegisterProducer() {
  return (
    <section id={style.SectionRegisterProducer}>
      <StructContainer className={style.containerForms}>
        <h2>Cadastro como Produtor</h2>
        <hr className={style.divisor} />
        <ElementFormRegisterProducer/>
      </StructContainer>
    </section>
  );
}
