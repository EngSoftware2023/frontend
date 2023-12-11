import Link from "next/link";
import styles from "./page.module.scss";
import StructContainer from "@/components/structs/container/container";
import { Col, Row } from "antd";
import {
  FormOutlined,
  LoginOutlined,
  SecurityScanOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function PageHome() {
  return (
    <main id={styles.PageHome}>
      <StructContainer>
        <Row gutter={30}>
          <Col lg={24}>
            <h1>Bem vindo !</h1>
            <hr />
          </Col>
          <Col lg={6}>
            <Link href="/auth/login" title="Login" className={styles.option}>
              <LoginOutlined className={styles.icon} />
              Entrar
            </Link>
          </Col>
          <Col lg={6}>
            <Link href="/auth/sign-up" title="Login" className={styles.option}>
              <FormOutlined className={styles.icon} />
              Registrar-se
            </Link>
          </Col>
          <Col lg={6}>
            <Link
              href="/dashboard/gerenciador"
              title="Dashboard Gerenciador"
              className={styles.option}
            >
              <SecurityScanOutlined className={styles.icon} />
              Painel Gerenciador
            </Link>
          </Col>
          <Col lg={6}>
            <Link
              href="/dashboard/produtor"
              title="Dashboard Gerenciador"
              className={styles.option}
            >
              <UserOutlined className={styles.icon} />
              Painel Produtor
            </Link>
          </Col>
        </Row>
      </StructContainer>
    </main>
  );
}
