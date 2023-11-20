import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';
import ProductForm from './ProductForm';

interface Product {
  name: string;
  stock: number;
  request: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // O código para buscar produtos do backend permanece aqui...
  }, []);

  const handleAddProduct = (newProduct: { name: string; stock: number; request: number }) => {
    setProducts([...products, newProduct]);
    // Aqui você deve fazer a chamada para adicionar o produto ao backend
  };

  return (
    <div>
      <h1>Lista de Pedidos</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={products}
        renderItem={(product, index) => (
          <List.Item>
            <Card title={product.name}>
              <p><strong>Estoque:</strong> {product.stock}</p>
              <p><strong>N. do Pedido:</strong> {product.request}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductList;
