import React from "react";
import styles from "./PushStory.module.css";
import modalCloseIcon from "../../assets/modalCloseIcon.jpg";

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
          className={styles.slideNumber}>
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
          className={styles.addSlide}>
          Add +
        </div>
      )}
    </div>
  );
};

export default AddStorySlide;
