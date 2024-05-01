import axios from "axios";
const backEndUrl = `http://localhost:4004/api/v1`;
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginUser = async (username, password) => {
  try {
    const reqUrl = `${backEndUrl}/auth/login`;
    const response = await axios.post(reqUrl, { username, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerUser = async ({ username, password }) => {
  try {
    const reqUrl = `${backEndUrl}/auth/register`;
    const response = await axios.post(reqUrl, { username, password });
    console.log(response.data);
    toast.success("Register Successful", {
      position: "bottom-left",
      autoClose: 2000,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
