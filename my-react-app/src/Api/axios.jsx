import axios from "axios";

const axiosInstance = axios.create({
  //local instance of firebase function
  /* baseURL: "http://127.0.0.1:5001/fir-af6c5/us-central1/api", */


  //deploy version of amazon on render
  baseURL: "https://amazone-clone-3.onrender.com/",
});

export { axiosInstance };
