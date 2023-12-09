import FormSectionData from '@/components/elements/form-edit-production/form-production-data-admin';
import Api from '@/service/api/api';
import { ResponseGetProducers } from '@/service/api/endpoints/producer';
import { ResponseGetProduct } from '@/service/api/endpoints/product';
import { IProduct } from '@/types/types';
import Link from 'next/link';

export default async function Page() {
    let producers: Array<ResponseGetProducers> = [];
    let products: Array<IProduct> = [];



    try {
        producers = await Api.public.getProducers();
        products = await Api.public.getProducts();
    } catch (e) {
    }
    return (
        <>
            <Link href={'/dashboard/gerenciador/listar-producoes'} style={{position:"absolute",right:'40px',top:'20px',color:'red'}}>[X]</Link>
            <FormSectionData producers={producers} products={products} />
        </>
    )
}
