const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      username,
      password: hashedPassword,
    });

    await userData.save();

    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const userDetails = await User.findOne({ username: username });

    if (!userDetails) {
      return res.status(401).json({ error: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: "Password does not match" });
    }

    const token = jwt.sign(
      { userId: userDetails._id },
      process.env.SECREAT_KEY
    );
    res.cookie("token", token, { httpOnly: true });
    return res.json({
      success: true,
      message: "User Logged in Successfully",
      name: userDetails.username,
      token: token,
      userId: userDetails._id,
    });
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.query;
    // console.log(userId);
    const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newUser = await user.populate("bookmarkedStories.storyId");
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const bookmarkStory = async (req, res, next) => {
  try {
    const { userId, storyId, slideId } = req.body;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!storyId || !slideId) {
      return res
        .status(400)
        .json({ error: "Please provide storyId and slideId" });
    }

    user.bookmarkedStories.push({
      storyId,
      slideId,
    });

    user = await user.save();
    const newUser = await user.populate("bookmarkedStories.storyId");
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const removeFromBookmark = async (req, res, next) => {
  try {
    const { userId, storyId, slideId } = req.body;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!storyId || !slideId) {
      return res
        .status(400)
        .json({ error: "Please provide storyId and slideId" });
    }

    user.bookmarkedStories = user.bookmarkedStories.filter((bookmark) => {
      let value = true;
      bookmark.slideId.forEach((id) => {
        value = id !== slideId;
      });
      return value;
    });

    user = await user.save();
    const newUser = await user.populate("bookmarkedStories.storyId");
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const likeStory = async (req, res, next) => {
  try {
    const { userId, slideId } = req.body;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!slideId) {
      return res
        .status(400)
        .json({ error: "Please provide storyId and slideId" });
    }

    if (user.likedStories.includes(slideId)) {
      return res.status(404).json({ error: "Story already liked" });
    }

    user.likedStories.push(slideId);
    user = await user.save();
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUserDetails,
  bookmarkStory,
  removeFromBookmark,
  likeStory,
};
