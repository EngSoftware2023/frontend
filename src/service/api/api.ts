import { postProducer, getProducers } from "./endpoints/producer";

export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";

const Api = {
  public: { postProducer, getProducers },
};

export default Api;
