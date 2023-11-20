import { postProducer, getProducers, updateProducers, getProducer } from "./endpoints/producer";
import { getOrders,updateOrders } from "./endpoints/order";


export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";
export const API_BASE_PUT = "http://hendrickscheifer.pythonanywhere.com";


const Api = {
  public: { postProducer, getProducers, updateProducers, getProducer,getOrders,updateOrders },
};

export default Api;
