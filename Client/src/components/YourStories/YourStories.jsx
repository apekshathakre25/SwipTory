import React, { useContext, useEffect, useState } from "react";
import styles from "./YourStories.module.css";
import Story from "../Story/Story";
import { getAllStories } from "../../API/Story";
import { swiptoryContext } from "../../Context/Context";

const YourStories = (props) => {
  const [yourStories, setYourStories] = useState([]);
  const [maxStoriesInRow, setMaxStoriesInRow] = useState(4);
  const { isSliderOpen, setIsSliderOpen } = useContext(swiptoryContext);

  useEffect(() => {
    const fecthUserStories = async () => {
      try {
        const data = await getAllStories();
        console.log(data);
        const arr = data.stories.filter((story) => {
          return story.createdBy === localStorage.getItem("userId");
        });

        setYourStories([...arr]);
      } catch (error) {
        console.log(error);
      }
    };
    fecthUserStories();
  }, []);

  return (
    <>
      <div className={styles.categoryContainer}>
        {<div className={styles.categoryHeader}>Your Stories</div>}
        <div className={styles.categoryStories}>
          {yourStories.slice(0, maxStoriesInRow).map((story, index) => (
            <Story
              key={index}
              story={story}
              authValidated={props.authValidated}
              handleStoryViewer={props.handleStoryViewer}
            />
          ))}
        </div>
        {maxStoriesInRow < yourStories.length && (
          <button
            onClick={() =>
              setMaxStoriesInRow(
                maxStoriesInRow + 4 > yourStories.length
                  ? yourStories.length
                  : maxStoriesInRow + 4
              )
            }
            className={styles.seemoreBtn}
          >
            See more
          </button>
        )}
      </div>
    </>
  );
};

export default YourStories;
