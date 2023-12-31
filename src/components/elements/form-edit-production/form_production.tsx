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
import Auth from "@/service/auth/auth";
import { useRouter } from "next/navigation";
export interface IProps {
    production: IProduction,
    producers: IUsers[],
    products: IProduct[]
}
export default function FormProduction({ production, producers, products }: IProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        producer: string;
        product: string;
        quantity: FormInput;
        id: string;
        date: FormInput;

    }>({
        producer: production.producer,
        product: production.product,
        quantity: { value: production.quantity, valid: true, invalid: true },
        date: { value: production.date, valid: true, invalid: true },
        id: production.id,

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

        const auth = Auth.getAuthWithRedirect(router);
        const payload = Auth.getDataFromToken(auth.access);

        if (validToSend) {
            submitStatus.loading = true;
            setSubmitStatus({ ...submitStatus });

            Api.public
                .updateProduction({
                    producer: producer,
                    product: product,
                    quantity: parseInt(quantity.value),
                    id: parseInt(id),
                }, auth)
                .then((response) => {
                    setSubmitStatus({
                        loading: false,
                        send: true,
                        success: true,
                        text: "Atualizado com sucesso !",
                    });
                    router.push("/dashboard/gerenciador/listar-producoes")
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
    let defaultOption = options.find((option) => option.value === production.producer);

    return (
        <Form className={style.Form} layout="vertical" onSubmitCapture={onSubmit}>
            <Row gutter={[12, 15]}>
                <Col span={12}>
                    <label htmlFor="producer" style={{ marginTop: `5px` }}>Produtor <span style={{ color: 'red' }}>*</span></label>
                    <Select
                        disabled
                        style={{ width: `100%`, marginTop: '10px' }}
                        onChange={(e) => {
                            formData.producer = e.toString();
                            setFormData({ ...formData });
                        }}
                        options={options}
                        defaultValue={defaultOption?.value}
                    />
                </Col>

                <Col span={12}>
                    <label htmlFor="product" style={{ marginTop: `5px` }}>Produto <span style={{ color: 'red' }}>*</span></label>
                    <Select
                    disabled
                        style={{ width: `100%`, marginTop: '10px' }}
                        onChange={(e) => {
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
                <Col span={12}>
                    <label htmlFor="id">Id: </label>
                    <input style={{ marginTop: "25px", padding: '8px' }} type="number" value={production.id} disabled />
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
