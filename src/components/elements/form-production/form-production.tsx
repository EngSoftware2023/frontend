import SubmitStatus from "@/components/lib/own/submit-status/submit-status";
import { Col, DatePicker, Form, InputNumber, Row, Select } from "antd";
import { FormEvent } from "react";

export type DataFormFild<T> = {
  value: T;
  valid: boolean;
  invalid: boolean;
};

export type DataFormProduction = {
  product: DataFormFild<string>;
  quantity: DataFormFild<number | null>;
};

export type DataElementFormProduction = {
  form: DataFormProduction;
  setForm: (form: DataFormProduction) => void;
  onSubmitForm: (form: DataFormProduction) => Promise<boolean>;
  products: Array<string>;
};

export default function ElementFormProduction({
  form,
  onSubmitForm,
  products,
  setForm,
}: DataElementFormProduction) {
  const { SubmitButton, setError, setLoading, setNothing, setSendOk } =
    SubmitStatus("Enviar");

  const onSubmitCapture = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { product, quantity } = form;

    if (!product.valid || !quantity.valid) return;

    setLoading();

    try {
      const result = await onSubmitForm(form);
      setSendOk("Produção adicionada com sucesso !");
    } catch (e) {
      setError("Houve um erro ao adicionar produção !");
    }
  };

  return (
    <Form onSubmitCapture={onSubmitCapture} layout="vertical">
      <Row gutter={15}>
        <Col span={12}>
          <Form.Item label="Produto" required>
            <Select
              onChange={(newValue) => {
                form.product = {
                  value: newValue,
                  invalid: !newValue,
                  valid: !!newValue,
                };
                setForm({ ...form });
              }}
              value={form.product.value}
              options={products.map((product) => {
                return {
                  value: product,
                };
              })}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Quantidade" required>
            <InputNumber
              required
              min={1}
              precision={2}
              prefix="Kg"
              style={{ width: "100%" }}
              onChange={(newValue) => {
                if (newValue) {
                  form.quantity = {
                    value: newValue >= 1 ? newValue : 1,
                    valid: !!newValue,
                    invalid: !newValue,
                  };
                  setForm({ ...form });
                }
              }}
              value={form.quantity.value}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <SubmitButton />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
