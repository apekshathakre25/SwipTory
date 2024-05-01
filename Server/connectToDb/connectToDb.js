const mongoose = require("mongoose");

const connecToDb = (url) => {
  return mongoose.connect(url);
};

module.exports = {
  connecToDb,
};
