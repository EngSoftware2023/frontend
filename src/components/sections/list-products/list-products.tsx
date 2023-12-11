import ElementCardProduct from "@/components/elements/card-product/card-product";
import style from "./list-products.module.scss";
import StructContainer from "@/components/structs/container/container";
import { IProduct } from "@/types/types";
import { Col, Row } from "antd";
import Api from "@/service/api/api";

export type DataSectionListProducts = {
  products: Array<IProduct>;
  onEvent: () => void;
};

export default function SectionListProducts({
  products,
  onEvent,
}: DataSectionListProducts) {
  return (
    <section id={style.SectionListProducts}>
      <StructContainer>
        <h2>Listagem de produtos</h2>
        <hr className={style.divider} />
        <Row gutter={[30, 30]}>
          {products.map(({ name, request, stock }, index) => (
            <Col key={index} lg={8}>
              <ElementCardProduct
                name={name}
                request={request}
                stock={stock}
                onDelete={async () => {
                  await Api.public.deleteProduct({ nome: name });

                  onEvent();
                }}
              />
            </Col>
          ))}
        </Row>
      </StructContainer>
    </section>
  );
}
