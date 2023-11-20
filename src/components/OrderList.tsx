// OrderList.tsx

import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';
import { Order, Product } from '../types/types';

interface OrderListProps {
  orders: Order[];
  token: string | null;
}

const OrderList: React.FC<OrderListProps> = ({ orders, token }) => {
  const [detailedOrders, setDetailedOrders] = useState<Order[]>([]);

  const getOrderDetails = async () => {
    try {
      const detailedOrdersData = await Promise.all(
        orders.map(async (order) => {
          const response = await fetch(`https://hendrickscheifer.pythonanywhere.com/api/order/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.error('Erro na requisição:', response.statusText);
            return order; // Se houver um erro, retorna o pedido original
          }

          const data = await response.json();
          return data; // Retorna os detalhes do pedido
        })
      );

      setDetailedOrders(detailedOrdersData);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [orders, token]);

  return (
    <List
      itemLayout="vertical"
      dataSource={detailedOrders}
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
