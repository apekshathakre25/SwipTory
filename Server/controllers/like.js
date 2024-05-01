const User = require("../model/user")
const Story = require("../model/story");

const likeStory = async (req, res) => {
  const { storyId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (!user.likedStories.includes(storyId)) {
      user.likedStories.push(storyId);
      await user.save();

      if (story) {
        story.likes += 1;
        await story.save();
        return res
          .status(200)
          .json({ message: "Story liked", likes: story.likes });
      }
    } else {
      return res
        .status(200)
        .json({ message: "Story already liked", likes: user.likes });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  likeStory,
};
