import axios from "axios";
import store from "storejs";

axios.interceptors.request.use((config) => {
  const token = store.get("token");
  config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

export default axios;
