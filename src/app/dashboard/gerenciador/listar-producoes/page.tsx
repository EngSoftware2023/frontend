import ListProduction from "@/components/sections/list-production/list-production";
import style from "./producer-list.module.scss";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";
import { ResponseGetProduction } from "@/service/api/endpoints/production";
import { Button, Col, Row } from "antd";
import Link from "next/link";


export default async function Page() {
  let productions: Array<ResponseGetProduction> = [];


  try {
    productions = await Api.public.getProductions();
  } catch (e) {
    console.log(e);
  }

  return (
    <main>
      <ListProduction productions={productions}/>
    </main>
  );
}
