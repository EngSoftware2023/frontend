import StructMenu from "@/components/structs/menu/menu";
import React from "react";

import {
  FormOutlined,
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
            link: "/dashboard/gerenciador",
          },
        ]}
      >
        {children}
      </StructMenu>
    </main>
  );
}
