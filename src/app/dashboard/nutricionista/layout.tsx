import StructMenu from "@/components/structs/menu/menu";
import React from "react";

import {
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
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "nav 1",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "nav 2",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "nav 3",
          },
        ]}
      >
        {children}
      </StructMenu>
    </main>
  );
}
