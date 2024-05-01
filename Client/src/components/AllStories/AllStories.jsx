import React, { useState, useEffect, useContext } from "react";
import { getAllStories } from "../../API/Story";
import styles from "./AllStories.module.css";
import { swiptoryContext } from "../../Context/Context";
import YourStories from "../YourStories/YourStories";
import { useToast } from "@chakra-ui/react";

const AllStories = ({ handleStoryViewer }) => {
  const toast = useToast();
  const [error, setError] = useState(null);
  const [foodFilter, setFoodFilter] = useState([]);
  const [healthFilter, setHealthFilter] = useState([]);
  const [travelFilter, setTravelFilter] = useState([]);
  const [movieFilter, setMovieFilter] = useState([]);
  const [educationFilter, setEducationFilter] = useState([]);
  const [showAllFoodSlides, setShowAllFoodSlides] = useState(false);
  const [showAllHealthSlides, setShowAllHealthSlides] = useState(false);
  const [showAllTravelSlides, setShowAllTravelSlides] = useState(false);
  const [showAllMovieSlides, setShowAllMovieSlides] = useState(false);
  const [showAllEducationSlides, setShowAllEducationSlides] = useState(false);
  const {
    filter,
    setFilter,
    postClk,
    setPostClk,
    setOpenedStoryId,
    setOpenedStorySlides,
    isSliderOpen,
    setIsSliderOpen,
  } = useContext(swiptoryContext);

  const loadMoreFoodSlides = () => {
    setShowAllFoodSlides(true);
  };

  const loadMoreHealthSlides = () => {
    setShowAllHealthSlides(true);
  };

  const loadMoreTravelSlides = () => {
    setShowAllTravelSlides(true);
  };

  const loadMoreMovieSlides = () => {
    setShowAllMovieSlides(true);
  };

  const loadMoreEducationSlides = () => {
    setShowAllEducationSlides(true);
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getAllStories();
        console.log(data);
        setFoodFilter([]);
        setHealthFilter([]);
        setTravelFilter([]);
        setEducationFilter([]);
        setMovieFilter([]);

        data.stories.forEach((story) => {
          switch (story.slides[0]?.category) {
            case "Food":
              setFoodFilter((prevState) => [...prevState, story]);
              break;
            case "Health":
              setHealthFilter((prevState) => [...prevState, story]);
              break;
            case "Travel":
              setTravelFilter((prevState) => [...prevState, story]);
              break;
            case "Movie":
              setMovieFilter((prevState) => [...prevState, story]);
              break;
            case "Education":
              setEducationFilter((prevState) => [...prevState, story]);
              break;
            default:
              break;
          }
        });
      } catch (error) {
        setError(error.message || "An error occurred while fetching stories.");
      }
    };

    fetchStories();
  }, [postClk]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleStoryClick = (id, slides) => {
    if (localStorage.getItem("userId")) {
      setOpenedStoryId(id);
      setIsSliderOpen(true);
      setOpenedStorySlides(slides);
      handleStoryViewer(slides);
    } else {
      toast({
        title: "Sign in to view stories",
        status: "error",
        duration: "4000",
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      {/* Food-Filter */}
      {localStorage.getItem("userId") && (
        <YourStories
          isSliderOpen={isSliderOpen}
          setIsSliderOpen={setIsSliderOpen}
          handleStoryViewer={handleStoryViewer}
        />
      )}
      {(filter == "all" || filter == "food") && (
        <div className={styles.Category_container}>
          <div className={styles.category_Header}>Top Stories About Food</div>
          <div className={styles.Category_section}>
            {foodFilter &&
              foodFilter
                .filter((slide) => slide.slides.length > 0)
                .slice(0, showAllFoodSlides ? foodFilter.length : 4)
                .map((slide, index) => (
                  <div
                    onClick={() => handleStoryClick(slide._id, slide.slides)}
                    className={styles.story_wrapper}
                    key={index}>
                    <div
                      className={styles.categoryStory}
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url("${slide.slides[0].image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}>
                      <div className={styles.slide_heading}>
                        {slide.slides[0].heading}
                      </div>
                      <div className={styles.slide_desc}>
                        {slide.slides[0].description}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {!showAllFoodSlides && (
            <button
              onClick={loadMoreFoodSlides}
              className={styles.see_more_btn}>
              See more
            </button>
          )}
        </div>
      )}
      {/* Health Filter */}
      {(filter == "all" || filter == "health") && (
        <div className={styles.Category_container}>
          <div className={styles.category_Header}>Top Stories About Health</div>
          <div className={styles.Category_section}>
            {healthFilter &&
              healthFilter
                .filter((slide) => slide.slides.length > 0)
                .slice(0, showAllHealthSlides ? healthFilter.length : 4)
                .map((slide, index) => (
                  <div
                    onClick={() => handleStoryClick(slide._id, slide.slides)}
                    className={styles.story_wrapper}
                    key={index}>
                    <div
                      className={styles.categoryStory}
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url("${slide.slides[0].image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}>
                      <div className={styles.slide_heading}>
                        {slide.slides[0].heading}
                      </div>
                      <div className={styles.slide_desc}>
                        {slide.slides[0].description}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {!showAllHealthSlides && (
            <button
              onClick={loadMoreHealthSlides}
              className={styles.see_more_btn}>
              See more
            </button>
          )}
        </div>
      )}

      {/* Travel Filter */}
      {(filter == "all" || filter == "travel") && (
        <div className={styles.Category_container}>
          <div className={styles.category_Header}>Top Stories About Travel</div>
          <div className={styles.Category_section}>
            {travelFilter &&
              travelFilter
                .filter((slide) => slide.slides.length > 0)
                .slice(0, showAllTravelSlides ? travelFilter.length : 4)
                .map((slide, index) => (
                  <div
                    onClick={() => handleStoryClick(slide._id, slide.slides)}
                    className={styles.story_wrapper}
                    key={index}>
                    <div
                      className={styles.categoryStory}
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url("${slide.slides[0].image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}>
                      <div className={styles.slide_heading}>
                        {slide.slides[0].heading}
                      </div>
                      <div className={styles.slide_desc}>
                        {slide.slides[0].description}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {!showAllTravelSlides && (
            <button
              onClick={loadMoreTravelSlides}
              className={styles.see_more_btn}>
              See more
            </button>
          )}
        </div>
      )}
      {/* Movie Filter */}
      {(filter == "all" || filter == "movie") && (
        <div className={styles.Category_container}>
          <div className={styles.category_Header}>Top Stories About Movie</div>
          <div className={styles.Category_section}>
            {movieFilter &&
              movieFilter
                .filter((slide) => slide.slides.length > 0)
                .slice(0, showAllMovieSlides ? movieFilter.length : 4)
                .map((slide, index) => (
                  <div
                    onClick={() => handleStoryClick(slide._id, slide.slides)}
                    className={styles.story_wrapper}
                    key={index}>
                    <div
                      className={styles.categoryStory}
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url("${slide.slides[0].image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}>
                      <div className={styles.slide_heading}>
                        {slide.slides[0].heading}
                      </div>
                      <div className={styles.slide_desc}>
                        {slide.slides[0].description}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {!showAllMovieSlides && (
            <button
              onClick={loadMoreMovieSlides}
              className={styles.see_more_btn}>
              See more
            </button>
          )}
        </div>
      )}

      {/* Education filter */}
      {(filter == "all" || filter == "education") && (
        <div className={styles.Category_container}>
          <div className={styles.category_Header}>
            Top Stories About Education
          </div>
          <div className={styles.Category_section}>
            {educationFilter &&
              educationFilter
                .filter((slide) => slide.slides.length > 0)
                .slice(0, showAllEducationSlides ? educationFilter.length : 4)
                .map((slide, index) => (
                  <div
                    onClick={() => handleStoryClick(slide._id, slide.slides)}
                    className={styles.story_wrapper}
                    key={index}>
                    <div
                      className={styles.categoryStory}
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)), url("${slide.slides[0].image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}>
                      <div className={styles.slide_heading}>
                        {slide.slides[0].heading}
                      </div>
                      <div className={styles.slide_desc}>
                        {slide.slides[0].description}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {!showAllEducationSlides && (
            <button
              onClick={loadMoreEducationSlides}
              className={styles.see_more_btn}>
              See more
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default AllStories;
