import style from "./home-manager.module.scss";
import StructContainer from "@/components/structs/container/container";
import {
  CopyOutlined,
  FundOutlined,
  InboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Link from "next/link";

export default function SectionHomeManager() {
  return (
    <section id={style.SectionHomeManager}>
      <StructContainer>
        <h2>Ir para</h2>
        <hr className={style.divider} />
        <Row gutter={30}>
          {[
            {
              icon: <UserOutlined className={style.icon} />,
              name: "Produtor",
              link: "/dashboard/gerenciador/produtor",
            },
            {
              icon: <FundOutlined className={style.icon} />,
              name: "Produção",
              link: "/dashboard/gerenciador/producao",
            },
            {
              icon: <CopyOutlined className={style.icon} />,
              name: "Pedidos",
              link: "/dashboard/gerenciador/pedidos",
            },
            {
              icon: <InboxOutlined className={style.icon} />,
              name: "Produtos",
              link: "/dashboard/gerenciador/produtos",
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
