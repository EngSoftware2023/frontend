import StructMenu, { TypeOption } from "@/components/structs/menu/menu";
import React from "react";

import {
  CopyOutlined,
  FormOutlined,
  FundOutlined,
  HomeOutlined,
  InboxOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

export type DataLayoutManeger = {
  children: React.ReactNode;
};

export default function LayoutManager({ children }: DataLayoutManeger) {
  const options: Array<TypeOption> = [
    {
      icon: <HomeOutlined />,
      name: "Pagina inicial",
      link: "/dashboard/gerenciador",
    },
    {
      icon: <UserOutlined />,
      name: "Produtor",
      link: "/dashboard/gerenciador/produtor",
    },
    {
      icon: <FundOutlined />,
      name: "Produção",
      link: "/dashboard/gerenciador/producao",
    },
    {
      icon: <CopyOutlined />,
      name: "Pedidos",
      link: "/dashboard/gerenciador/pedidos",
    },
    {
      icon: <InboxOutlined />,
      name: "Produtos",
      link: "/dashboard/gerenciador/produtos",
    },
  ];

  return (
    <main>
      <StructMenu options={options}>{children}</StructMenu>
    </main>
  );
}
