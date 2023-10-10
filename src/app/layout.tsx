import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engenharia de Software",
  description: "Projeto",
};

export default function LayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
