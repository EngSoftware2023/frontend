import style from "./home-producer.module.scss";
import StructContainer from "@/components/structs/container/container";
import { FundOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Link from "next/link";

export default function SectionHomeProducer() {
  return (
    <section id={style.SectionHomeProducer}>
      <StructContainer>
        <h2>Ir para</h2>
        <hr className={style.divider} />
        <Row gutter={30}>
          {[
            {
              icon: <UserOutlined className={style.icon} />,
              name: "Visualizar Perfil",
              link: "/dashboard/produtor/visualizar",
            },
            {
              icon: <FundOutlined className={style.icon} />,
              name: "Produção",
              link: "/dashboard/produtor/producao",
            },
          ].map(({ icon, link, name }, index) => {
            return (
              <Col lg={6} key={index}>
                <Link href={link} title={name} className={style.link}>
                  {icon}
                  {name}
                </Link>
              </Col>
            );
          })}
        </Row>
      </StructContainer>
    </section>
  );
}
