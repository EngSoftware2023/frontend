import style from "./add-product.module.scss";
import ElementFormProduct, {
  DataFormProduct,
} from "@/components/elements/form-product/form-product";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";

export type DataSectionAddProduct = {
  onEvent: () => void;
};

export default function SectionAddProduct({ onEvent }: DataSectionAddProduct) {
  const onSubmit = async (data: DataFormProduct) => {
    await Api.public.postProduct({
      name: data.name.value,
    });

    onEvent();
  };

  return (
    <section id={style.SectionAddProduct}>
      <StructContainer>
        <h2>Criar novo produto</h2>
        <hr className={style.divider} />
        <ElementFormProduct
          initialData={{ name: { invalid: false, valid: false, value: "" } }}
          onSubmit={onSubmit}
        />
      </StructContainer>
    </section>
  );
}
