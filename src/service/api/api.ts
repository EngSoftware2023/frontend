import {
  postProducer,
  getProducers,
  updateProducers,
  getProducer,
  deleteProducer
} from "./endpoints/producer";
import {
  postProduction,
  getProductions,
  deteleProduction,
} from "./endpoints/production";
import { postLogin } from "./endpoints/login";
import { getProducts } from "./endpoints/products";
import { postOrder, getOrders } from "./endpoints/order";

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
    getProductions,
    deteleProduction,
    postLogin,
    getProducts,
    deleteProducer
  },
  private: {
    postOrder,
    getOrders,
  },
};

export default Api;
