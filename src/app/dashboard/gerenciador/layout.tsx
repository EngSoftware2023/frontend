import StructMenu, { TypeOption } from "@/components/structs/menu/menu";
import React from "react";

import {
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
      name: "Cadastrar Produtores",
      link: "/dashboard/gerenciador/cadastrar-produtor",
    },
    {
      icon: <OrderedListOutlined />,
      name: "Listar Produtores",
      link: "/dashboard/gerenciador/listar-produtores",
    },
    {
      icon: <UnorderedListOutlined />,
      name: "Listar Pedidos",
      link: "/dashboard/gerenciador/listar-pedidos",
    },
    {
      icon: <OrderedListOutlined />,
      name: "Listar Produções",
      link: "/dashboard/gerenciador/listar-producoes",
    }
  ];

  return (
    <main>
      <StructMenu options={options}>{children}</StructMenu>
    </main>
  );
}
