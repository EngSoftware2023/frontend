"use client";
import style from "./form-order.module.scss";
import SubmitState from "@/components/lib/own/submit-status/submit-status";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { FormEvent, useState } from "react";
import ElementInputText, {
  FormInput,
} from "../form-input-text/form-input-text";

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

export function useFormOrder(formInitialData?: FormOrderFilds) {
  return useState<FormOrderFilds>(
    formInitialData ?? {
      name: { value: "", valid: false, invalid: false },
      products: [],
    }
  );
}

export type DataElementFormOrder = {
  form: FormOrderFilds;
  setForm: (form: FormOrderFilds) => void;
  onSubmit: (form: FormOrderFilds) => void;
  productsList: Array<string>;
};

export default function ElementFormOrder({
  form,
  onSubmit,
  setForm,
  productsList,
}: DataElementFormOrder) {
  const { SubmitButton, setError, setLoading, setNothing, setSendOk } =
    SubmitState("Enviar");

  const onSubmitCapture = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validForSend =
      form.name.valid &&
      !form.products.filter(
        ({ name, price, quantity }) =>
          !(name.valid && price.valid && quantity.valid)
      ).length;

    if (!validForSend) {
      setSendOk("Campos inválidos !");
      return;
    }

    try {
      setLoading();
      onSubmit(form);
      setSendOk("Enviado com Sucesso !");
    } catch (error) {
      setError("Erro ao enviar !");
    }
  };

  const addProduct = () => {
    form.products.push({
      name: { value: "", valid: false, invalid: false },
      price: { value: 0, valid: false, invalid: false },
      quantity: { value: 0, valid: false, invalid: false },
    });
    setForm({ ...form });
  };

  const deleteProduct = (index: number) => {
    form.products.splice(index, 1);
    setForm({ ...form });
  };

  return (
    <Form
      className={style.FormOrder}
      layout="vertical"
      onSubmitCapture={onSubmitCapture}
    >
      <ElementInputText
        label="Nome do Pedido"
        required
        min={5}
        value={form.name}
        setValue={(newValue) => {
          form.name = newValue;
          setForm({ ...form });
        }}
      />
      {form.products.map(({}, index) => {
        return (
          <div key={index}>
            <Row gutter={15} align="middle">
              <Col span={7}>
                <Form.Item label="Produto" required>
                  <Select
                    onChange={(newValue) => {
                      form.products[index].name = {
                        value: newValue,
                        invalid: !newValue,
                        valid: !!newValue,
                      };
                      setForm({ ...form });
                    }}
                    value={form.products[index].name.value}
                    options={productsList.map((product) => {
                      return {
                        value: product,
                      };
                    })}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Quantidade" required>
                  <InputNumber
                    required
                    min={1}
                    precision={2}
                    prefix="Kg"
                    style={{ width: "100%" }}
                    onChange={(newValue) => {
                      if (newValue) {
                        form.products[index].quantity = {
                          value: newValue >= 1 ? newValue : 1,
                          valid: !!newValue,
                          invalid: !newValue,
                        };
                        setForm({ ...form });
                      }
                    }}
                    value={form.products[index].quantity.value}
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
                        form.products[index].price = {
                          value: newValue >= 1 ? newValue : 1,
                          valid: !!newValue,
                          invalid: !newValue,
                        };
                        setForm({ ...form });
                      }
                    }}
                    value={form.products[index].price.value}
                  />
                </Form.Item>
              </Col>
              <Col span={1}>
                <MinusCircleOutlined onClick={() => deleteProduct(index)} />
              </Col>
            </Row>
          </div>
        );
      })}
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
        <SubmitButton />
      </Form.Item>
    </Form>
  );
}
