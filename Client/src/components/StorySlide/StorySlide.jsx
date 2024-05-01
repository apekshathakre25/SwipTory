import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Slider from "../Slider/Slider";
import { getStoryById } from "../../API/Story";
import { swiptoryContext } from "../../Context/Context";

const Slide = ({ slides }) => {
  // const [searchParams] = useSearchParams();
  // const { id } = useParams();
  const { openedStoryId, setOpenedStorySlides, setIsSliderOpen } =
    useContext(swiptoryContext);
  // const [slideData, setSlideData] = useState(null);

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

  // if (!slideData) {
  //   return <> </>;
  // }

  return (
    <>
      {/* <h1>hello</h1> */}
      <Slider setIsSliderOpen={setIsSliderOpen} slides={slides} />
    </>
  );
};

export default Slide;
