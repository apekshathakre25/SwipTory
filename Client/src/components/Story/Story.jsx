import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Story.module.css";
import editIcon from "../../assets/editIcon.png";
import { swiptoryContext } from "../../Context/Context";
import { Toast, useToast } from "@chakra-ui/react";

const Story = (props) => {
  const { setOpenedStoryId } = useContext(swiptoryContext);
  const toast = useToast();
  // console.log(props);
  if (props.story.slides.length === 0) {
    return null;
  }
  const {
    showAddStory,
    setShowAddStory,
    postData,
    setPostData,
    isUpdate,
    setIsUpdate,
    isSliderOpen,
    setIsSliderOpen,
  } = useContext(swiptoryContext);

  const handleEdit = () => {
    console.log(props.story);
    setPostData({
      _id: props.story._id,
      slides: props.story.slides,
    });
    setIsUpdate(true);
    setShowAddStory(!showAddStory);
  };

  const handleStoryClick = () => {
    if (localStorage.getItem("userId")) {
      setOpenedStoryId(props.story._id);
      setIsSliderOpen(true);
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
    <div className={styles.wrapper}>
      <div
        onClick={handleStoryClick}
        className={styles.categoryStory}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0 ), rgba(0, 0, 0,  0.9)), url(${props.story.slides[0].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className={styles.categoryStoryHeader}>
          {props.story.slides[0].heading}
        </div>
        <div className={styles.categoryStoryDescription}>
          {props.story.slides[0].description}
        </div>
      </div>
      {props.story.createdBy === localStorage.getItem("userId") && (
        <button className={styles.editBtn}>
          <div onClick={handleEdit} className={styles.editBtnContainer}>
            <img src={editIcon} alt="edit-icon" />
            <p>Edit</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default Story;
