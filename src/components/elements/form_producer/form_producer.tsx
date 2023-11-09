'use client'
import React, { useState, useEffect } from 'react'
import './style.scss'
import { Button, Input } from 'antd';
import { FileDoneOutlined, PhoneOutlined, UserOutlined, HomeOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';
import { IUsers } from '@/types/types';

export interface IProps {
    user: IUsers | null,
    operationFunction: Function;
    updateData: Function;
}

export function FormProducer({ user, updateData, operationFunction }: IProps) {
    const [data, setData] = useState({
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
        cpf: user?.cpf,
        address: user?.address,
        password: user?.password
    });


    useEffect(() => {
        updateData(data);
    }, [data]);
    useEffect(() => {

    }, [])

    return (
        <div className='div_form'>
            <form onSubmit={() => { console.log('') }} action={''} style={{ maxWidth: "600px", margin: "0px auto" }}>
                <Input
                    id='name'
                    value={data.name}
                    onChange={(e) => {
                        setData((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                        }));
                    }} size="large" placeholder="Digite nome completo" prefix={<UserOutlined />} style={{ marginBottom: "20px" }} />
                <Input
                    id='phone'
                    value={data.phone}
                    onChange={(e) => {
                        setData((prevState) => ({
                            ...prevState,
                            phone: e.target.value,
                        }));
                    }} size="large" type='tel' placeholder="Digite telefone" prefix={<PhoneOutlined />} style={{ marginBottom: "20px" }} />
                <Input
                    id='cpf'
                    value={data.cpf}
                    onChange={(e) => {
                        setData((prevState) => ({
                            ...prevState,
                            cpf: e.target.value,
                        }));
                    }} size="large" type='text' placeholder="Digite CPF" prefix={<FileDoneOutlined />} style={{ marginBottom: "20px" }} />
                <Input
                    id='address'
                    value={data.address}
                    onChange={(e) => {
                        setData((prevState) => ({
                            ...prevState,
                            address: e.target.value,
                        }));
                    }} size="large" type='text' placeholder="Digite o endereço" prefix={<HomeOutlined />} style={{ marginBottom: "20px" }} />
                <Input
                    id='email'
                    value={data.email}
                    onChange={(e) => {
                        setData((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                        }));
                    }} size="large" type='email' placeholder="Digite o E-mail" prefix={<MailOutlined />} style={{ marginBottom: "20px" }} />
                <Input
                    id='password'
                    value={data.password}
                    onChange={(e) => {
                        setData((prevState) => ({
                            ...prevState,
                            password: e.target.value,
                        }));
                    }} size="large" type='password' placeholder="Digite a senha" prefix={<KeyOutlined />} style={{ marginBottom: "20px" }} />
                <button className='button' onClick={(e) => { e.preventDefault(); operationFunction(data.cpf, data) }}>atualizacar</button>
            </form>
        </div>
    )
}