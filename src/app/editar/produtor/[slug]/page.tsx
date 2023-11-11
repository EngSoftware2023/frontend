import FormSectionData from '@/components/elements/form_producer/form_section_data';
import { IUsers } from '@/types/types';

const getPosts = async (id:string): Promise<IUsers[]> => {
    const data = await fetch(`http://hendrickscheifer.pythonanywhere.com/producer/`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

    });
    const posts = await data.json();
    return posts;
};

export default async function Page() {
    const posts:IUsers[] = await getPosts('1233');

    console.log(posts);
    return (
        <>
            <FormSectionData user={posts[0]} />
        </>
    )
}
