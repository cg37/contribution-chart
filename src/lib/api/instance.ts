import axios from "axios";

const instance = axios.create({
  timeout: 12000,
  baseURL: "",
  headers: {}
});

instance.interceptors.request.use((config) => config);

instance.interceptors.response.use(
  (response) => {
    //统一状态处理
    return Promise.resolve(response);
  },
  (err) => {
    Promise.reject(err);
  }
);

export default instance;
