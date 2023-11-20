import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const OrderForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // Faça a chamada Fetch para o backend para cadastrar a ordem
      // Utilize o método POST e envie os dados necessários
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Pedido enviado com sucesso');
        form.resetFields();
      } else {
        message.error('Falha ao enviar o pedido');
      }
    } catch (error) {
      console.error('Erro ao enviar o pedido:', error);
      message.error('Ocorreu um erro ao enviar o pedido');
    }
  };

  return (
    // <Form.Item label=" " name=" " rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
    //     <Input type="number" step="any" />
    //   </Form.Item>

    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="ID do Pedido" name="id" rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Nome do Pedido" name="name" rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Data" name="date" rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Total" name="total" rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Nome do Produto" name="prodcuts.product_name" rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Quantidade do Produto" name="prodcuts.quantity" rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Preço do Produto" name="prodcuts.price" rules={[{ required: true, message: 'Por favor, insira um valor válido' }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar Pedido
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;