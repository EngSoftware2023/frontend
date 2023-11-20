import StructContainer from "@/components/structs/container/container";
import style from "./register-order.module.scss";
import ElementFormOrder, {
  FormOrderFilds,
  useFormOrder,
} from "@/components/elements/form-order/form-order";

export default function SectionRegisterOrder() {
  const [form, setForm] = useFormOrder();

  const onSubmit = (form: FormOrderFilds) => {};

  return (
    <section id={style.SectionRegisterOrder}>
      <StructContainer>
        <ElementFormOrder form={form} setForm={setForm} onSubmit={onSubmit} />
      </StructContainer>
    </section>
  );
}
