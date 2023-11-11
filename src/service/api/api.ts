import { postProducer, getProducers,updateProducers,getProducer } from "./endpoints/producer";

export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";

const Api = {
  public: { postProducer, getProducers,updateProducers,getProducer },
};

export default Api;
