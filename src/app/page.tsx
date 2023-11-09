import Link from "next/link";
import styles from "./page.module.scss";

export default function PageHome() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/cadastro/produtor" title="Dashboard Gerenciador">
            Cadastro Produtor
          </Link>
        </li>
        <li>
          <Link href="/visualizar/produtor" title="Dashboard Gerenciador">
            Vizualizar Produtor
          </Link>
        </li>
        <li>
          <Link href="/dashboard/gerenciador" title="Dashboard Gerenciador">
            Dashboard Gerenciador
          </Link>
        </li>
        <li>
          <Link href="/dashboard/nutricionista" title="Dashboard Gerenciador">
            Dashboard Nutricionista
          </Link>
        </li>
        <li>
          <Link href="/dashboard/produtor" title="Dashboard Gerenciador">
            Dashboard Produtor
          </Link>
        </li>
      </ul>
    </main>
  );
}
