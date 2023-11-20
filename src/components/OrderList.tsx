// components/OrderList.tsx
import React from 'react';
import { List, Typography } from 'antd';

interface Order {
  id: number;
  name: string;
  date: string;
  total: number;
  status: string;
  products: {
    product_name: string;
    quantity: number;
    price: number;
  }[];
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <List
      dataSource={orders}
      renderItem={(order) => (
        <List.Item>
          <Typography.Text strong>ID do Pedido:</Typography.Text> {order.id}<br />
          <Typography.Text strong>Nome do Pedido:</Typography.Text> {order.name}<br />
          <Typography.Text strong>Data:</Typography.Text> {order.date}<br />
          <Typography.Text strong>Total:</Typography.Text> {order.total}<br />
          <Typography.Text strong>Status:</Typography.Text> {order.status}<br />
          <Typography.Text strong>Produtos:</Typography.Text>
          <List
            dataSource={order.products}
            renderItem={(product, index) => (
              <List.Item key={index}>
                {product.product_name} - Quantidade: {product.quantity} - Preço: {product.price}
              </List.Item>
            )}
          />
        </List.Item>
      )}
    />
  );
};

export default OrderList;