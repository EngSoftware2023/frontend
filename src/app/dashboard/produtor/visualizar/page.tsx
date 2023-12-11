"use client";
import style from "./page.module.scss";
import { useEffect, useState } from "react";
import Auth, { Payload } from "@/service/auth/auth";
import StructContainer from "@/components/structs/container/container";

export default function UserProfilePage() {
  const [user, setUser] = useState<Payload | null>(null);

  useEffect(() => {
    const authData = Auth.getAuth();

    if (authData) {
      const userData = Auth.getDataFromToken(authData.access);
      setUser(userData);
    }
  }, []);

  return (
    <main>
      <section id={style.SectionProfile}>
        <StructContainer className={style.containerContent}>
          <h1>Detalhes do Usuário</h1>
          <p>
            <strong>Nome:</strong> {user?.name}
          </p>
          <p>
            <strong>CPF:</strong> {user?.cpf}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Telefone:</strong> {user?.phone}
          </p>
          <p>
            <strong>Endereço:</strong> {user?.address}
          </p>
        </StructContainer>
      </section>
    </main>
  );
}
