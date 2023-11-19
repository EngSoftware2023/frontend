import style from "./producer-list.module.scss";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";
import { ResponseGetProduct } from "@/service/api/endpoints/producer";
import { Col, Row } from "antd";

export default async function PageProducerList() {
  let production: Array<ResponseGetProduct> = [];

  try {
    production = await Api.public.getProduct();
  } catch (e) {
    console.error(e);
  }

  return (
    <main>
      <section id={style.SectionProductionnpmList}>
        <StructContainer>
          <h1>Listagem dos Produtores Cadastrados</h1>
          <hr />
          <Row gutter={[12, 15]}>
            {production.map(
              (
                { 
                  id,
                  name,
                  date,
                  total,
                  status,
                  products,
                 },
                index
              ) => (
                <Col key={index} span={24}>
                  <div className={style.cardProduction}>
                    <Row>
                      <Col span={20}>
                        <p>
                          <strong>ID: </strong>
                          {id}
                        </p>
                        <p>
                          <strong>Nome:</strong>
                          {name}
                        </p>
                        <p>
                          <strong>Data: </strong>
                          {date}
                        </p>
                        <p>
                          <strong>Total: </strong>
                          {total}
                        </p>
                        <p>
                          <strong>Status: </strong>
                          {status}
                        </p>
                        <p>
                          <strong>Products: </strong>
                          {products}
                        </p>
                      </Col>
                      <Col span={4} className={style.containerButton}>
                      </Col>
                    </Row>
                  </div>
                </Col>
              )
            )}
          </Row>
        </StructContainer>
      </section>
    </main>
  );
}
