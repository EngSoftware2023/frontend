import style from "./list-production.module.scss";
import StructContainer from "@/components/structs/container/container";
import { Button } from "antd";
import Link from "next/link";

export default function SectionListProduction() {
  return (
    <section id={style.SectionListProduction}>
      <StructContainer>
        <h2>Listagem da Produção</h2>
        <hr />
      </StructContainer>
    </section>
  );
}
