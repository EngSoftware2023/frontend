"use client";
import style from "./form-register-producer.module.scss";
import { Button, Form, Input, Row, Col, Alert } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { FormEvent, useEffect, useState } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import ElementInputText, {
    FormInput,
} from "../form-input-text/form-input-text";
import ElementFormCepAddressNumber from "../form-cep-anddress-number/form-cep-address-number";
import Api from "@/service/api/api";
import { IUsers } from "@/types/types";
import { ResponseGetOrders } from "@/service/api/endpoints/order";
import { ResponseGetProducts } from "@/service/api/endpoints/products";
export interface IProps {
    orderForm: ResponseGetOrders,
    increment: Function,
    products: ResponseGetProducts
}
export default function FormOrder({ orderForm, increment, products }: IProps) {
    console.log(orderForm)
    const [order, setOrderForm] = useState<ResponseGetOrders>({
        id: orderForm.id,
        name: orderForm.name,
        date: orderForm.date,
        total: orderForm.total,
        status: orderForm.status,
        products: orderForm.products
    });
    useEffect(() => {
        setOrderForm(orderForm);
        formData.name = { value: orderForm.name, valid: true, invalid: true };
        formData.date = orderForm.date;
        formData.total = { value: orderForm.total, valid: true, invalid: true };
        formData.status = { value: orderForm.status, valid: true, invalid: true };
        formData.products = orderForm.products;
        setProducts(orderForm.products)
        setFormData({ ...formData });
        console.log(orderForm.date)
    }, [orderForm])

    const [produtos, setProducts] = useState<{ quantity: string, product_name: string, price: string }[]>(
        order.products
    );
    const [formData, setFormData] = useState<{
        id: FormInput;
        name: FormInput;
        date: string;
        total: FormInput;
        status: FormInput;
        products: { quantity: string, product_name: string, price: string }[];
    }>({
        name: { value: order.name, valid: true, invalid: true },
        id: { value: order.id, valid: true, invalid: true },
        date: order.date,
        total: { value: order.total, valid: true, invalid: true },
        status: { value: order.status, valid: true, invalid: true },
        products: order.products
    });

    const [submitStatus, setSubmitStatus] = useState<{
        text: string;
        loading: boolean;
        success: boolean;
        send: boolean;
    }>({
        loading: false,
        success: false,
        send: false,
        text: "",
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        console.log(event)
        event.preventDefault();
        const { id, name, date, total, status, products } =
            formData;

        const validToSend =
            !!id &&
            name.valid &&
            date != '' &&
            total.valid &&
            name.valid &&
            status.valid &&
            products.length > 0;

        console.log(validToSend, formData);

        if (validToSend) {
            submitStatus.loading = true;
            setSubmitStatus({ ...submitStatus });

            Api.public
                .updateOrders({
                    id: id.value,
                    name: name.value,
                    date: date,
                    total: total.value,
                    status: status.value,
                    products: products,
                })
                .then((response) => {
                    console.log(response)
                    setSubmitStatus({
                        loading: false,
                        send: true,
                        success: true,
                        text: "Atualizado com sucesso !",
                    });
                })
                .catch((error) => {
                    console.log(error)
                    setSubmitStatus({
                        loading: false,
                        send: true,
                        success: false,
                        text: "Erro ao Atualizar !",
                    });
                });

            return;
        }
    };
    return (
        <Form className={style.Form} layout="vertical" onSubmitCapture={onSubmit}>
            <Row gutter={[12, 15]}>
                <Col span={12}>
                    <ElementInputText
                        label="Nome pedido"
                        required
                        min={3}
                        value={formData.name}
                        setValue={(newValue) => {
                            formData.name = newValue;
                            setFormData({ ...formData });
                        }}
                    />
                </Col>
                <Col style={{ display: 'flex', flexDirection: 'column' }} span={12}>
                    <label style={{ marginBottom: '10px' }}>Data do Pedido <span style={{ color: "red" }}>*</span></label>
                    <input defaultValue={formData.date} type="date" name="data" id="" />

                </Col>
                <Col span={12}>
                    <ElementInputText
                        label="Total"
                        required
                        min={3}
                        value={formData.total}
                        setValue={(newValue) => {
                            formData.total = newValue;
                            setFormData({ ...formData });
                        }}
                    />
                </Col>
                <Col span={12}>
                    <ElementInputText
                        label="Status"
                        required
                        min={3}
                        value={formData.status}
                        setValue={(newValue) => {
                            formData.status = newValue;
                            setFormData({ ...formData });
                        }}
                    />
                </Col>
                <div>
                    <select>
                        {
                            products.map((e) => {
                                return <option>{e.name}</option>
                            })
                        }
                    </select>
                    <input type="number" name="" id="" />
                </div>
                <ul>
                    {
                        produtos.map((prod) => {
                            return (
                                <li style={{ display: 'flex', justifyContent: '4px' }}>
                                    <h2>Produto:{prod.product_name}</h2>
                                    <h2 style={{ marginLeft: '20px', marginRight: '20px' }}>Quantidade:{prod.quantity}</h2>
                                    <h2>Price:{prod.price}</h2>
                                </li>
                            )
                        })
                    }
                </ul>
                <Col className={style.containerButtons} span={24}>
                    {submitStatus.send && (
                        <Alert
                            message={submitStatus.text}
                            type={submitStatus.success ? "success" : "error"}
                        />
                    )}
                    <Button
                        className={style.button}
                        type="primary"
                        htmlType="submit"
                        icon={<FormOutlined />}
                        loading={submitStatus.loading}
                    >
                        Atualizar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
