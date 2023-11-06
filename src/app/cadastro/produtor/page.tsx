import style from "./page.module.scss";
import SectionRegisterProducer from "@/components/sections/resgister-producer/register-producer";

export default function PageRegisterProducer() {
  return (
    <main id={style.PageRegisterProducer}>
      <SectionRegisterProducer/>
    </main>
  );
}
