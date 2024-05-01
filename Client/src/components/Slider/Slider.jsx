import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Slider.module.css";
import crossIcon from "../../assets/crossIcon.png";
import shareIcon from "../../assets/shareIcon.png";
import bookmarkIcon from "../../assets/bookmarkIcon.png";
import blueBookmarkIcon from "../../assets/blueBookmarkIcon.png";
import likeIcon from "../../assets/likeIcon.png";
import redLikeIcon from "../../assets/redLikeIcon.png";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";
import { swiptoryContext } from "../../Context/Context";
import { addStoryToBookmarks, removeFromBookmarks } from "../../API/User";
import { likeStory, removeLike } from "../../API/Story";

const Slider = (props) => {
  const navigate = useNavigate();
  const slideDuration = 4000;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const {
    openedStorySlides,
    setOpenedStorySlides,
    userDetails,
    setUserDetails,
    openedStoryId,
    fetchDetails,
    setIsSliderOpen,
  } = useContext(swiptoryContext);
  let slides = openedStorySlides;

  const [bookmarkStatus, setBookmarkStatus] = useState(
    slides?.map(() => {
      return false;
    })
  );

  const [likeStatus, setLikeStatus] = useState(
    slides?.map((slide) => slide?.likes?.includes(userDetails?._id))
  );

  const fetchBookmarkStatus = async () => {
    if (slides && bookmarkStatus) {
      await fetchDetails();

      userDetails.bookmarkedStories.forEach((bookmark) => {
        bookmark.slideId.forEach((id) => {
          if (slides[currentSlideIndex]?._id === id) {
            const newBookmarkStatus = [...bookmarkStatus];
            newBookmarkStatus[currentSlideIndex] = true;
            setBookmarkStatus(newBookmarkStatus);
          }
        });
      });
    }
  };

  useEffect(() => {
    const fetchLikeStatus = () => {
      if (slides && likeStatus) {
        const updatedStatus = slides[currentSlideIndex]?.likes?.includes(
          userDetails?._id
        );
        const newLikeStatus = [...likeStatus];
        newLikeStatus[currentSlideIndex] = updatedStatus;
        setLikeStatus(newLikeStatus);
      }
    };

    const fetchLikeCount = () => {
      if (slides && likeCount) {
        const updatedCount = slides[currentSlideIndex]?.likes?.length;
        const newLikeCount = [...likeCount];
        newLikeCount[currentSlideIndex] = updatedCount;
        setLikeCount(newLikeCount);
      }
    };

    fetchBookmarkStatus();
    fetchLikeStatus();
    fetchLikeCount();
  }, [currentSlideIndex, bookmarkStatus, slides]);

  const [likeCount, setLikeCount] = useState(
    slides?.map((slide) => slide?.likes?.length)
  );

  const handleNextSlide = () => {
    if (currentSlideIndex < slides?.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, slideDuration);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlideIndex]);

  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleBookmark = async (slideIndex) => {
    try {
      const argument = {
        userId: userDetails?._id,
        storyId: openedStoryId,
        slideId: slides[slideIndex]?._id,
      };

      // console.log(argument);

      if (!bookmarkStatus[slideIndex]) {
        const response = await addStoryToBookmarks(argument);
        // fetchBookmarkStatus();
        // const newBookmarkStatus = [...bookmarkStatus];
        // newBookmarkStatus[slideIndex] = true;
        // setBookmarkStatus(newBookmarkStatus);
        // console.log("hello");
        setUserDetails(response);
        response.bookmarkedStories.forEach((bookmark) => {
          bookmark.slideId.forEach((id) => {
            if (slides[slideIndex]?._id === id) {
              const newBookmarkStatus = [...bookmarkStatus];
              newBookmarkStatus[slideIndex] = true;
              setBookmarkStatus(newBookmarkStatus);
            }
          });
        });
      } else if (bookmarkStatus[slideIndex]) {
        const response = await removeFromBookmarks(argument);
        // fetchBookmarkStatus();
        // const newBookmarkStatus = [...bookmarkStatus];
        // newBookmarkStatus[slideIndex] = false;
        // setBookmarkStatus(newBookmarkStatus);
        setUserDetails(response);
        response.bookmarkedStories.forEach((bookmark) => {
          bookmark.slideId.forEach((id) => {
            if (slides[slideIndex]?._id === id) {
              const newBookmarkStatus = [...bookmarkStatus];
              newBookmarkStatus[slideIndex] = true;
              setBookmarkStatus(newBookmarkStatus);
            }
          });
        });
      }
    } catch (error) {
      console.error("Error while performing bookmark action:", error);
    }
  };

  const handleLike = async (slideIndex) => {
    try {
      const argument = {
        userId: userDetails?._id,
        storyId: openedStoryId,
        slideId: slides[slideIndex]?._id,
      };

      let response;

      if (!likeStatus[slideIndex]) {
        response = await likeStory(argument);
        setOpenedStorySlides(response.slides);
        const updatedStatus = response?.slides[slideIndex]?.likes?.includes(
          userDetails?._id
        );
        const newLikeStatus = [...likeStatus];
        newLikeStatus[slideIndex] = updatedStatus;
        setLikeStatus(newLikeStatus);
      } else if (likeStatus[slideIndex]) {
        response = await removeLike(argument);
        setOpenedStorySlides(response.slides);
        const updatedStatus = response?.slides[slideIndex]?.likes?.includes(
          userDetails?._id
        );
        const newLikeStatus = [...likeStatus];
        newLikeStatus[slideIndex] = updatedStatus;
        setLikeStatus(newLikeStatus);
      }

      const updatedCount = response?.slides[slideIndex]?.likes?.length;
      const newLikeCount = [...likeCount];
      newLikeCount[slideIndex] = updatedCount;
      setLikeCount(newLikeCount);
    } catch (error) {
      console.error("Error while performing like action:", error);
    }
  };

  const handleContainerClick = (event) => {
    const containerWidth = event.currentTarget.offsetWidth;
    const clickX = event.nativeEvent.offsetX;
    const clickY = event.nativeEvent.offsetY;
    const clickPercentage = (clickX / containerWidth) * 100;

    if (clickY >= 75 && clickY <= 550) {
      if (clickPercentage <= 50) {
        handlePreviousSlide();
      } else {
        handleNextSlide();
      }
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.storyViewerContainer}>
        {!props.isMobile && (
          <img
            onClick={handlePreviousSlide}
            src={leftArrow}
            alt="left arrow"
            className={styles.leftArrow}
          />
        )}
        <div className={styles.storyViewer}>
          <div className={styles.progressBarContainer}>
            {slides?.map((slide, index) => {
              const isCompleted = index <= currentSlideIndex;
              const isActive = index === currentSlideIndex;
              return (
                <div
                  key={index}
                  className={`${styles.progressBar} ${
                    isCompleted ? styles.progressBarCompleted : ""
                  } ${isActive ? styles.progressBarActive : ""}`}></div>
              );
            })}
          </div>
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0 ), rgba(0, 0, 0,  0.8)), linear-gradient(rgba(0, 0, 0, 0.2 ), rgba(0, 0, 0,   0)) , url(${
                slides ? slides[currentSlideIndex]?.image : ""
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={(event) => handleContainerClick(event)}
            className={styles.categoryStory}>
            <div className={styles.categoryStoryHeader}>
              {slides ? slides[currentSlideIndex]?.heading : ""}
            </div>
            <div className={styles.categoryStoryDescription}>
              {slides ? slides[currentSlideIndex]?.description : ""}
            </div>
          </div>

          <img
            onClick={() => {
              setIsSliderOpen(false);
            }}
            src={crossIcon}
            alt="cross icon"
            className={styles.crossIcon}
          />
          <img src={shareIcon} alt="share icon" className={styles.shareIcon} />
          {bookmarkStatus ? (
            <img
              onClick={() => handleBookmark(currentSlideIndex)}
              src={
                bookmarkStatus[currentSlideIndex]
                  ? blueBookmarkIcon
                  : bookmarkIcon
              }
              alt="bookmark icon"
              className={styles.bookmarkIcon}
            />
          ) : (
            <img
              onClick={() => handleBookmark(currentSlideIndex)}
              src={bookmarkIcon}
              alt="bookmark icon"
              className={styles.bookmarkIcon}
            />
          )}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
            className={styles.likeIcon}>
            {likeStatus ? (
              <img
                onClick={() => {
                  handleLike(currentSlideIndex);
                }}
                src={likeStatus[currentSlideIndex] ? redLikeIcon : likeIcon}
                // src={likeIcon}
                alt="like icon"
              />
            ) : (
              <img
                onClick={() => {
                  handleLike(currentSlideIndex);
                }}
                src={likeIcon}
                // src={likeIcon}
                alt="like icon"
              />
            )}
            <p
              style={{
                color: "white",
              }}>
              {likeCount ? likeCount[currentSlideIndex] : ""}
            </p>
          </div>
        </div>
        {!props.isMobile && (
          <img
            onClick={handleNextSlide}
            src={rightArrow}
            alt="right arrow"
            className={styles.rightArrow}
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
