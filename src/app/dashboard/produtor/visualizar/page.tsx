"use client"
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import {
  Space,
  Form,
  Input,
  Button,
  Divider,
  Flex,
} from 'antd';

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormDisabledDemo: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  return (
    <Flex justify='center'>
      <Form
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
        
      >
        <Form.Item label="Nome">
          <output />
        </Form.Item>

        <Form.Item label="Telefone">
          <output />
        </Form.Item>

        <Form.Item label="CPF">
          <output />
        </Form.Item>

        <Form.Item label="Endereço">
          <output />
        </Form.Item>

        <Form.Item label="E-mail">
          <output />
        </Form.Item>

      </Form>
      
      </Flex>
      
  );
};

export default () => <FormDisabledDemo />;