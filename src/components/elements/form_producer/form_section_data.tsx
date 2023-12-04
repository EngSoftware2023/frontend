import { useState, useEffect } from "react";
import { IUsers } from "@/types/types";
import FormProducer from "./form_producer";
import style from "./form-register-producer.module.scss";
import StructContainer from "@/components/structs/container/container";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function FormSectionData() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const email = searchParams.get("email");
  const cpf = searchParams.get("cpf");
  const address = searchParams.get("address");
  const password = searchParams.get("password");

  const [user, setUser] = useState<IUsers>({
    name: "",
    phone: "",
    address: "",
    email: "",
    cpf: "",
    password: "",
  });

  useEffect(() => {
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Email:", email);
    console.log("CPF:", cpf);
    console.log("Address:", address);
    console.log("Password:", password);
    if (
      name != null &&
      phone != null &&
      address != null &&
      email != null &&
      cpf != null &&
      password != null
    ) {
      setUser({
        name: name,
        phone: phone,
        address: address,
        email: email,
        cpf: cpf,
        password: password,
      });
    }
    console.log(user);
  }, []);

  return (
    <StructContainer className={style.containerForms}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Atualização de cadastro</h2>
        <Link href={'/dashboard/gerenciador/listar-produtores'} style={{color:'red'}}>[x]</Link>
      </div>
      <hr className={style.divisor} />
      {user.name != "" ? <FormProducer user={user} /> : <></>}
    </StructContainer>
  );
}
