import axios from "axios";

const getAPI = () => {
  console.log("hi");
  console.log(import.meta.env.VITE_RF_API_BASE_URL);
  return import.meta.env.VITE_RF_API_BASE_URL;
};

export default axios.create({
  baseURL: getAPI(),
  params: {},
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
