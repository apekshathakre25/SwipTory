import axios from "axios";
const backEndUrl = `http://localhost:4004/api/v1`;

export const createStory = async (requestPayload) => {
  try {
    const reqUrl = `${backEndUrl}/story/create`;
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. User is not authenticated.");
    }
    console.log("req", requestPayload);

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(reqUrl, requestPayload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating story:", error);
    throw error;
  }
};

export const getAllStoriesByCategory = async (category) => {
  try {
    const reqUrl = `${backEndUrl}/story/${category}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};

export const getAllStories = async () => {
  try {
    const reqUrl = `${backEndUrl}/story`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};

export const getStoryById = async (storyId) => {
  try {
    const response = `${backEndUrl}/story/getById/${storyId}`;
    const data = await axios.get(response);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateStory = async (id, slides) => {
  try {
    const reqUrl = `${backEndUrl}/story/edit/${id}`;
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. User is not authenticated.");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.put(reqUrl, { slides });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const likeStory = async ({ userId, storyId, slideId }) => {
  try {
    const reqUrl = `${backEndUrl}/story/like-story`;
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

export const removeLike = async ({ userId, storyId, slideId }) => {
  try {
    const reqUrl = `${backEndUrl}/story/remove-like`;
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
