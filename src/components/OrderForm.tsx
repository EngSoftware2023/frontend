import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const OrderForm: React.FC = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<{ product_name: string; quantity: number; price: number }[]>([]);

  const onFinish = async (values: any) => {
    try {
      // Adicionando a lista de produtos aos valores do pedido
      const orderWithProducts = { ...values, products };
      
      const response = await fetch('/Api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderWithProducts),
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

  const handleProductNameChange = (index: number, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index].product_name = value;
    setProducts(updatedProducts);
  };

  const handleProductQuantityChange = (index: number, value: number | null) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = value ?? 0; // Se value for null, use 0
    setProducts(updatedProducts);
  };
  
  const handleProductPriceChange = (index: number, value: number | null) => {
    const updatedProducts = [...products];
    updatedProducts[index].price = value ?? 0; // Se value for null, use 0
    setProducts(updatedProducts);
  };
  const addProduct = () => {
    // Lógica para adicionar um novo produto ao estado local
    const newProduct = { product_name: 'Novo Produto', quantity: 1, price: 0.0 };
    setProducts([...products, newProduct]);
  };

  return (
    <Form form={form} name="orderForm" onFinish={onFinish}>
      {/* Adicione os campos do formulário conforme necessário */}
      <Form.Item name="name" label="Nome do Pedido">
        <Input />
      </Form.Item>

      <Form.Item name="date" label="Data do Pedido">
        <DatePicker />
      </Form.Item>

      <Form.Item name="total" label="Total">
        <InputNumber />
      </Form.Item>

      {/* Lista de produtos */}
      <List
        header={<div>Produtos</div>}
        dataSource={products}
        renderItem={(product, index) => (
          <List.Item>
            <Form.Item label="Nome do Produto">
              <Input
                value={product.product_name}
                onChange={(e) => handleProductNameChange(index, e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Quantidade">
              <InputNumber
                value={product.quantity}
                onChange={(value) => handleProductQuantityChange(index, value)}
              />
            </Form.Item>
            <Form.Item label="Preço">
              <InputNumber
                value={product.price}
                onChange={(value) => handleProductPriceChange(index, value)}
              />
            </Form.Item>
          </List.Item>
        )}
      />

      {/* Botão para adicionar produto */}
      <Form.Item>
        <Button type="dashed" onClick={addProduct} icon={<PlusOutlined />}>
          Adicionar Produto
        </Button>
      </Form.Item>

      {/* Botão de submit */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Criar Pedido
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
