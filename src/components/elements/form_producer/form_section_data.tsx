import { IUsers } from "@/types/types";
import FormProducer from "./form_producer";
import style from "./form-register-producer.module.scss";
import StructContainer from "@/components/structs/container/container";
import Api from "@/service/api/api";

export interface IProps {
    userId: string
}

const getPosts = async (id: string): Promise<IUsers[]> => {
    const posts = await Api.public.getProducers();
    return posts;
};
export default async function FormSectionData({ userId }: IProps) {
    const users: IUsers[] = await getPosts('1233');
    let userSelected: IUsers = {
        name: '',
        phone: '',
        address: '',
        email: '',
        cpf: '',
        password: '',
    };
     users.map((user) => {
        console.log(user,userId)
        if (user.cpf == userId) {
            userSelected = user;
        }
    })

    return (
        <StructContainer className={style.containerForms}>
            <h2>Atualização de cadastro</h2>
            <hr className={style.divisor} />
            <FormProducer user={userSelected} />
        </StructContainer>
    )
}
