import React from "react";
import styles from "./PushStory.module.css";

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
          placeholder="Story description"></textarea>
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

export default AddStoryForm;
