import { postProducer, getProducers, updateProducers, getProducer } from "./endpoints/producer";
import { getProductions, deteleProduction,postProduction } from "./endpoints/production";
import { postLogin } from "./endpoints/login";

export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";
export const API_BASE_PUT = "http://hendrickscheifer.pythonanywhere.com";

const Api = {
  public: {
    postProducer,
    getProducers,
    updateProducers,
    getProducer,
    postProduction,
    getProductions,
    deteleProduction,
    postLogin,
  },
};

export default Api;
