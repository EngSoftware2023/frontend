import {
  postProducer,
  getProducers,
  updateProducers,
  getProducer,
} from "./endpoints/producer";
import { postProduction, getProductions, deteleProduction, updateProduction } from "./endpoints/production";
import { postLogin } from "./endpoints/login";
import { getProducts } from "./endpoints/product";


export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";
export const API_BASE_PUT = "http://hendrickscheifer.pythonanywhere.com";

const Api = {

  public: {
    postProducer,
    getProducers,
    updateProducers,
    getProducer,
    postProduction,
    postLogin,
    getProductions, 
    deteleProduction,
     updateProduction,
      getProducts
  },
};

export default Api;
