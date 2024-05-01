const errorHandler = (err, req, res, next) => {
    console.log(`ERROR :: ${err}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };
  
module.exports = errorHandler;