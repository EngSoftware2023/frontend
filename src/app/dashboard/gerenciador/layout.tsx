import StructMenu, { TypeOption } from "@/components/structs/menu/menu";
import React from "react";

import {
  CopyOutlined,
  FormOutlined,
  HomeOutlined,
  InboxOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
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
      icon: <FormOutlined />,
      name: "Cadastrar Produtor",
      link: "/dashboard/gerenciador/cadastrar-produtor",
    },
    {
      icon: <UnorderedListOutlined />,
      name: "Listar Produtores",
      link: "/dashboard/gerenciador/listar-produtores",
    },
    {
      icon: <OrderedListOutlined />,
      name: "Listar Produções",
      link: "/dashboard/gerenciador/listar-producoes",
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
