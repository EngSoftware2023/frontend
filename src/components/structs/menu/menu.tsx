"use client";

import style from "./menu.module.scss";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Auth, { Payload } from "@/service/auth/auth";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

export type TypeOption = {
  name: string;
  link: string;
  icon: JSX.Element;
};

export type DataStructMenu = {
  children: React.ReactNode;
  options?: Array<TypeOption>;
};

export default function StructMenu({ children, options }: DataStructMenu) {
  const router = useRouter();
  const [userData, setUserData] = useState<Payload>();

  useEffect(() => {
    const authTokens = Auth.getAuthWithRedirect(router);
    setUserData(Auth.getDataFromToken(authTokens.access));
  }, []);

  return (
    <div id={style.LayoutStructMenu}>
      <div className={style.menu}>
        {/* <div className={style.header}></div> */}
        <div className={style.body}>
          {options?.map(({ name, icon, link }, index) => {
            const newIcon = React.cloneElement(icon, {
              className: `${icon.props.className} ${style.icon}`,
            });
            return (
              <Link
                className={style.option}
                key={index}
                title={name}
                href={link}
              >
                {newIcon}
                <span className={style.text}>{name}</span>
              </Link>
            );
          })}
        </div>
        <div className={style.footer}>
          <div className={style.userCard}>
            <div className={style.userIcon}>{userData?.name.at(0)}</div>
            <p className={style.userName}>{userData?.name}</p>
            <Button
              danger
              className={style.buttonLogout}
              icon={<LogoutOutlined className={style.icon} />}
              onClick={() => {
                Auth.removeAuthWithRedirect(router);
              }}
            />
          </div>
        </div>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}
