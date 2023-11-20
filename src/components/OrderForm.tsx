'use client'
// OrderForm.tsx

import React, { useState } from 'react';
import { Form, Input, Button, List, InputNumber } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { PlusOutlined } from '@ant-design/icons';
import { Order, Product } from '../types/types';

interface OrderFormProps {
  token: string | null;
}

const OrderForm: React.FC<OrderFormProps> = ({ token }) => {
  const [form] = useForm();
  const [products, setProducts] = useState<Product[]>([]);

  const onFinish = async (values: Order) => {
    try {
      const response = await fetch('https://hendrickscheifer.pythonanywhere.com/api/order/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, products }),
      });

      if (!response.ok) {
        console.error('Erro na requisição:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Pedido criado com sucesso:', data);

      // Limpar o formulário e a lista de produtos após o sucesso
      form.resetFields();
      setProducts([]);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const addProduct = () => {
    setProducts([...products, { product_name: '', quantity: 0, price: 0 }]);
  };

  return (
    <Form form={form} name="orderForm" onFinish={onFinish}>
      <Form.Item name="name" label="Nome do Pedido">
        <Input />
      </Form.Item>

      <List
        dataSource={products}
        renderItem={(product, index) => (
          <List.Item key={index}>
            <Input
              value={product.product_name}
              onChange={(e) => {
                const newProducts = [...products];
                newProducts[index].product_name = e.target.value;
                setProducts(newProducts);
              }}
              placeholder="Nome do Produto"
            />
            <InputNumber
              value={product.quantity}
              onChange={(value) => {
                const newProducts = [...products];
                newProducts[index].quantity = value as number;
                setProducts(newProducts);
              }}
              placeholder="Quantidade"
            />
            <InputNumber
              value={product.price}
              onChange={(value) => {
                const newProducts = [...products];
                newProducts[index].price = value as number;
                setProducts(newProducts);
              }}
              placeholder="Preço"
            />
          </List.Item>
        )}
      />

      <Button type="dashed" onClick={addProduct} icon={<PlusOutlined />}>
        Adicionar Produto
      </Button>

      <Button type="primary" htmlType="submit">
        Criar Pedido
      </Button>
    </Form>
  );
};

export default OrderForm;