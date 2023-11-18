import { API_BASE, API_BASE_PUT } from "../api";


export enum ResponsePostProducer {
    OK = 200,
    ERROR = 400,
}


export type ResponseGetProduct = {
    stock: string,
    name: string,
    request: string,
};


export async function getProducts() {
    const response = await fetch(`${API_BASE_PUT}/product/`, {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    });
    return (await response.json()) as Array<ResponseGetProduct>;
}