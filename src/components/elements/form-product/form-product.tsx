"use client";
import { Form } from "antd";
import ElementInputText, {
  FormInput,
} from "../form-input-text/form-input-text";
import { FormEvent, useState } from "react";
import SubmitState from "@/components/lib/own/submit-status/submit-status";

export type DataFormProduct = {
  name: FormInput;
};

export type DataElementFormProduct = {
  onSubmit: (data: DataFormProduct) => void;
  initialData: DataFormProduct;
};

export default function ElementFormProduct({
  initialData,
  onSubmit,
}: DataElementFormProduct) {
  const [formData, setFormData] = useState<DataFormProduct>(initialData);
  const { SubmitButton, setError, setLoading, setNothing, setSendOk } =
    SubmitState("Criar novo produto");

  const onSubmitCapture = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name } = formData;

    if (!name.valid) return;

    setLoading();

    try {
      onSubmit(formData);
      setSendOk("Criado com sucesso");
    } catch (e) {
      console.error(e);
      setError("Falha ao criar produto");
    }
  };

  return (
    <Form onSubmitCapture={onSubmitCapture} layout="vertical">
      <ElementInputText
        label="Nome"
        value={formData.name}
        min={3}
        setValue={(newValue) => {
          formData.name = newValue;
          setFormData({ ...formData });
        }}
        required
      />
      <SubmitButton />
    </Form>
  );
}
