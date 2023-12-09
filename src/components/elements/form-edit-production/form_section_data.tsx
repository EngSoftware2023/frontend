'use client'
import { useState, useEffect } from 'react';
import { IProduct, IProduction, IUsers } from "@/types/types";
import FormProduction from "./form_production_producer";
import style from "./form-register-producer.module.scss";
import StructContainer from "@/components/structs/container/container";
import { useSearchParams } from 'next/navigation';

export interface IProps {
    producers: IUsers[];
    products: IProduct[];
}

export default function FormSectionData({ producers,products }: IProps) {
    const searchParams = useSearchParams()
    const producer = searchParams.get('producer');
    const product = searchParams.get('product');
    const quantity = searchParams.get('quantity');
    const date = searchParams.get('date');
    const id = searchParams.get('id');




    const [production, setProduction] = useState<IProduction>({
        producer: '',
        product: '',
        quantity: '',
        date: '',
        id: '',
    });

    useEffect(() => {
        if (product != null && producer != null && quantity != null && id != null && date != null) {
            setProduction({
                product: product,
                producer: producer,
                quantity: quantity,
                date: date,
                id: id,
            })
        }
    }, [])


    return (
        <StructContainer className={style.containerForms}>
            <h2>Atualização de cadastro</h2>
            <hr className={style.divisor} />
            {
                production.id != '' ? <FormProduction production={production} producers={producers} products={products} /> : <></>
            }

        </StructContainer>
    )
}
