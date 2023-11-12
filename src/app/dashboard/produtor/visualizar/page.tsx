"use client"
import React from 'react';
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

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ nome: 'Usuario', 
                          telefone:'(**)****-****', 
                          cpf:'***********', 
                          endereço:'***.***.***-**', 
                          email:'*****@*****'});
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="telefone" label="Telefone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="endereço" label="Endereço" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="E-mail" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    

      <Form.Item {...tailLayout}>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
