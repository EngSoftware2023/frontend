'use client'
import { IUsers } from "@/types/types";
import { useEffect, useState } from "react";
import { FormProducer } from "./form_producer";

export interface IProps {
    user: IUsers | null,
}

export default function FormSectionData({ user }: IProps) {
    const [data, setData] = useState({
        name: user?.name,
        phone: user?.phone,
        email: user?.email,
        cpf: user?.cpf,
        address: user?.address,
        password: user?.password
    });


    const incrementData = (dataForm: Partial<typeof data>) => {
        setData({ ...data, ...dataForm });
        console.log(dataForm)
    };


    const update = async (id: string, novosDados: Partial<IUsers>) => {
        console.log(novosDados, 'DAAAAADOS')
        try {
            // Substitua 'id' pelo identificador do recurso que você deseja atualizar
            const url = `http://hendrickscheifer.pythonanywhere.com/api/producer/`;

            const data = await fetch(url, {
                method: "PUT", // Alterado para PUT para indicar uma operação de atualização
                headers: {
                    "Content-Type": "application/json",
                    mode: 'no-cors',
                },
                body: JSON.stringify(novosDados), // Enviando os novos dados no corpo da requisição
            });

            if (!data.ok) {
                throw new Error(`Erro ao realizar a requisição: ${data.statusText}`);
            }

            const resposta = await data.json();
            console.log("Recurso atualizado com sucesso:", resposta);
        } catch (erro) {
            console.error("Erro ao atualizar o recurso:", erro);
        }


    };



    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section>
            <FormProducer user={user} operationFunction={update} updateData={incrementData} />
        </section>
    )
}
