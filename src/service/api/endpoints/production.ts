import { API_BASE, API_BASE_PUT } from "../api";


export enum ResponsePostProducer {
    OK = 200,
    ERROR = 400,
}


export type ResponseGetProduction = {
    id: number,
    quantity: number,
    date: string,
    producer: string,
    product: string
};


export async function getProductions() {
    const response = await fetch(`${API_BASE_PUT}/production/`, {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    });
    return (await response.json()) as Array<ResponseGetProduction>;
}

export async function deteleProduction(id: number) {
    const response = await fetch(`${API_BASE_PUT}/production/${id}`, {
        method: "DELETE",
        cache: "no-cache",
        mode: "no-cors",
        headers: {
            "User-Agent": "frontend",
        },
        redirect: 'follow'
    });
}
