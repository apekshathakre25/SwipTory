import React, { useState, useEffect, useContext } from "react";
import styles from "./Banner.module.css";
import allimg from "../../assets/all.jpg";
import foodimg from "../../assets/food.jpg";
import healthimg from "../../assets/health.jpg";
import travelimg from "../../assets/travel.jpg";
import movieimg from "../../assets/movie.jpg";
import educationimg from "../../assets/education.jpg";
import { swiptoryContext } from "../../Context/Context";

const Banner = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const { filter, setFilter } = useContext(swiptoryContext);
  useEffect(() => {
    const handleResize = () => {
      const adjustedWidth =
        window.innerWidth -
        (window.innerWidth > document.documentElement.clientWidth
          ? window.innerWidth - document.documentElement.clientWidth
          : 0);
      setInnerWidth(adjustedWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.banner}>
      <div
        onClick={() => setFilter("all")}
        className={`${styles.filter} ${
          filter === "all" ? styles.border_filter : ""
        }`}
        style={{ width: innerWidth < 500 ? "180rem" : "" }}>
        <img src={allimg} alt="" className={styles.all_img} />
        <div className={styles.wrapper_all}>
          <h1 className={styles.heading_all}>ALL</h1>
        </div>
      </div>

      <div
        className={`${styles.filter} ${
          filter === "food" ? styles.border_filter : ""
        }`}
        onClick={() => setFilter("food")}
        style={{ width: innerWidth < 500 ? "180rem" : "" }}>
        <img src={foodimg} alt="" className={styles.food_img} />
        <div className={styles.wrapper_all}>
          <h1 className={styles.heading_food}>Food</h1>
        </div>
      </div>

      <div
        className={`${styles.filter} ${
          filter === "health" ? styles.border_filter : ""
        }`}
        onClick={() => setFilter("health")}
        style={{ width: innerWidth < 500 ? "180rem" : "" }}>
        <img src={healthimg} alt="" className={styles.medical_img} />
        <div className={styles.wrapper_all}>
          <h1 className={styles.heading_medical}>Health & Fitness</h1>
        </div>
      </div>
      <div
        className={`${styles.filter} ${
          filter === "travel" ? styles.border_filter : ""
        }`}
        onClick={() => setFilter("travel")}
        style={{ width: innerWidth < 500 ? "180rem" : "" }}>
        <img src={travelimg} alt="" className={styles.travel_img} />
        <div className={styles.wrapper_all}>
          <h1 className={styles.heading_travel}>Travel</h1>
        </div>
      </div>
      <div
        className={`${styles.filter} ${
          filter === "movie" ? styles.border_filter : ""
        }`}
        onClick={() => setFilter("movie")}
        style={{ width: innerWidth < 500 ? "180rem" : "" }}>
        <img src={movieimg} alt="" className={styles.movie_img} />
        <div className={styles.wrapper_all}>
          <h1 className={styles.heading_movie}>Movie</h1>
        </div>
      </div>
      <div
        className={`${styles.filter} ${
          filter === "education" ? styles.border_filter : ""
        }`}
        onClick={() => setFilter("education")}
        style={{ width: innerWidth < 500 ? "180rem" : "" }}>
        <img src={educationimg} alt="" className={styles.education_img} />
        <div className={styles.wrapper_all}>
          <h1 className={styles.heading_education}>Education</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
