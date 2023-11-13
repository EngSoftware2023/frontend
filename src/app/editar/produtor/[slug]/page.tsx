'use client'
import FormSectionData from '@/components/elements/form_producer/form_section_data';
import { useParams } from 'next/navigation';



export default function Page() {
    const router = useParams()
    console.log(router.slug)
    return (
        <>
            <FormSectionData userId={router.slug as string} />
        </>
    )
}
