'use client'
import StructContainer from "@/components/structs/container/container"
import { ResponseGetOrders } from "@/service/api/endpoints/order"
import { Button, Col, Modal, Row } from "antd"
import style from "./producer-list.module.scss";
import { useState } from "react";
import FormOrder from "@/components/elements/form-edit-order/form-edit-order";

export interface IProps {
    orders: ResponseGetOrders[]
}
export default function ListOrder({ orders }: IProps) {
    const [order, setOrder] = useState<ResponseGetOrders>({
        id: '',
        name: '',
        date: '',
        total: '',
        status: '',
        products: []
    });
    const [open, setOpen] = useState(false);
    const increment = (e: ResponseGetOrders) => {
        setOrder(e);
    };
    return (
        <section id={style.SectionProducerList}>
            <StructContainer>
                <h1>Listagem dos Pedidos Cadastrados</h1>
                <hr />
                <Row gutter={[12, 15]}>
                    {orders.map(
                        (
                            { id, name, date, products, total, status },
                            index
                        ) => (
                            <Col key={index} span={24}>
                                <div className={style.cardProducer}>
                                    <Row>
                                        <Col span={20}>
                                            <h3>
                                                {name}
                                            </h3>
                                            {
                                                products.length > 0 ?
                                                    <>
                                                        {
                                                            products.map((prod) => {
                                                                return <h3>{prod.product_name}</h3>
                                                            })
                                                        }
                                                    </> : <></>
                                            }
                                        </Col>
                                        <Col span={4} className={style.containerButton}>
                                            <Col span={4} className={style.containerButton}>

                                                <Button onClick={() => { setOrder({ id, name, date, products, total, status }); setOpen(true) }}>Editar</Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        )
                    )}
                </Row>
            </StructContainer>
            <Modal
                title="Editar pedido"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={'70%'}
            >
                <FormOrder increment={increment} orderForm={order} />
            </Modal>
        </section>
    )
}
