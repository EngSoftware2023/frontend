import { postProducer } from "./endpoints/producer";

export const API_BASE = "http://hendrickscheifer.pythonanywhere.com/api";

const Api = {
  public: { postProducer },
};

export default Api;
