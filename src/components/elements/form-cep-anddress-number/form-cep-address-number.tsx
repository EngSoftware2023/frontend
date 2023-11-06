"use client";
import style from "./form-cep-address-number.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row } from "antd";
import { FormEvent, useState } from "react";
import ElementInputText, {
  FormInput,
} from "../form-input-text/form-input-text";
import Mask from "@/helpers/mask";
import ApiCep from "@/service/api-cep/api-cep";

export type DataElementCepAddressNumber = {
  setAddress: (value: string) => void;
};

export default function ElementFormCepAddressNumber({
  setAddress,
}: DataElementCepAddressNumber) {
  const initialValue: FormInput = { value: "", valid: false, invalid: false };

  const [formData, setFormData] = useState<{
    cep: FormInput;
    addressNumber: FormInput;
  }>({
    cep: { ...initialValue },
    addressNumber: { ...initialValue },
  });

  const [statusSubmit, setStatusSubmit] = useState<{
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

  const submit = () => {
    const { addressNumber, cep } = formData;

    statusSubmit.loading = true;

    setStatusSubmit({ ...statusSubmit });

    ApiCep.public
      .getAdressByCep(Mask.onlyNumber(cep.value))
      .then((res) => {
        const { bairro, cep, localidade, logradouro, uf } = res;

        setAddress(
          `${logradouro} ${bairro} ${addressNumber.value} ${localidade}, ${uf}, BR - ${cep}`
        );

        setStatusSubmit({
          loading: false,
          send: true,
          success: true,
          text: "Sucesso !",
        });
      })
      .catch((error) => {
        console.error(error);
        setStatusSubmit({
          loading: false,
          send: true,
          success: false,
          text: "Ocorreru um erro !",
        });
      });
  };

  return (
    <div className={style.FormsCepAdrresNumber}>
      <Row gutter={12}>
        <Col span={11}>
          <ElementInputText
            label="CEP"
            required
            masked={Mask.CEPMaks}
            value={formData.cep}
            setValue={(newValue) => {
              formData.cep = newValue;
              setFormData({ ...formData });
            }}
          />
        </Col>
        <Col span={11}>
          <ElementInputText
            label="N°"
            required
            max={6}
            value={formData.addressNumber}
            setValue={(newValue) => {
              formData.addressNumber = newValue;
              setFormData({ ...formData });
            }}
          />
        </Col>
        <Col span={2} style={{ display: "flex", alignItems: "center" }}>
          <Button
            className={style.button}
            type="primary"
            icon={<SearchOutlined />}
            onClick={submit}
            loading={statusSubmit.loading}
          />
        </Col>
      </Row>
    </div>
  );
}
