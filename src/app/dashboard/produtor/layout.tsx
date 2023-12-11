import StructMenu from "@/components/structs/menu/menu";
import React from "react";

import { FundOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";

export type DataLayoutProducer = {
  children: React.ReactNode;
};

const options = [
  {
    icon: <HomeOutlined />,
    name: "Pagina inicial",
    link: "/dashboard/produtor",
  },
  {
    icon: <UserOutlined />,
    name: "Ver Perfil",
    link: "/dashboard/produtor/visualizar",
  },
  {
    icon: <FundOutlined />,
    name: "Produção",
    link: "/dashboard/produtor/producao",
  },
];

export default function LayoutProducer({ children }: DataLayoutProducer) {
  return (
    <main>
      <StructMenu options={options}>{children}</StructMenu>
    </main>
  );
}
