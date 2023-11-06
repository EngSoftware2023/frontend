import style from "./producer-list.module.scss";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";
import { ResponseGetProducers } from "@/service/api/endpoints/producer";
import { Col, Row } from "antd";

export default async function PageProducerList() {
  let producers: Array<ResponseGetProducers> = [];

  try {
    producers = await Api.public.getProducers();
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
            {producers.map(
              (
                { address, cpf, email, name, password, phone, productions },
                index
              ) => (
                <Col key={index} span={24}>
                  <div className={style.cardProducer}>
                    <h3>
                      {name} - {cpf}
                    </h3>
                    <p>
                      <strong>Endereço: </strong>
                      {address}
                    </p>
                    <p>
                      <strong>Numero: </strong>
                      {phone} 
                      <strong> Email: </strong>
                      {email}
                    </p>
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
