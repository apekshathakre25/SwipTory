import React, { useState, useContext } from "react";
import styles from "./MobileAddStory.module.css";
import { createStory, updateStory } from "../../API/Story";
import Container from "../Container/Container";
import { swiptoryContext } from "../../Context/Context";
import modalCloseIcon from "../../assets/modalCloseIcon.jpg";

const AddStoryForm = (props) => {
  if (props.activeSlideIndex > props.postData.slides.length) {
    return null;
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContainer_div}>
        <label className={styles.formContainer_label}>Heading:</label>
        <input
          onChange={(e) => {
            props.handleHeadingChange(props.activeSlideIndex, e.target.value);
          }}
          className={styles.formContainer_input}
          value={props.postData.slides[props.activeSlideIndex - 1].heading}
          type="text"
          placeholder="Your heading"
        />
      </div>
      <div className={styles.formContainer_div}>
        <label className={styles.formContainer_label}>Description:</label>
        <textarea
          onChange={(e) => {
            props.handleDescriptionChange(
              props.activeSlideIndex,
              e.target.value
            );
          }}
          className={styles.formContainer_input}
          value={props.postData.slides[props.activeSlideIndex - 1].description}
          placeholder="Story description"
        ></textarea>
      </div>
      <div className={styles.formContainer_div}>
        <label className={styles.formContainer_label}>Image:</label>
        <input
          onChange={(e) => {
            props.handleImageChange(props.activeSlideIndex, e.target.value);
          }}
          className={styles.formContainer_input}
          value={props.postData.slides[props.activeSlideIndex - 1].image}
          type="text"
          placeholder="Add Image url"
        />
      </div>
    </div>
  );
};

const AddStorySlide = (props) => {
  console.log(props.slideCount);
  return (
    <div className={styles.slideContainer}>
      {[...Array(props.slideCount)].map((_, index) => (
        <div
          key={index}
          onClick={() => props.handleSlideClick(index + 1)}
          style={{
            border:
              index + 1 === props.activeSlideIndex
                ? "2px solid #73ABFF"
                : "2px solid transparent",
          }}
          className={styles.slideNumber}
        >
          Slide {index + 1}
          {props.activeSlideIndex === index + 1 && (
            <img
              onClick={async () => {
                if (index + 1 === props.slideCount) {
                  await props.handleSlideClick(index + 1);
                  props.handleDeleteSlide(index + 1);
                } else {
                  props.handleDeleteSlide(index + 1);
                }
              }}
              className={styles.modalCloseIcon}
              src={modalCloseIcon}
              alt="modal-close-icon"
            />
          )}
        </div>
      ))}
      {props.slideCount < 6 && (
        <div
          onClick={() => {
            props.handleAddSlide();
          }}
          className={styles.addSlide}
        >
          Add +
        </div>
      )}
    </div>
  );
};

const MobileAddStory = ({ showAddStory, setShowAddStory }) => {
  const [slideCount, setSlideCount] = useState(3);
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { postClk, setPostClk } = useContext(swiptoryContext);
  const { postData, setPostData } = useContext(swiptoryContext);
  const { isUpdate, setIsUpdate } = useContext(swiptoryContext);

  const handleSlideClick = (index) => {
    setActiveSlideIndex(index);
  };

  const handleAddSlide = () => {
    setSlideCount(slideCount + 1);
    setActiveSlideIndex(slideCount + 1);
    const newPostData = { ...postData };
    newPostData.slides.push({
      heading: "",
      description: "",
      image: "",
      category: "",
    });
    setPostData(newPostData);
    if (slideCount >= 3) {
      setShowError(false);
      setErrorMessage("");
    }
  };

  const handleDeleteSlide = (index) => {
    if (slideCount === 3) {
      setShowError(true);
      setErrorMessage("You need to have at least 3 slides");
      return;
    }
    if (index === postData.slides.length) {
      setActiveSlideIndex(index - 1);
    }

    const newPostData = { ...postData };
    newPostData.slides.splice(index - 1, 1);

    if (index === activeSlideIndex) {
      setActiveSlideIndex(Math.max(index - 1, 1));
    } else if (index < activeSlideIndex) {
      setActiveSlideIndex(activeSlideIndex - 1);
    }

    setSlideCount(slideCount - 1);
    setPostData(newPostData);
  };
  const handleHeadingChange = (index, value) => {
    const newPostData = { ...postData };
    newPostData.slides[index - 1].heading = value;
    setPostData(newPostData);
  };

  const handleDescriptionChange = (index, value) => {
    const newPostData = { ...postData };
    newPostData.slides[index - 1].description = value;
    setPostData(newPostData);
  };
  const handleImageChange = (index, value) => {
    const newPostData = { ...postData };
    newPostData.slides[index - 1].image = value;
    setPostData(newPostData);
  };

  const handleCategoryChange = (value) => {
    const arr = [...postData.slides];
    arr.forEach((slide) => {
      slide.category = value;
    });
    setPostData({ ...postData, slides: [...arr] });
  };
  const handlePost = async () => {
    const error = postData.slides.some(
      (slide) =>
        slide.heading === "" ||
        slide.description === "" ||
        slide.image === "" ||
        slide.category === ""
    );

    if (slideCount < 3) {
      setShowError(true);
      setErrorMessage("You need to have at least 3 slides");
      return;
    }

    if (error) {
      setShowError(true);
      setErrorMessage("Please fill all the fields in all slides");
      return;
    }

    setShowError(false);
    setErrorMessage("");

    try {
      if (isUpdate) {
        console.log(postData);
        await updateStory(postData._id, postData.slides);
      } else {
        console.log(postData.slides);
        await createStory(postData.slides);
      }
      setShowAddStory(false);
      setPostClk(!postClk);
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  return (
    <Container isOpen={showAddStory} setIsOpen={setShowAddStory}>
      <h1 className={styles.header}>Add story to feed</h1>
      <div className={styles.mobileStoryWrapper}>
        <AddStorySlide
          slideCount={slideCount}
          activeSlideIndex={activeSlideIndex}
          handleSlideClick={handleSlideClick}
          handleAddSlide={handleAddSlide}
          handleDeleteSlide={handleDeleteSlide}
        />
        <div className={styles.mobileFormWrapper}>
          <AddStoryForm
            postData={postData}
            activeSlideIndex={activeSlideIndex}
            handleHeadingChange={handleHeadingChange}
            handleDescriptionChange={handleDescriptionChange}
            handleImageChange={handleImageChange}
            handleCategoryChange={handleCategoryChange}
          />

          <div className={styles.formContainer_div}>
            <label className={styles.formContainer_label}>Category:</label>
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={styles.formContainer_input}
              value={postData.slides[0].category}
            >
              <option value="">Select</option>
              <option value="Education">Education</option>
              <option value="Health">Health and Fitness</option>
              <option value="Food">Food</option>
              <option value="Movie">Movie</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
        </div>

        {showError && <div className={styles.error}>{errorMessage}</div>}
        <div className={styles.btnContainer}></div>
      </div>
      <div>
        <button onClick={handlePost} className={styles.postBtn}>
          {isUpdate ? "Update" : "Post"}
        </button>
      </div>
    </Container>
  );
};
export default MobileAddStory;