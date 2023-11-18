import style from "./producer-list.module.scss";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";
import { ResponseGetProduction } from "@/service/api/endpoints/producer";
import { Button, Col, Row } from "antd";
import Link from "next/link";

export default async function PageProducerList() {
  let production: Array<ResponseGetProduction> = [];

  try {
    production = await Api.public.getProduction();
  } catch (e) {
    console.error(e);
  }

  return (
    <main>
      <section id={style.SectionProducerList}>
        <StructContainer>
          <h1>Listagem dos Produtores Cadastrados</h1>
          <hr />
          <Row gutter={[12, 15]}>
            {production.map(
              (
                { quantity, status, producer, product },
                index
              ) => (
                <Col key={index} span={24}>
                  <div className={style.cardProducer}>
                    <Row>
                      <Col span={20}>
                        <p>
                          <strong>Quantidade: </strong>
                          {quantity}
                        </p>
                        <p>
                          <strong>Status do item: </strong>
                          {status}
                        </p>
                        <p>
                          <strong>Produtor: </strong>
                          {producer}
                        </p>
                        <p>
                          <strong>Produto: </strong>
                          {product}
                        </p>
                      </Col>
                      <Col span={4} className={style.containerButton}>
                        <Link
                          href={"/dashboard/gerenciador/editar-produtor"}
                          title={`Editar ${name}`}
                        >
                          <Button>Editar</Button>
                        </Link>
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
