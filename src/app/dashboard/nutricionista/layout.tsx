import StructMenu from "@/components/structs/menu/menu";
import React from "react";

import {
  HomeOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

export type DataLayoutNutritionist = {
  children: React.ReactNode;
};

export default function LayoutNutritionist({
  children,
}: DataLayoutNutritionist) {
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
