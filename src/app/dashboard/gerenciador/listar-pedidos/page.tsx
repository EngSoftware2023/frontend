'use client'
import React, { useEffect, useState } from 'react';
import OrderForm from '../../../../components/OrderForm';
import OrderList from '../../../../components/OrderList';

const Home: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Faça a chamada Fetch para o backend para obter a lista de pedidos
    fetch('/api/order')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h1>Criar pedido</h1>
      <OrderForm />
      <h2>Pedidos</h2>
      <OrderList orders={orders} />
    </div>
  );
};

export default Home;