"use client"
import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      disabled
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      initialValues={{  nome:'Usuario', 
                        telefone:'(**)****-****',
                        cpf:'***********', 
                        endereço:'***.***.***-**', 
                        email:'*****@*****',
    }}
    >

      <Form.Item name="nome" label="Nome">
        <Input placeholder="Usuario" />
      </Form.Item>

      <Form.Item name="telefone" label="Telefone">
        <Input />
      </Form.Item>

      <Form.Item name="cpf" label="CPF">
        <Input />
      </Form.Item>

      <Form.Item name="endereço" label="Endereço" >
        <Input />
      </Form.Item>

      <Form.Item name="email" label="E-mail">
        <Input/>
      </Form.Item>

    </Form>
  );
};

export default App;
