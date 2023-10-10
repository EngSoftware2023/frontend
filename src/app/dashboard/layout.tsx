import React from "react";

export type DataLayoutDashboard = {
  children: React.ReactNode;
};

export default function LayoutDashboard({ children }: DataLayoutDashboard) {
  return <main>{children}</main>;
}
