"use client";

import style from "./menu.module.scss";
import React, { ReactNode, useState } from "react";
import Link from "next/link";

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
        {/* <div className={style.footer}></div> */}
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}
