import StructContainer from "@/components/structs/container/container";
import { DataGetOrders } from "@/service/api/endpoints/order";
import { Col, Row } from "antd";
import style from "./list-order.module.scss";

export type DataListOrder = {
  orders: DataGetOrders;
};

export default function SectionListOrder({ orders }: DataListOrder) {
  return (
    <section id={style.SectionListOrder}>
      <StructContainer>
        <h2>Listagem de Pedidos</h2>
        <hr />
        <Row>
          {orders.map(({ id, products, name, date, status, total }) => (
            <Col span={24} key={id} className={style.cardOrder}>
              <h3>
                {name} ({status}) - {date} {total}
              </h3>
              <Row>
                {products.map((product, index) => (
                  <Col span={6} key={index} className={style.cardProduct}>
                    {product.product_name} - R${product.price} -{" "}
                    {product.quantity}Kg
                  </Col>
                ))}
              </Row>
            </Col>
          ))}
        </Row>
      </StructContainer>
    </section>
  );
}
