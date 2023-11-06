export type ResponseGetAdressByCep = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: number;
  siafi: string;
};

async function getAdressByCep(cep: number) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok || data.erro) throw response.statusText;

  return data as ResponseGetAdressByCep;
}

const ApiCep = {
  public: { getAdressByCep },
};

export default ApiCep;
