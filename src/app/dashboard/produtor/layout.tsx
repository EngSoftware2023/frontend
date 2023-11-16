import StructMenu from "@/components/structs/menu/menu";
import React from "react";

import {
  FormOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
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
            icon: <ProfileOutlined />,
            name: "Ver Perfil",
            link: "/dashboard/produtor/visualizar",
          },
          {
            icon: <OrderedListOutlined />,
            name: "Ver Relato de produção",
            link: "/dashboard/produtor/verRelato",
          },
        ]}
      >
        {children}
      </StructMenu>
    </main>
  );
}
