import axios from "axios";
const backEndUrl = `http://localhost:4004/api/v1/auth`;

export const getUserDetails = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    const reqUrl = `http://localhost:4004/api/v1/auth/userDetails?userId=${userId}`;
    const response = await axios.get(reqUrl);
    const data = response.data;
    // console.log(data);
    return data; // Return the data fetched from the server
  } catch (error) {
    throw error;
  }
};

export const addStoryToBookmarks = async ({ userId, storyId, slideId }) => {
  try {
    const reqUrl = `${backEndUrl}/bookmark`;
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. User is not authenticated.");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(reqUrl, { userId, storyId, slideId });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromBookmarks = async ({ userId, storyId, slideId }) => {
  try {
    const reqUrl = `${backEndUrl}/remove-bookmark`;
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. User is not authenticated.");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(reqUrl, { userId, storyId, slideId });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
