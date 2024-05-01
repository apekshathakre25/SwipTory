const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  likes: { type: Array },
});

const storySchema = new mongoose.Schema({
  slides: [slideSchema],
  likes: { type: Number, default: 0 },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Story", storySchema);
