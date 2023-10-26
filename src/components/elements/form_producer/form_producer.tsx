'use client'
import React from 'react'
import   './style.scss'
import { Button, Input } from 'antd';
import { FileDoneOutlined, PhoneOutlined, UserOutlined, HomeOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';

export interface IProps {
    operation: string,

}

export function FormProducer({ operation }: IProps) {
    function teste(a: string) {
        console.log(a);
    }
    function clickButton(operation: string) {
        switch (operation) {
            case 'Cadastrar':
                teste('cadastrar');
                return 'foo';

            default:
                teste('cadastrar');
                return 'foo';
        }
    }

    return (
        <div className='div_form'>
            <form onSubmit={()=>{console.log('tesrte')}} action={''} style={{ maxWidth: "600px", margin: "0px auto" }}>
                <Input onChange={(e)=>{console.log("e")}} size="large" placeholder="Digite nome completo" prefix={<UserOutlined />} style={{ marginBottom: "20px" }} />
                <Input size="large" type='tel' placeholder="Digite telefone" prefix={<PhoneOutlined />} style={{ marginBottom: "20px" }} />
                <Input size="large" type='text' placeholder="Digite CPF" prefix={<FileDoneOutlined />} style={{ marginBottom: "20px" }} />
                <Input size="large" type='text' placeholder="Digite o endereço" prefix={<HomeOutlined />} style={{ marginBottom: "20px" }} />
                <Input size="large" type='email' placeholder="Digite o E-mail" prefix={<MailOutlined />} style={{ marginBottom: "20px" }} />
                <Input size="large" type='password' placeholder="Digite a senha" prefix={<KeyOutlined />} style={{ marginBottom: "20px" }} />
               <button className='button' onClick={(e)=>{e.preventDefault();clickButton(operation)}}>{operation}</button>
            </form>
        </div>
    )
}