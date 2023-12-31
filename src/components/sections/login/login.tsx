"use client";
import style from "./login.module.scss";
import ElementInputText, {
  FormInput,
} from "@/components/elements/form-input-text/form-input-text";
import SubmitState from "@/components/lib/own/submit-status/submit-status";
import StructContainer from "@/components/structs/container/container";
import Validation from "@/helpers/validation";
import Api from "@/service/api/api";
import Auth from "@/service/auth/auth";
import { Button, Col, Form, Row } from "antd";
import Password from "antd/es/input/Password";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export function SectionLogin() {
  const route = useRouter();
  const initialValues: FormInput = { value: "", valid: false, invalid: false };

  const [forms, setForms] = useState<{
    email: FormInput;
    password: FormInput;
  }>({
    email: { ...initialValues },
    password: { ...initialValues },
  });

  const { SubmitButton, setError, setLoading, setNothing, setSendOk } =
    SubmitState("Entrar");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    forms.email.invalid = !Validation.isEmailValid(forms.email.value);
    forms.password.invalid = !Validation.isPasswordValid(forms.password.value);

    console.log(forms);

    if (forms.email.invalid || forms.password.invalid) {
      setError("Invalido");
      setForms({ ...forms });
      return;
    }

    setLoading();

    Api.public
      .postLogin({
        email: forms.email.value,
        password: forms.password.value,
      })
      .then((response) => {
        setSendOk("Entrou");
        const { access, refresh } = response;
        Auth.setAuth({ access, refresh });
        route.replace(`/dashboard/${Auth.getCorrectRedirect(access)}`);
        return;
      })
      .catch((error) => {
        console.log(error);
        setError("Error");
      });
  };

  return (
    <section id={style.SectionLogin}>
      <StructContainer className={style.ContainerFormLogin}>
        <h2>Entrar com sua conta</h2>
        <hr className={style.Bar} />
        <Form layout="vertical" onSubmitCapture={onSubmit}>
          <Row gutter={30}>
            <Col span={24}>
              <ElementInputText
                required
                label="Email"
                value={forms.email}
                setValue={(nemValue) => {
                  forms.email = nemValue;
                  setForms({ ...forms });
                }}
              />
            </Col>
            <Col span={24}>
              <Form.Item label="Senha" required hasFeedback>
                <Password
                  value={forms.password.value}
                  onChange={(event) => {
                    forms.password = {
                      value: event.target.value,
                      invalid: false,
                      valid: false,
                    };
                    setForms({ ...forms });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Link href="/auth/sign-up">
                <Button className={style.Button}>Registrar-se</Button>
              </Link>
            </Col>
            <Col span={12}>
              <SubmitButton className={style.Button} />
            </Col>
          </Row>
        </Form>
      </StructContainer>
    </section>
  );
}
