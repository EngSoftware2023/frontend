"use client";
import style from "./form-order.module.scss";
import SubmitState from "@/components/lib/own/submit-status/submit-status";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import { FormEvent, useEffect, useState } from "react";
import ElementInputText, {
    FormInput,
} from "../form-input-text/form-input-text";
import { BodyPostOrder, TypeOrder, TypeOrderUpdate } from "@/service/api/endpoints/order";
import { ResponseGetProducts } from "@/service/api/endpoints/products";
import Api from "@/service/api/api";
import { useRouter } from "next/navigation";
import Auth from "@/service/auth/auth";

export type DataFormFild<T> = {
    value: T;
    valid: boolean;
    invalid: boolean;
};

export type FormOrderFilds = {
    name: FormInput;
    products: Array<{
        name: DataFormFild<string>;
        price: DataFormFild<number>;
        quantity: DataFormFild<number>;
    }>;
};

export interface IProps {
    orderForm: TypeOrder,
    increment: Function,
    products: string[]
}

export default function ElementFormOrder({
    orderForm, increment, products
}: IProps) {
    const router = useRouter();
    const [modal1Open, setModal1Open] = useState(false);

    const auth = Auth.getAuthWithRedirect(router);
    let productsNames;

    const [order, setOrderForm] = useState<TypeOrderUpdate>({
        id: orderForm.id,
        name: orderForm.name,
        products: []
    });
    const { SubmitButton, setError, setLoading, setNothing, setSendOk } =
        SubmitState("Atualizar");

    const updateOrder = () => {

        if (order.products.length > 0 && order.name != '') {
            Api.public
                .updateOrders({

                    id: order.id,
                    name: order.name,
                    products: order.products
                }, auth)
                .then((response) => {
                    console.log(response)
                    setModal1Open(true)
                })
                .catch((error) => {
                    console.log(error)

                });

            return;
        }
    };


    const onSubmitCapture = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validForSend =
            order.name != '' &&
            !order.products.filter(
                ({ name, price, quantity }) =>
                    !(name != '' && quantity != 0 && price != 0)
            ).length;

        if (!validForSend) {
            setSendOk("Campos inválidos !");
            return;
        }

        try {
            setLoading();
            // onSubmit(order); envia
            setSendOk("Enviado com Sucesso !");
        } catch (error) {
            setError("Erro ao enviar !");
        }
    };

    const addProduct = () => {
        order.products.push({
            name: '',
            quantity: 0,
            price: 0,
        });
        setOrderForm({ ...order });
    };

    const deleteProduct = (index: number) => {
        order.products.splice(index, 1);
        setOrderForm({ ...order });
    };

    function mascaraNumerica(valor: string) {
        valor = valor.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
        valor = valor.replace(/(\d{1,3})(\d)/, "$1.$2"); // Adiciona ponto antes dos últimos três dígitos
        valor = valor.replace(/(\d{1,3})(\d)/, "$1.$2"); // Adiciona ponto antes dos últimos três dígitos (novamente)
        return parseFloat(valor);
    }

    useEffect(() => {
        const newProducts = orderForm.products.map(({ product_name, ...rest }) => ({
            name: product_name,
            ...rest
        }));
        setOrderForm(prevOrderForm => ({
            ...prevOrderForm,
            products: newProducts
        }));
        setOrderForm(prevOrderForm => ({
            ...prevOrderForm,
            name: orderForm.name
        }));
        setOrderForm(prevOrderForm => ({
            ...prevOrderForm,
            id: orderForm.id
        }));
        console.log(newProducts, order)
    }, [orderForm])

    return (
        <Form
            className={style.FormOrder}
            layout="vertical"
            onSubmitCapture={onSubmitCapture}
        >
            <input type="text" name="" id="" value={order.name} required onChange={(e) => {
                setOrderForm({
                    ...order,
                    name: e.target.value,
                });
            }} />
            {
                order.products.length > 0 ? <>
                    {
                        order.products.map(({ }, index) => {
                            return (
                                <div key={index}>
                                    <Row gutter={15} align="middle">
                                        <Col span={7}>
                                            <Form.Item label="Produto" required>
                                                <Select
                                                    defaultValue={order.products[index] ? order.products[index].name : products[0]}
                                                    onChange={(newValue) => {
                                                        console.log(order.products[index], " index: ", index, newValue)
                                                        setOrderForm((prevState) => ({
                                                            ...prevState,
                                                            products: prevState.products.map((product, position) =>
                                                                position === index
                                                                    ? {
                                                                        ...product,
                                                                        name: newValue,
                                                                    }
                                                                    : product
                                                            ),
                                                        }));
                                                    }}>
                                                    {products.map((product) => {
                                                        return <Select.Option key={product} value={product}>
                                                            {product}
                                                        </Select.Option>
                                                    })}</Select>

                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item label="Quantidade" required>
                                                <input
                                                    required
                                                    min={1}
                                                    type="number"
                                                    style={{ width: "100%" }}
                                                    onChange={(newValue) => {
                                                        setOrderForm((prevState) => ({
                                                            ...prevState,
                                                            products: prevState.products.map((product, position) =>
                                                                position === index
                                                                    ? {
                                                                        ...product,
                                                                        quantity: parseInt(newValue.target.value),
                                                                    }
                                                                    : product
                                                            ),
                                                        }));
                                                    }}
                                                    value={order.products[index].quantity}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item label="Preço" required>
                                                <InputNumber
                                                    required
                                                    min={1}
                                                    precision={2}
                                                    prefix="R$"
                                                    style={{ width: "100%" }}
                                                    onChange={(newValue) => {
                                                        if (newValue) {
                                                            setOrderForm((prevState) => ({
                                                                ...prevState,
                                                                products: prevState.products.map((product, position) =>
                                                                    position === index
                                                                        ? {
                                                                            ...product,
                                                                            price: newValue,
                                                                        }
                                                                        : product
                                                                ),
                                                            }));
                                                        }
                                                    }}
                                                    value={order.products[index].price}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={1}>
                                            <MinusCircleOutlined onClick={() => deleteProduct(index)} />
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })
                    }
                </> : null
            }
            <Form.Item>
                <Button
                    type="dashed"
                    onClick={() => addProduct()}
                    block
                    icon={<PlusOutlined />}
                >
                    Adicionar Produto
                </Button>
            </Form.Item>
            <Form.Item>
                <input style={{ cursor: 'pointer', padding: "15px", background: "blue", borderRadius: '10px', color: "white", border: 'none', }} type="submit" onClick={(e) => { updateOrder() }} value='Atualizar' />
            </Form.Item>

            <Modal
                title=""
                style={{ top: 20 }}
                open={modal1Open}
                onOk={() => {
                    setModal1Open(false), increment(); if (document) {
                        location.reload();

                    }
                }}
                onCancel={() => setModal1Open(false)}
            >
                Atualizado com sucesso
            </Modal>
        </Form>
    );
}
