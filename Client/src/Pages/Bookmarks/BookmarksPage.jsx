import React, { useContext, useEffect } from "react";
import { swiptoryContext } from "../../Context/Context";
import Navbar from "../../components/Navbar/Navbar";
import Story from "../../components/Story/Story";
import styles from "./BookmarksPage.module.css";

const BookmarksPage = () => {
  const { userDetails, fetchDetails } = useContext(swiptoryContext);
  console.log(userDetails);

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <h2>Your Bookmarks</h2>
        <div className={styles.categoryStories}>
          {userDetails?.bookmarkedStories?.map((bookmark, index) => {
            return <Story key={index} story={bookmark.storyId} />;
          })}
        </div>
      </section>
    </>
  );
};

export default BookmarksPage;
