'use client'
import { Button, Col, Row } from "antd";
import StructContainer from "@/components/structs/container/container";
import style from "./producer-list.module.scss";
import { ResponseGetProduction } from "@/service/api/endpoints/production";
import Link from "next/link";
import Api from "@/service/api/api";
export interface MyComponentProps {
    productions: ResponseGetProduction[];
}
export default function ListProduction({ productions }: MyComponentProps) {

    function formatarData(dataString: string): string {
        // Dividir a string da data
        const partes = dataString.split('-');

        // Reorganizar as partes no formato desejado
        const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

        return dataFormatada;
    }

    function DeleteProduction(id: number) {
        Api.public.deteleProduction(id)
    }

    return (
        <>
            <section id={style.SectionProducerList}>
                <StructContainer>
                    <h1>Listagem das produções cadastradas</h1>
                    <hr />
                    <Row gutter={[12, 15]}>
                        {
                            productions.length > 0 ?
                                <>
                                    {
                                        productions.map(
                                            (
                                                { id, quantity, date, producer, product },
                                                index
                                            ) => (
                                                <Col key={index} span={24}>
                                                    <div className={style.cardProducer}>
                                                        <Row>
                                                            <Col span={20}>
                                                                <p>
                                                                    <strong>Produtor: </strong>
                                                                    {producer}
                                                                </p>
                                                                <p>
                                                                    <strong>Produto: </strong>
                                                                    {product}
                                                                </p>
                                                                <p>
                                                                    <strong>Quantidade: </strong>
                                                                    {quantity}
                                                                </p>
                                                                <p>
                                                                    <strong>Data da Produção: </strong>
                                                                    {formatarData(date)}
                                                                </p>
                                                            </Col>
                                                            <Col span={2} className={style.containerButton}>
                                                                <Link
                                                                    href={`/dashboard/gerenciador/editar-producao?id=${id}&quantity=${quantity}&date=${date}&producer=${producer}&product=${product}`}
                                                                    title={`Editar`}
                                                                >
                                                                    <Button>Editar</Button>
                                                                </Link>
                                                            </Col>
                                                            <Col span={2} className={style.containerButton} onClick={() => { DeleteProduction(id) }}>

                                                                <Button>Deletar</Button>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            )
                                        )
                                    }
                                </> : null
                        }
                    </Row>
                </StructContainer>
            </section>
        </>
    )
}
