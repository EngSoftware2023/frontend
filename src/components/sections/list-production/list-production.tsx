'use client'
import { Button, Col, Row } from "antd";
import StructContainer from "@/components/structs/container/container";
import style from "./producer-list.module.scss";
import { ResponseGetProduction } from "@/service/api/endpoints/production";
import Link from "next/link";
import Api from "@/service/api/api";
import { useEffect, useState } from "react";
import Auth from "@/service/auth/auth";
export interface MyComponentProps {
    productions: ResponseGetProduction[];
}
export default function ListProduction({ productions }: MyComponentProps) {
    const [filter, setFilter] = useState('');
    let token = Auth.getAuth();
    const [result, setResult] = useState<ResponseGetProduction[]>();
    const [resultFilter, setResultFilter] = useState<ResponseGetProduction[]>();
    function formatarData(dataString: string): string {
        const partes = dataString.split('-');
        const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

        return dataFormatada;
    }
    function filterInput(e: string) {
        setResult(productions.filter((prod) => prod.product.includes(e)))
    }


    function DeleteProduction(id: number) {
        Api.public.deteleProduction(id)
    }

    useEffect(() => {

        if (document) {
            const producer = Auth.getDataFromToken(token!.access).cpf;
            setResult(productions.filter((prod) => prod.producer == producer))
        }
    }, [])

    return (
        <>
            <section id={style.SectionProducerList}>
                <StructContainer>
                    <h1>Listagem das produções cadastradas</h1>
                    <hr />
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "30px" }}>
                        <label style={{ marginBottom: "8px" }} htmlFor="pesquisa">Pesquise pelo produto da produção:</label>
                        <input style={{ borderRadius: "5px", padding: "6px" }} placeholder="produto da produção" type="text" name="pesquisa" id="pesquisa" onChange={(e) => { setFilter(e.target.value), filterInput(e.target.value) }} />
                    </div>
                    <Row gutter={[12, 15]}>
                        {
                            result?.length != undefined && filter == '' ?
                                <>
                                    {
                                        result.map(
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
                                </> : <>
                                    {
                                        result?.length != undefined ? <>
                                            {
                                                result?.map(
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
                                        </> : <>
                                            <h2 style={{ color: "red" }}>Nenhum produtor ou produto encontrado!</h2>
                                        </>
                                    }
                                </>
                        }
                    </Row>
                </StructContainer>
            </section>
        </>
    )
}