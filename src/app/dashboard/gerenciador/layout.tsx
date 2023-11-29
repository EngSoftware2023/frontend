import StructMenu, { TypeOption } from "@/components/structs/menu/menu";
import React from "react";

import {
  CopyOutlined,
  FormOutlined,
  HomeOutlined,
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
      icon: <UnorderedListOutlined />,
      name: "Listar Pedidos",
      link: "/dashboard/gerenciador/listar-pedidos",
    },
    {
      icon: <CopyOutlined />,
      name: "Pedidos",
      link: "/dashboard/gerenciador/pedidos",
    },
  ];

  return (
    <main>
      <StructMenu options={options}>{children}</StructMenu>
    </main>
  );
}
