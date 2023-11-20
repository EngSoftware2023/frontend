import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

interface ProductFormProps {
  onAddProduct: (product: { name: string; stock: number; request: number }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [form] = Form.useForm();

  const handleAddProduct = () => {
    form.validateFields().then((values) => {
      onAddProduct(values);
      form.resetFields();
    });
  };

  return (
    <div>
      <h2>Criar Pedido</h2>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor insira o nome do produto' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Estoque (KG)" name="stock" rules={[{ required: true, message: 'Por favor insira a quantidade em estoque do produto' }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="N. do Pedido" name="request" rules={[{ required: true, message: 'Por favor insira o número do pedido' }]}>
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" onClick={handleAddProduct}>
          Criar Pedido
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
