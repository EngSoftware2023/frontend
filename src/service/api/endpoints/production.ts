import { API_BASE, API_BASE_PUT } from "../api";


export enum ResponsePostProducer {
    OK = 200,
    ERROR = 400,
}


export type ResponseGetProduction = {
    id: string,
    quantity: string,
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

export async function updateProduction(body: ResponseGetProduction) {
    const { producer, product, quantity, date, id } = body;
    const formData = new FormData();

    formData.append("product", product);
    formData.append("producer", producer);
    formData.append("quantity", quantity);
    formData.append("date", date);
    formData.append("id", id);

    const response = await fetch(`${API_BASE_PUT}/production/`, {
        method: "PUT",
        headers: {
            "User-Agent": "frontend",
        },
        body: formData,
        cache: "no-cache",
    });

    return response.json;
}