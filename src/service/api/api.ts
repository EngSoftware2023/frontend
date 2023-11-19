import { postProducer, getProducers,getProduct } from "./endpoints/producer";

export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";

const Api = {
  public: { postProducer, getProducers,getProduct },
};

export default Api;
