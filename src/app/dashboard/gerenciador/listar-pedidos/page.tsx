'use client'
import { NextPage } from 'next';
import Head from 'next/head';
import OrderForm from '@/components/OrderForm';
import OrderList from '@/components/OrderList';
import { Order } from '@/types/types';

interface HomeProps {
  orders: Order[];
}

const Home: NextPage<HomeProps> = ({ orders }) => {
  return (
    <div>
      <Head>
        <title>Listagem de pedidos</title>
      </Head>

      <main>
        <h1>Criar pedido:</h1>
        
        <OrderForm />
        <h1>Lista de pedidos:</h1>

        <OrderList orders={orders} />
      </main>

    </div>
  );
};


export default Home;