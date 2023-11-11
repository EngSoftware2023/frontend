'use client'
import { IUsers } from "@/types/types";
import { useEffect, useState } from "react";
import Api from "@/service/api/api";
import FormProducer from "./form_producer";
import style from "./form-register-producer.module.scss";
import StructContainer from "@/components/structs/container/container";

export interface IProps {
    user: IUsers,
}

export default function FormSectionData({ user }: IProps) {
    const [submitStatus, setSubmitStatus] = useState<{
        text: string;
        loading: boolean;
        success: boolean;
        send: boolean;
    }>({
        loading: false,
        success: false,
        send: false,
        text: "",
    });

    const [data, setData] = useState({
        name: user.name,
        phone: user.phone,
        email: user.email,
        cpf: user.cpf,
        address: user.address,
        password: user.password
    });


    const incrementData = (dataForm: Partial<typeof data>) => {
        setData({ ...data, ...dataForm });
        console.log(dataForm)
    };


    const update = async (id: string) => {
        Api.public
            .updateProducers({
                name: data.name,
                phone: data.phone,
                address: data.address,
                email: data.email,
                cpf: data.cpf,
                password: data.password,
            })
            .then((response) => {
                console.log(response)
                setSubmitStatus({
                    loading: false,
                    send: true,
                    success: true,
                    text: "Atualizado com sucesso !",
                });
            })
            .catch((error) => {
                console.log(error)
                setSubmitStatus({
                    loading: false,
                    send: true,
                    success: false,
                    text: "Erro ao atualizar !",
                });
            });
    };



    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <StructContainer className={style.containerForms}>
            <h2>Atualização de cadastro</h2>
            <hr className={style.divisor} />
            <FormProducer user={user} />
        </StructContainer>
    )
}
