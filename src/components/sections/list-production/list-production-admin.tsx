'use client'
import { Button, Col, Modal, Row } from "antd";
import StructContainer from "@/components/structs/container/container";
import style from "./producer-list.module.scss";
import { ResponseGetProduction } from "@/service/api/endpoints/production";
import Link from "next/link";
import Api from "@/service/api/api";
import { useEffect, useState } from "react";
import Auth from "@/service/auth/auth";
import { useRouter } from "next/navigation";
export interface MyComponentProps {
    productions: ResponseGetProduction[];
}
export default function ListProduction({ productions }: MyComponentProps) {
    const router = useRouter();
    const [id, setId] = useState(0)
    const [filter, setFilter] = useState('');
    const [result, setResult] = useState<ResponseGetProduction[]>();
    function formatarData(dataString: string): string {
        const partes = dataString.split('-');
        const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        return dataFormatada;
    }

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    function DeleteProduction(id: number) {
        const auth = Auth.getAuthWithRedirect(router);
        const payload = Auth.getDataFromToken(auth.access);

        Api.public.deteleProduction(auth, { id })
    }

    function filterInput(e: string) {
        setResult(productions.filter((prod) => prod.producer.includes(e) || prod.product.includes(e)))
    }

    return (
        <>
            <section id={style.SectionProducerList}>
                <StructContainer>
                    <h1>Listagem das produções cadastradas</h1>
                    <hr />
                    <div style={{ display: "flex", flexDirection: "column", marginBottom: "30px" }}>
                        <label style={{ marginBottom: "8px" }} htmlFor="pesquisa">Pesquise pelo CPF do produtor ou produto:</label>
                        <input style={{ borderRadius: "5px", padding: "6px" }} placeholder="CPF do produtor ou nome do produto" type="text" name="pesquisa" id="pesquisa" onChange={(e) => { setFilter(e.target.value), filterInput(e.target.value) }} />
                    </div>
                    <Row gutter={[12, 15]}>
                        {
                            productions?.length != undefined ?
                                <>
                                    {
                                        <>
                                            {
                                                filter == "" ? productions.map(
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
                                                                    {/* <Col span={2} className={style.containerButton} onClick={() => { showModal(), setId(id) }}>

                                                                        <Button>Deletar</Button>
                                                                    </Col> */}
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    )
                                                ) :
                                                    <>
                                                        {
                                                            result!.length > 0 ? <>
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
                                                                                        {/* <Col span={2} className={style.containerButton} onClick={() => { setOpen(true) }}>

                                                                                            <Button>Deletar</Button>
                                                                                        </Col> */}
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
                                        </>
                                    }
                                </> : null
                        }
                    </Row>
                </StructContainer>
            </section>
            <Modal
                title="Atenção"
                open={open}
                onOk={() => { handleOk(), DeleteProduction(id) }}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Deseja deletar esta produção?</p>
            </Modal>
        </>
    )
}