import { postProducer, getProducers,getProduction } from "./endpoints/producer";

export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";

const Api = {
  public: { postProducer, getProducers,getProduction },
};

export default Api;
