"use client";
import style from "./form-register-producer.module.scss";
import { Button, Form, Input, Row, Col, Alert, Select, SelectProps } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { FormEvent, useEffect, useState } from "react";
import Mask from "@/helpers/mask";
import Validation from "@/helpers/validation";
import ElementInputText, {
    FormInput,
} from "../form-input-text/form-input-text";
import ElementFormCepAddressNumber from "../form-cep-anddress-number/form-cep-address-number";
import Api from "@/service/api/api";
import { IProduct, IProduction, IUsers } from "@/types/types";
export interface IProps {
    production: IProduction,
    producers: IUsers[],
    products: IProduct[]
}
export default function FormProductionProducer({ production, producers, products }: IProps) {
    console.log(products)
    const [formData, setFormData] = useState<{
        producer: string;
        product: string;
        quantity: FormInput;
        id: FormInput;
        date: FormInput;

    }>({
        producer: production.producer,
        product: production.product,
        quantity: { value: production.quantity, valid: true, invalid: true },
        date: { value: production.date, valid: true, invalid: true },
        id: { value: production.id, valid: true, invalid: true },

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
        event.preventDefault();
        const { producer, product, date, quantity, id } =
            formData;

        const validToSend =
            !!producer &&
            quantity &&
            product &&
            date &&
            id;

        if (validToSend) {
            submitStatus.loading = true;
            setSubmitStatus({ ...submitStatus });

            Api.public
                .updateProduction({
                    producer: producer,
                    product: product,
                    quantity: parseInt(quantity.value),
                    id: parseInt(id.value)
                })
                .then((response) => {
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

    const options: SelectProps['options'] = [];

    const optionsProducts: SelectProps['options'] = [];


    producers.map((producer) => {
        options.push({
            value: producer.cpf,
            label: `${producer.name} - CPF: ${producer.cpf}`,
        });
    });

    products.map((prod) => {
        optionsProducts.push({
            value: prod.name,
            label: prod.name,
        });
    })

    let defaultOptionProd = optionsProducts.find((option) => option.value === production.product);

    return (
        <Form className={style.Form} layout="vertical" onSubmitCapture={onSubmit}>
            <Row gutter={[12, 15]}>
                <Col span={12}>
                    <label htmlFor="product" style={{ marginTop: `5px` }}>Produto <span style={{ color: 'red' }}>*</span></label>
                    <Select
                        style={{ width: `100%`, marginTop: '10px', color: 'black' }}
                        onChange={(e) => {
                            console.log(e)
                            formData.product = e.toString();
                            setFormData({ ...formData });
                        }}
                        options={optionsProducts}
                        defaultValue={defaultOptionProd?.value}
                    />
                </Col>
                <Col span={12}>
                    <ElementInputText
                        label="Quantidade"
                        required
                        isValid={Validation.isANumber}
                        isInvalid={Validation.isNotNumber}
                        value={formData.quantity}
                        setValue={(newValue) => {
                            formData.quantity = newValue;
                            setFormData({ ...formData });
                        }}
                    />
                </Col>

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
