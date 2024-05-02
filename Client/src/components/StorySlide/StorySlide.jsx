import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Slider from "../Slider/Slider";
import { getStoryById } from "../../API/Story";
import { swiptoryContext } from "../../Context/Context";

const Slide = ({ slides }) => {
  const { openedStoryId, setOpenedStorySlides, setIsSliderOpen } =
    useContext(swiptoryContext);

  useEffect(() => {
    async function fetchSlide() {
      try {
        const response = await getStoryById(openedStoryId);
        console.log(response);
        setOpenedStorySlides(response.data.story.slides);
      } catch (error) {
        console.error("Error while fetching slide:", error);
      }
    }

    fetchSlide();
  }, []);

  return (
    <>
      <Slider setIsSliderOpen={setIsSliderOpen} slides={slides} />
    </>
  );
};

export default Slide;
