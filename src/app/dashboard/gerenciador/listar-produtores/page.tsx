"use client";
import style from "./producer-list.module.scss";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";
import { ResponseGetProducers } from "@/service/api/endpoints/producer";
import Auth from "@/service/auth/auth";
import { Button, Col, Modal, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function PageProducerList() {
  const [producers, setProducers] = useState<ResponseGetProducers[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>();
  const router = useRouter();
  const access_token = Auth.getAuthWithRedirect(router);
  const [modal1Open, setModal1Open] = useState(false);

  function deleteProducer() {
    if (id) {
      Api.public
        .deleteProducer({ cpf: id }, access_token)
        .then((response) => {
          console.log(response);
          setModal1Open(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        let getProducers = await Api.public.getProducers();
        setProducers(getProducers);
      } catch (e) {
        console.error(e);
      }
    };

    fetchProducers();
  }, []);

  return (
    <main>
      <section id={style.SectionProducerList}>
        {producers.length > 0 ? (
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
                      <Row>
                        <Col span={20}>
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
                        </Col>
                        <Col span={4} className={style.containerButton}>
                          <Link
                            href={`/dashboard/gerenciador/editar-produtor/${cpf}?name=${name}&phone=${phone}&email=${email}&cpf=${cpf}&address=${address}&password=${password}`}
                            title={`Editar ${name}`}
                          >
                            <Button>Editar</Button>
                          </Link>

                          <Button
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                              setOpen(true), setId(cpf);
                            }}
                          >
                            Excluir
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                )
              )}
            </Row>
          </StructContainer>
        ) : (
          <h2>Carregando dados</h2>
        )}
      </section>
      <Modal
        title="Produtor deletado"
        style={{ top: 20 }}
        open={modal1Open}
        onOk={() => {
          setModal1Open(false), router.refresh(), router.refresh();
        }}
        onCancel={() => setModal1Open(false)}
      >
        <h2>Produtor apagador com sucesso</h2>
      </Modal>
      <Modal
        title="Atenção"
        centered
        open={open}
        onOk={() => {
          deleteProducer(), setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        tem certeza que deseja deletar esse produtor?
      </Modal>
    </main>
  );
}
