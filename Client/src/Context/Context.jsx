import React, { useState, createContext, useEffect } from "react";
import { getUserDetails } from "../API/User";
export const swiptoryContext = createContext();

const SwiptoryProvider = ({ children }) => {
  const [filter, setFilter] = useState("all");
  const [userDetails, setUserDetails] = useState();
  const [showAddStory, setShowAddStory] = useState(false);
  const [postClk, setPostClk] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openedStoryId, setOpenedStoryId] = useState();
  const [openedStorySlides, setOpenedStorySlides] = useState();
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [postData, setPostData] = useState({
    _id: "",
    slides: [
      {
        heading: "",
        description: "",
        image: "",
        category: "",
      },
      {
        heading: "",
        description: "",
        image: "",
        category: "",
      },
      {
        heading: "",
        description: "",
        image: "",
        category: "",
      },
    ],
  });

  const fetchDetails = async () => {
    const details = await getUserDetails();
    setUserDetails(details);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <swiptoryContext.Provider
      value={{
        filter,
        setFilter,
        userDetails,
        setUserDetails,
        fetchDetails,
        showAddStory,
        setShowAddStory,
        isUpdate,
        setIsUpdate,
        postData,
        setPostData,
        postClk,
        setPostClk,
        openedStoryId,
        setOpenedStoryId,
        openedStorySlides,
        setOpenedStorySlides,
        isSliderOpen,
        setIsSliderOpen,
      }}
    >
      {children}
    </swiptoryContext.Provider>
  );
};

export default SwiptoryProvider;
