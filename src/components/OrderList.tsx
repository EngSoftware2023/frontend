import React from 'react';
import { List, Card } from 'antd';
import { Order, Product } from '../types/types';

const OrderList = ({ orders }: { orders: Order[] }) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={orders}
      renderItem={(order) => (
        <List.Item>
          <Card title={order.name || 'Pedido sem nome'}>
            {/* ... outros detalhes do pedido */}
            <ul>
              {order.products.map((product: Product) => (
                <li key={product.product_name}>
                  {product.product_name} - Quantidade: {product.quantity}, Preço: {product.price}
                </li>
              ))}
            </ul>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default OrderList;
