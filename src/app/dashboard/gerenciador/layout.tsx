import StructMenu, { TypeOption } from "@/components/structs/menu/menu";
import React from "react";

import {
  FormOutlined,
  HomeOutlined,
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
      icon: <FormOutlined />,
      name: "Cadastrar Pedido",
      link: "/dashboard/gerenciador/cadastrar-pedido",
    },
    {
      icon: <UnorderedListOutlined />,
      name: "Listar Pedidos",
      link: "/dashboard/gerenciador/listar-pedidos",
    },
  ];

  return (
    <main>
      <StructMenu options={options}>{children}</StructMenu>
    </main>
  );
}
