const Story = require("../model/story");
const User = require("../model/user");

const createStory = async (req, res, next) => {
  try {
    const slidesArray = req.body;
    const userId = req.userId;

    if (!Array.isArray(slidesArray) || slidesArray.length === 0 || !userId) {
      return res.status(400).json({ errorMessage: "Invalid request data" });
    }

    const modifiedSlides = slidesArray.map((slide) => ({
      heading: slide.heading,
      description: slide.description,
      image: slide.image,
      category: slide.category,
    }));

    const newStory = new Story({
      slides: modifiedSlides,
      createdBy: userId,
    });

    const createdStory = await newStory.save();
    res.status(201).json({
      success: true,
      message: "Stories created successfully",
      stories: createdStory,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const editStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { slides } = req.body;
    // const userId = req.userId;

    if (!id || !slides) {
      return res
        .status(400)
        .json({ message: "Please provide story ID and updated slides" });
    }

    const story = await Story.findById(id);
    console.log(story);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    story.slides = [...slides];
    await story.save();
    // if (story.createdBy.toString() !== userId) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to edit this story" });
    // }

    res.status(200).json({
      success: true,
      message: "Story updated successfully",
      story: story,
    });
  } catch (error) {
    next(error);
  }
};

const getStoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    // console.log("Requested Story ID:", storyId);

    // const { userId } = req.query;
    // const stories = await Story.find({ createdBy: userId });
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    // if (story) {
    // const liked =
    //   story.createdBy && story.createdBy.likedStories.includes(storyId);
    // const bookmarked =
    //   story.createdBy && story.createdBy.bookmarkedStories.includes(storyId);

    // return res.status(200).json({
    //   success: true,
    //   message: "Story retrieved successfully",
    //   stories,
    // liked,
    // bookmarked,
    // });
    // }

    return res.status(200).json({
      success: true,
      message: "Story retrieved successfully",
      story,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStories = async (req, res, next) => {
  try {
    const stories = await Story.find();

    res.status(200).json({
      success: true,
      message: "All stories retrieved successfully",
      stories: stories,
    });
  } catch (error) {
    next(error);
  }
};

const addUserToLikes = async (req, res, next) => {
  try {
    const { userId, storyId, slideId } = req.body;

    let story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    story.slides.forEach((slide) => {
      if (slide._id == slideId) {
        // console.log(slide._id);
        slide.likes = [...slide.likes, userId];
      }
    });

    story = await story.save();

    return res.status(201).json(story);
  } catch (error) {
    next(error);
  }
};

const removeUserFromLikes = async (req, res, next) => {
  try {
    const { userId, storyId, slideId } = req.body;

    let story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    story.slides.forEach((slide) => {
      if (slide._id == slideId) {
        // console.log(slide._id);
        slide.likes = slide.likes.filter((like) => like !== userId);
      }
    });

    story = await story.save();

    return res.status(201).json(story);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStory,
  editStory,
  getStoryById,
  getAllStories,
  addUserToLikes,
  removeUserFromLikes,
};
