const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ errorMessage: "Invalid Token" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ errorMessage: "Invalid Token" });
    }

    const decoded = jwt.verify(token, process.env.SECREAT_KEY);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = verifyJwt;
