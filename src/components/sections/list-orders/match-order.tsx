import { TypeOrder } from "@/service/api/endpoints/order";
import { IProduct } from "@/types/types";
import React, { useEffect, useState } from "react";
import style from "./list-order.module.scss";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import Auth from "@/service/auth/auth";
import Api from "@/service/api/api";

export interface IProps {
  orderForm: TypeOrder;
  productsMatch: IProduct[];
}
export default function MatchOrder({ orderForm, productsMatch }: IProps) {
  console.log("Floi", productsMatch);
  let count = 0;
  const router = useRouter();
  const access_token = Auth.getAuthWithRedirect(router);
  const [produto, setProduto] = useState("");
  const [productionsGet, setGetProduction] = useState<
    {
      id: number;
      quantity: number;
      date: string;
      producer: string;
      product: string;
    }[]
  >();

  const [open, setOpen] = useState(false);
  const checkStock = (productName: string, quantity: number) => {
    const productInStock: IProduct | undefined = productsMatch.find(
      (product) => product.name === productName
    );

    if (productInStock && parseInt(productInStock.stock) >= quantity) {
      return true; // Produto em estoque e quantidade disponível é suficiente
    } else {
      count = 1;
      return false; // Produto não está em estoque ou quantidade insuficiente
    }
  };

  useEffect(() => {
    count = 0;
  }, [orderForm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productions = await Api.public.getProductions(access_token);
        setGetProduction(productions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Only fetch data if productionsGet is not defined or has changed
    if (typeof productionsGet === "undefined") {
      fetchData();
    }

    console.log("this", productionsGet);
  }, [productionsGet, setGetProduction]);

  return (
    <>
      <div>
        <h2>Pedido: {orderForm.name}</h2>
        <h3 style={{ textDecoration: "underline" }}>Produtos</h3>
        {orderForm.products.map((e) => {
          const isAvailableInStock = checkStock(e.product_name, e.quantity);

          return (
            <div
              style={{ padding: "10px", margin: "10px 0px" }}
              className={isAvailableInStock ? style.sucesso : style.erro}
              key={e.product_name}
            >
              <h4>Produto: {e.product_name}</h4>
              <h4>Quantidade: {e.quantity} KG</h4>
              <h4>Preço kG: {e.price}</h4>
              {productsMatch.map((match, index) => {
                if (match.name == e.product_name) {
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <h4
                        onClick={() => {
                          setOpen(true), setProduto(match.name);
                        }}
                        className={
                          isAvailableInStock
                            ? style.textSucesso
                            : style.textError
                        }
                      >
                        Quantidade em estoque: {match.stock}
                      </h4>
                      <Button
                        onClick={() => {
                          setOpen(true), setProduto(match.name);
                        }}
                        style={{ background: "white", color: "black" }}
                      >
                        Ver produtores
                      </Button>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
        {count == 0 ? (
          <Button style={{ background: "#1677ff", color: "white" }}>
            Vender
          </Button>
        ) : null}
      </div>
      <Modal
        title="Produtores"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"70%"}
      >
        {produto != "" ? (
          <div>
            {productionsGet?.map((e, index) => {
              console.log(e, produto);
              if (
                e.product.toLocaleLowerCase() == produto.toLocaleLowerCase()
              ) {
                return (
                  <div
                    key={index}
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "10px 0px",
                    }}
                  >
                    <h4>produtor {e.producer}</h4>
                    <h4>quantidade: {e.quantity}</h4>
                    <h4>quantidade: {e.date}</h4>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}
