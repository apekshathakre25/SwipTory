import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "./Banner/Banner";
import styles from "./Home.module.css";
import AllStories from "../components/AllStories/AllStories";
import SwiptoryProvider, { swiptoryContext } from "../Context/Context";
import Slide from "../components/StorySlide/StorySlide";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  // const { isSliderOpen } = useContext(swiptoryContext);
  const [slides, setSlides] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const { isSliderOpen } = useContext(swiptoryContext);

  const queryParams = new URLSearchParams(location.search);

  const displayParamMappings = {
    viewstory: queryParams.get("viewstory"),
  };

  const handleStoryViewer = (slides) => {
    setSlides(slides);
    navigate("/?viewstory=true");
  };

  return (
    <>
      <div className={styles.home_container}>
        <Navbar />
        <Banner />
        <AllStories handleStoryViewer={handleStoryViewer} />
      </div>
      {isSliderOpen && <Slide slides={slides} />}
      {/* {displayParamMappings.viewstory && <Slide slides={slides} />} */}
    </>
  );
};

export default Home;
