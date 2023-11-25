// pages/index.tsx
'use client';
import React, { useEffect, useState } from 'react';

interface Order {
  id: number;
  name: string;
  date: string;
  total: number;
  status: string;
  products: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
}

const getOrders = async (token: string) => {
  try {
    const response = await fetch('https://hendrickscheifer.pythonanywhere.com/api/order/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const ordersData: Order[] = await response.json();
    console.log('Orders:', ordersData);
    return ordersData;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

const Home: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(null); // Certifique-se de definir o token corretamente

  useEffect(() => {
    // Simule a obtenção do token (pode vir de um contexto, estado, etc.)
    const fakeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNTY4OTUxLCJpYXQiOjE3MDA0ODI1NTEsImp0aSI6Ijg1NWM2YjM1NTYwNzRhOGI4NzM1M2FlYWI1MDQ4YWQzIiwidXNlcl9pZCI6NSwidHlwZSI6ImFkbWluIiwiZW1haWwiOiJoZW5kcmlja2Zzc3NAZ21haWwuY29tIn0.lER9bWpfuGh9wA2lw1sru8QkBJr20YRBy96v0YAMpHk';
    setToken(fakeToken);

    const fetchData = async () => {
      try {
        const ordersData = await getOrders(fakeToken);
        setOrders(ordersData);
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Pedidos</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.name}</strong>
            <p>Data: {order.date}</p>
            <p>Total: R$ {order.total.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            <ul>
              {order.products.map((product) => (
                <li key={product.product_name}>
                  {product.product_name} - Quantidade: {product.quantity}, Preço: R$ {product.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
