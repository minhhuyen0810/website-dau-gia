import axios from "axios";

const baseURL = "https://sirrista-api.herokuapp.com";

export default axios.create({
  baseURL: baseURL,
  responseType: "json",
});
