import { postProducer, getProducers, updateProducers, getProducer } from "./endpoints/producer";
import { getProductions, deteleProduction } from "./endpoints/production";


export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";
export const API_BASE_PUT = "http://hendrickscheifer.pythonanywhere.com";


const Api = {
  public: { postProducer, getProducers, updateProducers, getProducer, getProductions, deteleProduction },
};

export default Api;
