"use client";
import style from "./form-register-producer.module.scss";
import { Button, Form, Input, Row, Col, Alert } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { FormEvent, useEffect, useState } from "react";
import Mask from "@/helpers/mask";
import Validation from "@/helpers/validation";
import ElementInputText, {
  FormInput,
} from "../form-input-text/form-input-text";
import ElementFormCepAddressNumber from "../form-cep-anddress-number/form-cep-address-number";
import Api from "@/service/api/api";

export default function ElementFormRegisterProducer() {
  const initialValue: FormInput = { value: "", valid: false, invalid: false };

  const [formData, setFormData] = useState<{
    name: FormInput;
    telefone: FormInput;
    cpf: FormInput;
    address: FormInput;
    email: FormInput;
    password: FormInput;
    confirmPassword: FormInput;
  }>({
    name: { ...initialValue },
    telefone: { ...initialValue },
    cpf: { ...initialValue },
    address: { ...initialValue },
    email: { ...initialValue },
    password: { ...initialValue },
    confirmPassword: { ...initialValue },
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

    const { address, confirmPassword, cpf, email, name, password, telefone } =
      formData;

    const validToSend =
      !!address &&
      confirmPassword.valid &&
      cpf.valid &&
      email.valid &&
      name.valid &&
      password.valid &&
      telefone.valid;

    console.log(validToSend, formData);

    if (validToSend) {
      submitStatus.loading = true;
      setSubmitStatus({ ...submitStatus });

      Api.public
        .postProducer({
          name: name.value,
          phone: telefone.value,
          address: address.value,
          email: email.value,
          cpf: cpf.value,
          password: password.value,
        })
        .then((response) => {
          console.log(response)
          setSubmitStatus({
            loading: false,
            send: true,
            success: true,
            text: "Cadastrado com sucesso !",
          });
        })
        .catch((error) => {
          console.log(error)
          setSubmitStatus({
            loading: false,
            send: true,
            success: false,
            text: "Erro ao cadastrar !",
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
            label="Nome"
            required
            min={3}
            value={formData.name}
            setValue={(newValue) => {
              formData.name = newValue;
              setFormData({ ...formData });
            }}
          />
        </Col>
        <Col span={12}>
          <ElementInputText
            label="Telefone"
            required
            isInvalid={Validation.isPasswordInvalid}
            isValid={Validation.isPhoneNumberValid}
            masked={Mask.phoneNumberMask}
            value={formData.telefone}
            setValue={(newValue) => {
              formData.telefone = newValue;
              setFormData({ ...formData });
            }}
          />
        </Col>
        <Col span={12}>
          <ElementInputText
            label="E-Mail"
            required
            isValid={Validation.isEmailValid}
            isInvalid={Validation.isEmailInvalid}
            value={formData.email}
            setValue={(newValue) => {
              formData.email = newValue;
              setFormData({ ...formData });
            }}
          />
        </Col>
        <Col span={12}>
          <ElementInputText
            label="CPF"
            required
            isValid={Validation.isCPFValid}
            isInvalid={Validation.isCPFInvalid}
            masked={Mask.CPFMask}
            value={formData.cpf}
            setValue={(newValue) => {
              formData.cpf = newValue;
              setFormData({ ...formData });
            }}
          />
        </Col>
        <Col span={12}>
          <ElementFormCepAddressNumber
            setAddress={(address) => {
              formData.address = {
                value: address,
                valid: true,
                invalid: false,
              };
              setFormData({ ...formData });
            }}
          />
        </Col>
        <Col span={24}>
          <Form.Item label="Endereço">
            <Input disabled value={formData.address.value} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <ElementInputText
            label="Senha"
            required
            isValid={Validation.isPasswordValid}
            isInvalid={Validation.isPasswordInvalid}
            min={8}
            value={formData.password}
            setValue={(newValue) => {
              formData.password = newValue;
              setFormData({ ...formData });
            }}
          />
          <p>
            A senha deve conter no mínimo 8 caracteres, incluindo no minimo, um
            número, letra minúscula, letra maiúscula e caracter especial ex
            “!@#$...”.
          </p>
        </Col>
        <Col span={12}>
          <ElementInputText
            label="Confirmar Senha"
            required
            isValid={(password) =>
              !!password &&
              formData.password.valid &&
              password === formData.password.value
            }
            isInvalid={(password) =>
              !!password &&
              (password !== formData.password.value ||
                formData.password.invalid)
            }
            value={formData.confirmPassword}
            setValue={(newValue) => {
              formData.confirmPassword = newValue;
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
            Cadastrar-se
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
