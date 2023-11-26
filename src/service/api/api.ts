import {
  postProducer,
  getProducers,
  updateProducers,
  getProducer,
} from "./endpoints/producer";
import { getProduction, postProduction } from "./endpoints/production";
import { postLogin } from "./endpoints/login";
import { getProducts } from "./endpoints/products";

export const API_BASE = "https://hendrickscheifer.pythonanywhere.com/api";
export const API_BASE_ROOT = "https://hendrickscheifer.pythonanywhere.com";
export const API_BASE_PUT = "https://hendrickscheifer.pythonanywhere.com";

const Api = {
  public: {
    postProducer,
    getProducers,
    updateProducers,
    getProducer,
    postProduction,
    postLogin,
    getProducts,
    getProduction,
  },
};

export default Api;
