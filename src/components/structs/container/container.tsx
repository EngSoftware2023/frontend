import { ReactNode } from "react";
import style from "./container.module.scss";

export type DataStructContainer = {
  children: ReactNode;
  className?: string;
};

export default function StructContainer(data: DataStructContainer) {
  const { children, className } = data;

  return (
    <div className={style.StructContainer}>
      <div className={`${style.content} ${className}`}>{children}</div>
    </div>
  );
}
