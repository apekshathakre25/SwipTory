const User = require("../model/user")
const Story = require("../model/story");

const addBookmark = async (req, res) => {
  const { storyId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }

    if (!user.bookmarkedStories.includes(storyId)) {
      user.bookmarkedStories.push(storyId);
      await user.save();

      if (!story.bookmarkedBy.includes(userId)) {
        story.bookmarkedBy.push(userId);
        await story.save();
      }

      return res.status(200).json({
        message: "Story bookmarked",
        bookmarks: user.bookmarkedStories,
        bookmarked: true,
        story,
      });
    } else {
      return res.status(200).json({
        message: "Story already bookmarked",
        bookmarks: user.bookmarkedStories,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getBookmarkedStoriesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const bookmarkedStoryIds = user.bookmarkedStories;
    const bookmarkedStories = await Story.find({
      _id: { $in: bookmarkedStoryIds },
    });

    res.status(200).json({
      success: true,
      message: "Bookmarked stories retrieved successfully",
      bookmarkedStories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBookmark,
  getBookmarkedStoriesByUser,
};
