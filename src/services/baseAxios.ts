import axios from "axios";

const baseAxios = axios.create({
  baseURL: "https://mock.arianalabs.io/api",
});

export default baseAxios;
