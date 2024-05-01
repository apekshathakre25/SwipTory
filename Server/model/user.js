const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bookmarkedStories: [
      {
        storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
        slideId: { type: Array },
      },
    ],
    likedStories: { type: Array },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
