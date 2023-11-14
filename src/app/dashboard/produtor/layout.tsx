import StructMenu from "@/components/structs/menu/menu";
import React from "react";

import {
  FormOutlined,
  FundOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

export type DataLayoutProducer = {
  children: React.ReactNode;
};

export default function LayoutProducer({ children }: DataLayoutProducer) {
  return (
    <main>
      <StructMenu
        options={[
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
        ]}
      >
        {children}
      </StructMenu>
    </main>
  );
}
