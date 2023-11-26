import SectionAddProduction from "@/components/sections/add-production/add-production";
import SectionListProduction from "@/components/sections/list-production/list-production";
import Api from "@/service/api/api";
import { ResponseGetProduction } from "@/service/api/endpoints/production";

export default async function PageProduction() {
  let productions: Array<ResponseGetProduction> = [];

  try {
    productions = await Api.public.getProductions();
  } catch (e) {
    console.log(e);
  }

  return (
    <main>
      <SectionAddProduction />
      <SectionListProduction productions={productions} />
    </main>
  );
}