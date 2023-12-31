import StructContainer from "@/components/structs/container/container";
import { DataGetOrders, TypeOrder } from "@/service/api/endpoints/order";
import { Button, Col, Modal, Row } from "antd";
import style from "./list-order.module.scss";
import { useEffect, useState } from "react";
import FormOrder from "@/components/elements/form-edit-order/form-edit-order";
import { ResponseGetProducts } from "@/service/api/endpoints/products";
import Api from "@/service/api/api";
import { useRouter } from "next/navigation";
import Auth from "@/service/auth/auth";
import MatchOrder from "./match-order";
import { IProduct } from "@/types/types";

export type DataListOrder = {
  orders: DataGetOrders;
  products: string[];
  productsMatch: IProduct[];
};

export default function SectionListOrder({
  orders,
  products,
  productsMatch,
}: DataListOrder) {
  const [order, setOrder] = useState<TypeOrder>({
    id: 0,
    name: "",
    products: [],
  });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openMatch, setMatch] = useState(false);
  const increment = (e: TypeOrder) => {
    router.refresh();
  };
  const router = useRouter();
  const auth = Auth.getAuthWithRedirect(router);
  const deleteOrder = (id: number) => {
    console.log(order.id);
    if (order.id) {
      Api.public
        .deleteOrder(
          {
            id: order.id,
          },
          auth
        )
        .then((response) => {
          console.log(response);
          router.push("/dashboard/gerenciador/pedidos");
          router.refresh();
        })
        .catch((error) => {
          console.log(error);
        });

      return;
    }
  };

  useEffect(() => {});
  return (
    <section id={style.SectionListOrder}>
      <StructContainer>
        <h2>Listagem de Pedidos</h2>
        <hr />
        <Row>
          {orders.map(({ id, products, name, date, status, total }) => {
            const productDate = new Date(date);
            const formatDate = `${productDate.getDate() + 1}/${
              productDate.getMonth() + 1
            }/${productDate.getFullYear()}`;
            return (
              <Col span={24} key={id} className={style.cardOrder}>
                <h3>
                  {name} ({status}) - {formatDate} {total}
                </h3>
                <Row>
                  {products.map((product, index) => (
                    <Col span={6} key={index} className={style.cardProduct}>
                      {product.product_name} - R${product.price} -{" "}
                      {product.quantity}Kg
                    </Col>
                  ))}
                </Row>
                <Col
                  span={4}
                  className={style.containerButton}
                  style={{ marginTop: "20px" }}
                >
                  <Col
                    span={4}
                    className={style.containerButton}
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <Button
                      style={{ background: "#1677ff", color: "white" }}
                      onClick={() => {
                        setOrder({ id, name, products });
                        setOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      style={{ background: "#fff" }}
                      onClick={() => {
                        setOpenDelete(true), setOrder({ id, name, products });
                      }}
                    >
                      Apagar
                    </Button>
                    <Button
                      style={{ background: "#1677ff", color: "white" }}
                      onClick={() => {
                        setOrder({ id, name, products });
                        setMatch(true);
                      }}
                    >
                      Verificar estoque
                    </Button>
                  </Col>
                </Col>
              </Col>
            );
          })}
        </Row>
      </StructContainer>
      <Modal
        title="Editar pedido"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"70%"}
      >
        <FormOrder
          increment={increment}
          orderForm={order}
          products={products}
        />
      </Modal>
      <Modal
        title="Editar pedido"
        centered
        open={openDelete}
        onOk={() => {
          setOpenDelete(false), deleteOrder(order.id);
          if (document) {
            location.reload();
          }
        }}
        onCancel={() => setOpenDelete(false)}
        width={"70%"}
      >
        <h2>Tem certeza que deseja deletar?</h2>
      </Modal>
      <Modal
        title="Finalizar pedido"
        centered
        open={openMatch}
        onOk={() => {
          setMatch(false);
        }}
        onCancel={() => setMatch(false)}
        width={"70%"}
      >
        <MatchOrder orderForm={order} productsMatch={productsMatch} />
      </Modal>
    </section>
  );
}
