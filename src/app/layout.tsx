import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/components/lib/antd/antdRegistry";

export const metadata: Metadata = {
  title: "Engenharia de Software",
  description: "Projeto",
};

const font = Roboto({ subsets: ["latin"], weight: "400" });

export default function LayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={font.className} lang="pt-br">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
