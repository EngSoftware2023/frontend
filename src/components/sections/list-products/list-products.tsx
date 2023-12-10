import style from "./list-products.module.scss";
import StructContainer from "@/components/structs/container/container";
import { IProduct } from "@/types/types";
import { Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";

export type DataSectionListProducts = {
  products: Array<IProduct>;
};

export default function SectionListProducts({
  products,
}: DataSectionListProducts) {
  return (
    <section id={style.SectionListProducts}>
      <StructContainer>
        <Title>Listagem de produtos</Title>
        <hr className={style.divider}/>
        <Row gutter={30}>
          {products.map(({ name, request, stock }, index) => (
            <Col key={index} lg={8}>
              <div
                className={style.containerProduct}
                style={{
                  border: `solid 2px rgba(${stock < request ? 255 : 0}, ${
                    stock < request ? 0 : 255
                  }, 0, .3)`,
                }}
              >
                <h3>{name}</h3>
                <div className={style.containerIndicadores}>
                  <div className={style.indicador}>
                    <span className={style.title}>Pedidos</span>
                    <span>{request}</span>
                  </div>
                  <div className={`${style.indicador} ${style.stock}`}>
                    <span className={style.title}>Em Estoque</span>
                    <span>{stock}</span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </StructContainer>
    </section>
  );
}
