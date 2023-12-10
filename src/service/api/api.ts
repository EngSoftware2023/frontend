import {
  postProducer,
  getProducers,
  updateProducers,
  getProducer,
  deleteProducer,
} from "./endpoints/producer";
import {
  postProduction,
  getProductions,
  deteleProduction,
  updateProduction,
} from "./endpoints/production";
import { postLogin } from "./endpoints/login";
import { getProducts, postProduct } from "./endpoints/product";

import {
  postOrder,
  getOrders,
  updateOrders,
  deleteOrder,
} from "./endpoints/order";

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
    updateProduction,
    getOrders,
    updateOrders,
    deleteOrder,
    deleteProducer,
    postProduct,
  },
  private: {
    postOrder,
    getOrders,
  },
};

export default Api;
