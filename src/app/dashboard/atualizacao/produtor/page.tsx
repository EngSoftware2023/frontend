import FormSectionData from '@/components/elements/form_producer/form_section_data';
import { IUsers } from '@/types/types';

const getPosts = async (): Promise<IUsers[]> => {
    const data = await fetch("http://hendrickscheifer.pythonanywhere.com/producer/1233", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

    });
    const posts = await data.json();
    return posts;
};

export default async function Page() {
    const posts = await getPosts();
    console.log(posts);
    return (
        <>
            <FormSectionData user={posts[0]} />
        </>
    )
}
