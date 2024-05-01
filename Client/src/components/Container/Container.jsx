import React, { useContext, useState } from "react";
import styles from "./Container.module.css";
import modalCloseIcon from "../../assets/modalCloseIcon.jpg";
import { swiptoryContext } from "../../Context/Context";

const Container = (props) => {
  const { isOpen, setIsOpen } = props;
  const { postData, setPostData, isUpdate, setIsUpdate } =
    useContext(swiptoryContext);

  const handleCloseModal = () => {
    setPostData({
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
    setIsUpdate(false);
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? styles.overlay : styles.overlayHidden}>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>{props.children}</div>
          <img
            className={styles.modalCloseIcon}
            src={modalCloseIcon}
            alt="modal-close-icon"
            onClick={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
};

export default Container;
